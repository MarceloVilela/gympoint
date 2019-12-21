import React from 'react';
import { Image } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';

import Checkin from './pages/Checkin';

import HelpIndex from './pages/Help/Index';
import HelpDetails from './pages/Help/Details';
import HelpNew from './pages/Help/New';

const headerOptions = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerTransparent: true,
    headerTintColor: '#FFF',
    headerLeftContainerStyle: {
      marginLeft: 20,
    },
    //
    headerTitle: <Image source={require('~/assets/logo-horizontal.png')} />,
    headerStyle: {
      backgroundColor: '#FFF',
    },
  },
};

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkin: {
              screen: createStackNavigator(
                {
                  Checkin,
                },
                { ...headerOptions }
              ),
              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="local-pizza" size={20} color={tintColor} />
                ),
              },
            },

            Help: {
              screen: createStackNavigator(
                {
                  HelpIndex,
                  HelpDetails,
                  HelpNew,
                },
                { ...headerOptions }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            initialRouteName: 'Help',
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ef4d64',
              inactiveTintColor: '#ccc',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
