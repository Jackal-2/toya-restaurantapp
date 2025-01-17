import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For fancy icons

const { width, height } = Dimensions.get('window');

// Sample notification data
const notifications = [
  {
    id: '1',
    title: 'Order Received',
    description: 'We have received your order and are preparing it now.',
    timestamp: '2025-01-17 11:00 AM',
    status: 'received',
  },
  {
    id: '2',
    title: 'Order Processing',
    description: 'We are currently processing your order.',
    timestamp: '2025-01-17 10:00 AM',
    status: 'processing',
  },
    {
    id: '3',
    title: 'On the way!',
    description: 'Your food order is on its way! It will arrive shortly.',
    timestamp: '2025-01-17 12:30 PM',
    status: 'shipped',
  },

  {
    id: '4',
    title: 'Order Delivered',
    description: 'Your order has been delivered. Enjoy your meal!',
    timestamp: '2025-01-16 08:00 PM',
    status: 'delivered',
  },

];

const Notifications = ({ navigation }) => {
  const handleNotificationPress = (notification) => {
    // Navigate to the NotificationDetails screen with the selected notification
    navigation.navigate('NotificationDetails', { notification });
  };

  const renderNotificationItem = ({ item }) => {
    let statusIcon;
    let statusText;
    let leftBorderColor;


    switch (item.status) {
      case 'shipped':
        statusIcon = 'truck';
        statusText = 'Delivering';
        leftBorderColor = 'blue'; 
        break;
      case 'received':
        statusIcon = 'package';
        statusText = 'Received';
        leftBorderColor = 'orange'; 
        break;
      case 'delivered':
        statusIcon = 'check-circle';
        statusText = 'Delivered';
        leftBorderColor = 'green'; 
        break;
      case 'processing':
        statusIcon = 'cogs';
        statusText = 'Processing';
        leftBorderColor = 'gray';
        break;
      default:
        statusIcon = 'bell';
        statusText = '';
        leftBorderColor = 'gray'; 
    }

    return (
      <TouchableOpacity
        style={[styles.notificationItem, { borderLeftColor: leftBorderColor }]}
        onPress={() => handleNotificationPress(item)}
      >
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDescription} numberOfLines={1} ellipsizeMode="tail">
            {item.description}
          </Text>
          <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>

          {/* Status icon and label */}
          <View style={styles.statusContainer}>
            <MaterialCommunityIcons name={statusIcon} size={24} color="black" />
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        ListEmptyComponent={<Text style={styles.emptyList}>No notifications available</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  notificationItem: {
    flexDirection: 'row', 
    padding: 15,
    backgroundColor: '#fff', 
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 5, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: 10, 
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    color: 'black', 
    marginLeft: 5,
    fontWeight: 'bold',
  },
  emptyList: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Notifications;
