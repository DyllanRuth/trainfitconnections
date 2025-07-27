import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Bell } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface NotificationBadgeProps {
  count: number;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
  showZero?: boolean;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  onPress,
  size = 24,
  style,
  showZero = false,
}) => {
  const hasNotifications = count > 0;
  const displayCount = count > 99 ? '99+' : count.toString();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Bell 
          size={size} 
          color={hasNotifications ? Colors.primary : Colors.text.secondary} 
          strokeWidth={hasNotifications ? 2.5 : 2}
        />
        
        {(hasNotifications || showZero) && (
          <View style={[
            styles.badge,
            !hasNotifications && styles.badgeEmpty,
            count > 9 && styles.badgeWide
          ]}>
            <Text style={[
              styles.badgeText,
              !hasNotifications && styles.badgeTextEmpty
            ]}>
              {showZero || hasNotifications ? displayCount : ''}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.status.error,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: Colors.background.dark,
    shadowColor: Colors.status.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeEmpty: {
    backgroundColor: Colors.text.tertiary,
    shadowColor: Colors.text.tertiary,
  },
  badgeWide: {
    minWidth: 24,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: Colors.text.inverse,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 12,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  badgeTextEmpty: {
    color: Colors.background.dark,
  },
});
