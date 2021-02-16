import CommentNotification from './subcomponents/CommentNotification';
import FollowNotification from './subcomponents/FollowNotification';
import FollowRequestNotification from './subcomponents/FollowRequestNotification';
import LikeNotification from './subcomponents/LikeNotification';
import React from 'react';
import { ViewStyle } from 'react-native';

interface Props {
  url: string;
  type: 'like' | 'comment' | 'follow' | 'request';
  username: string;
  style?: ViewStyle;
}

const Notification = ({ url, username, type, style }: Props) => {
  switch (type) {
    case 'like':
      return <LikeNotification username={username} url={url} style={style} />;
    case 'comment':
      return (
        <CommentNotification username={username} url={url} style={style} />
      );
    case 'follow':
      return <FollowNotification username={username} url={url} style={style} />;
    case 'request':
      return (
        <FollowRequestNotification
          username={username}
          url={url}
          style={style}
        />
      );
  }
};

export default Notification;
