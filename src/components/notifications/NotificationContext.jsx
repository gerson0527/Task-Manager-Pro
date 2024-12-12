// src/components/notifications/NotificationContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

const NotificationContext = createContext(null);
const STORAGE_KEY = 'notifications';

const notificationReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_NOTIFICATION':
      newState = {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
      break;

    case 'SET_NOTIFICATIONS':
      newState = {
        ...state,
        notifications: action.payload
      };
      break;

    case 'MARK_AS_READ':
      newState = {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };
      break;

    case 'REMOVE_NOTIFICATION':
      newState = {
        ...state,
        notifications: state.notifications.filter(n => {
          if (n.isToast) {
            return n.id !== action.payload;
          }
          return n.id !== action.payload;
        })
      };
      break;

    case 'CLEAR_ALL':
      newState = {
        ...state,
        notifications: state.notifications.filter(n => n.isToast)
      };
      break;

    default:
      return state;
  }

  // Guardar solo las notificaciones no-toast en localStorage
  const persistentNotifications = newState.notifications.filter(n => !n.isToast);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentNotifications));

  return newState;
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: []
  });

  useEffect(() => {
    const storedNotifications = localStorage.getItem(STORAGE_KEY);
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications);
        if (Array.isArray(parsedNotifications)) {
          dispatch({
            type: 'SET_NOTIFICATIONS',
            payload: parsedNotifications
          });
        }
      } catch (error) {
        console.error('Error al cargar notificaciones:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const addNotification = (type, message, options = {}) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      type,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      ...options
    };

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: newNotification
    });

    if (options.isToast) {
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_NOTIFICATION',
          payload: id
        });
      }, 5000);
    }

    return id;
  };

  const removeNotification = (id) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id
    });
  };

  const markAsRead = (id) => {
    dispatch({
      type: 'MARK_AS_READ',
      payload: id
    });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const showSuccess = (message, options = {}) => {
    return addNotification('success', message, { title: 'Exito', ...options });
  };

  const showError = (message, options = {}) => {
    return addNotification('error', message, { title: 'Error', ...options });
  };

  const showWarning = (message, options = {}) => {
    return addNotification('warning', message, { title: 'Advertencia', ...options });
  };

  const showInfo = (message, options = {}) => {
    return addNotification('info', message, { title: 'Información', ...options });
  };

  const value = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    markAsRead,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};