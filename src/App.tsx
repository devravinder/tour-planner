import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import "services/integrations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "components/ErrorBoundary";
import ErrorFallback from "components/ErrorFallback";
import { HelmetProvider } from "react-helmet-async";
import AppContextProvider from "state/app-context/AppContextProvider";
import ModalNotificationProvider from "components/modal-notification/ModalNotificationProvider";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <ModalNotificationProvider>
              <AppContextProvider>
                <BrowserRouter>
                  <Routes></Routes>
                </BrowserRouter>
              </AppContextProvider>
            </ModalNotificationProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
