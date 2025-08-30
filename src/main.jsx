import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

// Loading component for PersistGate
const LoadingComponent = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px'
  }}>
    Loading...
  </div>
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />}  persistor={persistor}>
        <SnackbarProvider autoHideDuration={3000}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
