import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type StartRequestResolver = (ctx: { request: Request }) => Promise<Response>;

let resolverPromise: Promise<StartRequestResolver> | undefined;

// Lazy import so a module-init failure inside the app bundle stays catchable
// and is logged instead of surfacing as an opaque 500.
async function getResolver(): Promise<StartRequestResolver> {
  if (!resolverPromise) {
    resolverPromise = Promise.all([
      import("@tanstack/react-start/server"),
      import("./router"),
    ]).then(([server, router]) =>
      server.createStartHandler({ createRouter: router.createRouter })(
        server.defaultStreamHandler,
      ) as StartRequestResolver,
    );
  }
  return resolverPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// TanStack Start expects the server entry default export to be a function
// called with ({ request }) — not an object with a `fetch` method.
export default async function serverEntry({ request }: { request: Request }): Promise<Response> {
  try {
    const resolver = await getResolver();
    const response = await resolver({ request });
    return await normalizeCatastrophicSsrResponse(response);
  } catch (error) {
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
}
