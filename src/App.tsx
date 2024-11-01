import { StrictMode } from 'react';
import { ThemeProvider, EmployeeProvider } from '@/contexts';
import { BrowserRouter } from 'react-router-dom';
import {
  ErrorBoundary,
  Loader,
  Router,
  Background,
  Header,
  Footer
} from 'src/components/main/index';
import './App.css';

function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <Loader>
          <ThemeProvider>
            <EmployeeProvider>
              <div className="min-h-dvh flex flex-col items-center">
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
