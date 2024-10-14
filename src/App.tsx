import { StrictMode } from 'react';
import { ThemeProvider } from '@/contexts';
import { EmployeeProvider } from '@/contexts';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {
  Loader,
  ErrorBoundary,
  ErrorBoundaryFallback,
  Router,
  Background,
  Header,
  Footer
} from '@/components/main';

function App() {
  return (
    <StrictMode>
      <ErrorBoundary fallback={ErrorBoundaryFallback}>
        <Loader>
          <ThemeProvider>
            <EmployeeProvider>
              <div className="min-h-screen flex flex-col items-center">
                <Background />

                <div className="flex flex-col grow max-w-[768px] w-full">
                  <BrowserRouter>
                    <Header />
                    <main className="flex flex-col grow">
                      <div className="container flex grow">
                        <Router />
                      </div>

                      <Footer />
                    </main>
                  </BrowserRouter>
                </div>
              </div>
            </EmployeeProvider>
          </ThemeProvider>
        </Loader>
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;
