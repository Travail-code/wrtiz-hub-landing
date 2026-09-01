import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

let _queryClient: QueryClient | undefined;

function getQueryClient() {
  if (!_queryClient) {
    _queryClient = new QueryClient();
  }
  return _queryClient;
}

export function createRouter() {
  const queryClient = getQueryClient();

  return createTanStackRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
}
