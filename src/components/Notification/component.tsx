import { Text, ViewStyle } from 'react-native';

import CommentNotification from './subcomponents/CommentNotification';
import FollowNotification from './subcomponents/FollowNotification';
import FollowRequestNotification from './subcomponents/FollowRequestNotification';
import LikeNotification from './subcomponents/LikeNotification';
import { NotificationType } from '../../types';
import React from 'react';
import _ from 'lodash';

interface Props {
  url: string;
  username: string;
  style?: ViewStyle;
  notif: NotificationType;
}

const NotificationTile = ({ url, username, style, notif }: Props) => {
  switch (notif.notificationType) {
    case 'LIKE_POST':
      return (
        <LikeNotification
          username={username}
          url={url}
          style={style}
          postId={notif.relatedPostId}
        />
      );
    case 'COMMENT_POST':
      return (
        <CommentNotification
          username={username}
          url={url}
          style={style}
          comment={_.get(notif, 'comment', '')}
        />
      );
    case 'FOLLOWED':
      return <FollowNotification username={username} url={url} style={style} />;
    case 'FOLLOW_REQUEST':
      return (
        <FollowRequestNotification
          username={username}
          userId={notif.relatedUserId}
          url={url}
          style={style}
        />
      );
    case 'LIKE_COMMENT':
      return <Text>Hello</Text>;
    case 'REQUEST_ACCEPTED':
      return <Text>Hello</Text>;
    default:
      return <Text>Hello</Text>;
  }
};

export default NotificationTile;
