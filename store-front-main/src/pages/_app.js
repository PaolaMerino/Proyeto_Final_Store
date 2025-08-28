import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
