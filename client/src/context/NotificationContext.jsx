import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { notificationService } from '../services/notificationservice';
import { useAuthStore } from '../store/authstore';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refresh = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await notificationService.list();
      setNotifications(data.data.notifications);
      setUnreadCount(data.data.unreadCount);
    } catch {
      // silently ignore — notifications are non-critical
    }
  }, [user]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 60000); // poll every minute
    return () => clearInterval(interval);
  }, [refresh]);

  const markAllRead = async () => {
    await notificationService.markAllRead();
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, refresh, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
