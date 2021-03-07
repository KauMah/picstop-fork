import { NotificationType, User } from '../../types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { $mainGray } from '../../utils/colors';
import NotificationTile from './component';
import _ from 'lodash';
import { exo } from '../../utils/api';
import { rollbar } from '../../utils/rollbar';

interface Props {
  notif: NotificationType;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 20,
    color: $mainGray,
  },
});

const Notification = ({ notif }: Props) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading && notif.userId !== 'Notifs' && notif.userId !== 'Requests') {
      exo
        .get(`user/getById/${notif.relatedUserId}`)
        .then((res) => {
          setUser(_.get(res.data, 'message.user', null));
        })
        .catch((err) => rollbar.error(`Failed to load user by id: ${err}`));
      setLoading(false);
    }
  }, [loading, notif.userId, notif.relatedUserId]);
  if (
    notif.notificationType === 'NOTIFS_TITLE' ||
    notif.notificationType === 'REQUEST_TITLE'
  ) {
    return (
      <Text style={styles.title}>
        {notif.notificationType === 'NOTIFS_TITLE' ? 'All' : 'Follow Requests'}
      </Text>
    );
  }
  return (
    <>
      {!loading && user && (
        <NotificationTile
          url={user.profilePic}
          notif={notif}
          username={user.username}
        />
      )}
    </>
  );
};
export default Notification;
