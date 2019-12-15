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

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkin,
            Help: {
              screen: createStackNavigator(
                {
                  HelpIndex,
                  HelpDetails,
                  HelpNew,
                },
                {
                  headerLayoutPreset: 'center',
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                    //
                    headerTitle: (
                      <Image source={require('~/assets/logo-horizontal.png')} />
                    ),
                    headerStyle: {
                      backgroundColor: '#FFF',
                    },
                  },
                }
              ),
              navigationOptions: {
                // tabBarVisible: false,
                tabBarLabel: 'Pedir ajuda',
                // tabBarIcon: (
                //  <Icon name="add-circle-outline" size={20} color="#ccc" />
                // ),
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
            // Profile,
          },
          {
            initialRouteName: 'Checkin',
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
