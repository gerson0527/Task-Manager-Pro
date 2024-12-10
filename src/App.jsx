// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './components/notifications/NotificationContext';
import AppRouter from './routes/AppRouter';
import Notifications from './components/notifications/Notifications';

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AppRouter />
        <Notifications />
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;