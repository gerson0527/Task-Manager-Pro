// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './components/notifications/NotificationContext';
import AppRouter from './routes/AppRouter';
import Notifications from './components/notifications/Notifications';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <BrowserRouter>
    <SearchProvider>
      <NotificationProvider>
        <AppRouter />
        <Notifications />
      </NotificationProvider>
    </SearchProvider>
    </BrowserRouter>
  );
}

export default App;