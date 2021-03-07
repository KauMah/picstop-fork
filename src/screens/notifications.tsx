import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import CustomHeader from '../components/shared/CustomHeader';
import Notification from '../components/Notification';
import { NotificationType } from '../types';
import PushNotification from 'react-native-push-notification';
import _ from 'lodash';
import { exo } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
  },
  image: {
    width: '70%',
  },
  notifications: {
    width: '100%',
  },
});

const RequestTitleNotif: NotificationType = {
  _id: 'Requests',
  userId: 'Requests',
  relatedUserId: 'Requests',
  relatedPostId: 'Requests',
  notificationType: 'REQUEST_TITLE',
  createdAt: '',
  updatedAt: '',
};

const NotificationTitleNotif: NotificationType = {
  _id: 'Notifs',
  userId: 'Notifs',
  relatedUserId: 'Notifs',
  relatedPostId: 'Notifs',
  notificationType: 'NOTIFS_TITLE',
  createdAt: '',
  updatedAt: '',
};

const resultsPerPage = 10;

const Notifications = () => {
  const [loadingNotifs, setLoadingNotifs] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [resetBadge, setResetBadge] = useState(true);
  const [notifs, setNotifs] = useState<Array<NotificationType>>([]);
  const [requests, setRequests] = useState<Array<NotificationType>>([]);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (resetBadge) {
      PushNotification.setApplicationIconBadgeNumber(0);
      exo.get('/user/notifications/reset').catch((err) => console.error(err));
      setResetBadge(false);
    }
  }, [resetBadge]);

  useEffect(() => {
    if (loadingRequests) {
      exo
        .get('/user/notifications/followRequests')
        .then((res) => {
          setRequests(_.get(res.data, 'message', []));
        })
        .catch((err) => {
          console.error(err);
        });
      setLoadingRequests(false);
    }
    if (loadingNotifs) {
      exo
        .post('/user/notifications/all', { cursor, limit: resultsPerPage })
        .then((res) => {
          setNotifs(_.get(res.data, 'message', []));
          setCursor(cursor + resultsPerPage);
        })
        .catch((err) => {
          console.error(err);
        });
      setLoadingNotifs(false);
    }
  }, [cursor, loadingNotifs, loadingRequests]);

  const addRequestTitle = (): Array<NotificationType> => {
    const out = _.concat(requests, NotificationTitleNotif, notifs);
    if (requests.length > 0) {
      return _.concat(RequestTitleNotif, out);
    }
    return out;
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Notifications" actions={false} />
      {!loadingRequests && !loadingNotifs && (
        <FlatList
          style={styles.notifications}
          keyExtractor={(notif) => notif._id}
          data={addRequestTitle()}
          renderItem={(notifItem) => {
            return <Notification notif={notifItem.item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Notifications;
