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
    <ErrorBoundary fallback={ErrorBoundaryFallback}>
      <Loader>
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
      </Loader>
    </ErrorBoundary>
  );
}

export default App;
