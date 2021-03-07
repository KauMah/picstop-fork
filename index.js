/**
 * @format
 */

import { AppRegistry, Linking } from 'react-native';

import App from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import _ from 'lodash';
import { name as appName } from './app.json';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    AsyncStorage.setItem('deviceId', token.token);
    PushNotification.setNotificationCategories([
      {
        id: 'LIKE_POST',
        actions: [
          {
            id: 'open',
            title: 'Open',
            options: { foreground: true },
          },
          {
            id: 'ignore',
            title: 'Ignore',
            options: { foreground: true, destructive: true },
          },
        ],
      },
      {
        id: 'LIKE_COMMENT',
        actions: [
          {
            id: 'open',
            title: 'Open',
            options: { foreground: true },
          },
          {
            id: 'ignore',
            title: 'Ignore',
            options: { foreground: true, destructive: true },
          },
        ],
      },
      {
        id: 'COMMENT_POST',
        actions: [
          {
            id: 'open',
            title: 'Open',
            options: { foreground: true },
          },
          {
            id: 'ignore',
            title: 'Ignore',
            options: { foreground: true, destructive: true },
          },
        ],
      },
      {
        id: 'FOLLOWED',
        actions: [
          {
            id: 'open',
            title: 'Open',
            options: { foreground: true },
          },
          {
            id: 'ignore',
            title: 'Ignore',
            options: { foreground: true, destructive: true },
          },
        ],
      },
      {
        id: 'FOLLOW_REQUEST',
        actions: [
          {
            id: 'accept',
            title: 'Accept',
            options: { foreground: true },
          },
          {
            id: 'reject',
            title: 'Reject',
            options: { foreground: true, destructive: true },
          },
        ],
      },
      {
        id: 'REQUEST_ACCEPTED',
        actions: [
          {
            id: 'open',
            title: 'Open',
            options: { foreground: true },
          },
          {
            id: 'ignore',
            title: 'Ignore',
            options: { foreground: true, destructive: true },
          },
        ],
      },
    ]);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    PushNotification.setApplicationIconBadgeNumber(0);
    const notifType = _.get(notification, 'data.aps.category', '');
    switch (notifType) {
      case 'LIKE_POST':
        const pId = _.get(notification, 'data.postId', '');
        Linking.openURL(`picstop://likes/${pId}`).catch((err) =>
          console.error(err),
        );
        break;
      case 'LIKE_COMMENT':
        const poId = _.get(notification, 'data.postId', '');
        Linking.openURL(`picstop://comments/${poId}`).catch((err) =>
          console.error(err),
        );
        break;
      case 'COMMENT_POST':
        const id = _.get(notification, 'data.postId', '');
        Linking.openURL(`picstop://comments/${id}`).catch((err) =>
          console.error(err),
        );
        break;
      case 'FOLLOWED':
        const userId = _.get(notification, 'data.userId', '');
        Linking.openURL(`picstop://user/${userId}`).catch((err) =>
          console.error(err),
        );
        break;
      case 'FOLLOW_REQUEST':
        Linking.openURL('picstop://notifications');
        break;
      case 'REQUEST_ACCEPTED':
        const uId = _.get(notification, 'data.userId', '');
        Linking.openURL(`picstop://user/${uId}`).catch((err) =>
          console.error(err),
        );
        break;
      default:
        break;
    }

    console.log(_.get(notification, 'data.postId', ''));
    console.log(_.get(notification, 'data.aps.category', ''));

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
