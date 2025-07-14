

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



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
  {/* <PersistGate loading={<LoadingComponent />}> */}
         <SnackbarProvider autoHideDuration={3000}>
           <QueryClientProvider client={queryClient}>
             <App />
           </QueryClientProvider>
         </SnackbarProvider>
       {/* </PersistGate> */}
  </StrictMode>,
)
