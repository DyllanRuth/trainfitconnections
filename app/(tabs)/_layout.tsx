import React from 'react';
import { Tabs } from 'expo-router';
import { Calendar, Users, Bell, User, Dumbbell, Utensils } from 'lucide-react-native';
import { Image, View, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';

export default function TabsLayout() {
  const { user } = useAuthStore();
  const isTrainer = user?.role === 'trainer';

  // Profile icon component that uses user's profile image
  const ProfileIcon = ({ color, size }: { color: string; size: number }) => {
    // Debug logging
    console.log('ProfileIcon - User:', user?.name, 'ProfileImage:', user?.profileImage);

    if (user?.profileImage && user.profileImage.trim() !== '') {
      return (
        <View style={[profileImageStyles.container, { width: size, height: size }]}>
          <Image
            source={{ uri: user.profileImage }}
            style={[profileImageStyles.image, { width: size, height: size, borderRadius: size / 2 }]}
            onError={(error) => {
              console.log('Profile image failed to load:', error.nativeEvent.error);
            }}
            onLoad={() => {
              console.log('Profile image loaded successfully');
            }}
          />
        </View>
      );
    }
    // Fallback to User icon if no profile picture
    console.log('Using fallback User icon');
    return <User size={size} color={color} />;
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.secondary,
        tabBarStyle: {
          backgroundColor: Colors.background.dark,
          borderTopColor: Colors.border.light,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: Colors.background.dark,
        },
        headerTintColor: Colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="my-trainers"
        options={{
          title: 'Trainers',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
          href: !isTrainer ? '/(tabs)/my-trainers' : null,
        }}
      />

      <Tabs.Screen
        name="clients"
        options={{
          title: 'Clients',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
          href: isTrainer ? '/(tabs)/clients' : null,
        }}
      />
      
      <Tabs.Screen
        name="workout-plans"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, size }) => <Dumbbell size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="meal-plans"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color, size }) => <Utensils size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <ProfileIcon color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

// Styles for the profile image in tab bar
const profileImageStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
});