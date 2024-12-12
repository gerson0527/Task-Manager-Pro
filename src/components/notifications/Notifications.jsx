// src/components/notifications/Notifications.jsx
import { motion, AnimatePresence } from 'framer-motion';
import NotificationItem from './NotificationItem';
import { useNotifications } from './NotificationContext';

const Notifications = () => {
  const { notifications, removeNotification } = useNotifications();
  
  // Filtrar solo las notificaciones toast
  const toastNotifications = notifications.filter(n => n.isToast);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-4">
      <AnimatePresence>
        {toastNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <NotificationItem
              notification={notification}
              onClose={removeNotification}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
