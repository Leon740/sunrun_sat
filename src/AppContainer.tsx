import App from './App';
import './App.css';
import { EmployeeProvider } from './contexts/EmployeeContext';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContainer() {
  return (
    <ThemeProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </ThemeProvider>
  );
}

export default AppContainer;
