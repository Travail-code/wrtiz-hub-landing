export function reportLovableError(
  error: Error,
  context?: { boundary?: string; [key: string]: unknown }
): void {
  // Simple error reporting placeholder
  // You can integrate with your preferred error tracking service here
  console.error("Error reported:", error, context);
}
