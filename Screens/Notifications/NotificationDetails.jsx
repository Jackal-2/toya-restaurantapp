import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For icons

const { width, height } = Dimensions.get('window');

const NotificationDetails = ({ route, navigation }) => {
  const { notification } = route.params || {};

  // If notification data is missing, display an error
  if (!notification) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Notification not found!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Notification Details Container */}
      <View style={styles.notificationCard}>
        {/* Notification Title */}
        <Text style={styles.title}>{notification.title}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Notification Description */}
        <Text style={styles.description}>{notification.description}</Text>

        {/* Timestamp */}
        <Text style={styles.timestamp}>Received on: {notification.timestamp}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Status Icon and Status Message */}
        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name={notification.status === 'delivered' ? 'check-circle' : 'clock'}
            size={24}
            color={notification.status === 'delivered' ? 'green' : '#ff9800'}
            style={styles.statusIcon}
          />
          <Text
            style={[
              styles.statusText,
              { color: notification.status === 'delivered' ? 'green' : '#ff9800' },
            ]}
          >
            {notification.status === 'delivered' ? 'Delivered' : 'In Progress'}
          </Text>
        </View>
      </View>

      {/* Acknowledge Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Notifications</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statusIcon: {
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationDetails;
