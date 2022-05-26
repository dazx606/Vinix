import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddScreen from './components/AddScreen';
import PetsScreen from './components/PetsScreen';
import ProfileScreen from './components/ProfileScreen';


const Tab = createMaterialTopTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
        
      }}
    >
      <Tab.Screen
        name="Feed"
        component={PetsScreen}
        options={{ tabBarLabel: 'Pets' }}
      />
      <Tab.Screen
        name="Notifications"
        component={AddScreen}
        options={{ tabBarLabel: 'Add pet' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Find pet' }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
