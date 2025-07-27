import { useMemo } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { useClientStore } from '@/store/client-store';
import { useTrainerStore } from '@/store/trainer-store';
import { useMessageStore } from '@/store/message-store';

/**
 * Custom hook to calculate the total number of unread notifications
 * across all stores based on the user's role
 */
export const useNotificationCount = () => {
  const { user } = useAuthStore();
  const { reminders: clientReminders } = useClientStore();
  const { reminders: trainerReminders } = useTrainerStore();
  const { messageNotifications } = useMessageStore();

  const totalCount = useMemo(() => {
    let count = 0;

    if (user?.role === 'trainer') {
      // Count unread trainer reminders
      count += trainerReminders.filter(reminder => !reminder.isRead).length;
    } else if (user?.role === 'client') {
      // Count unread client reminders
      count += clientReminders.filter(reminder => !reminder.isRead).length;
    }

    // Count unread message notifications for both roles
    count += messageNotifications.filter(notification => !notification.isRead).length;

    return count;
  }, [user?.role, clientReminders, trainerReminders, messageNotifications]);

  return totalCount;
};
