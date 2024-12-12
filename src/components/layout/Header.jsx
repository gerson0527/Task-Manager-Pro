import { useState } from 'react';
import { Search, Bell, Trash2 } from 'lucide-react';
import { useNotifications } from '../notifications/NotificationContext';
import { useSearch } from '../../context/SearchContext';


const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, removeNotification, clearAll } = useNotifications();
  const { handleSearch } = useSearch();

  const handleInputChange = (e) => {
    const value = e.target.value;
    handleSearch(value);
    console.log(value);
  };
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimestamp = (dateString) => {
    try {
      let date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        date = new Date(parseInt(dateString));
      }

      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) {
        return 'hace un momento';
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
      }

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
      }

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
      }

      return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'fecha desconocida';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex-none">
          <h1 className="text-lg font-semibold text-gray-900">Task Manager Pro</h1>
        </div>

        <div className="flex-1 max-w-xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              onChange={handleInputChange}
              placeholder="Buscar tareas..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-none flex items-center space-x-4">
          <div className="relative">
            <button 
              className="p-2 text-gray-400 hover:text-gray-600 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Notificaciones</h3>
                  <button 
                    onClick={() => {
                      clearAll();
                      setShowNotifications(false);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Limpiar todo
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatTimestamp(notification.timestamp)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                      No hay notificaciones
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;