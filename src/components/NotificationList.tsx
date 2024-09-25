import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NotificationItem from './NotificationItem';
import {NotificationData} from './types/NotificationData';

interface NotificationListProps {
  title: string;
  notifications: NotificationData[];
}

const NotificationList: React.FC<NotificationListProps> = ({
  title,
  notifications,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {notifications.map((notification, index) => (
        <NotificationItem key={index} {...notification} />
      ))}
    </View>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: '800',
    color: '#3f3f46', // text-zinc-700
  },
});
