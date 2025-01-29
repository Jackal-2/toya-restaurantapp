import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { ChevronRight } from "lucide-react-native"

const ProfileSection = ({ icon, title, value, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        {icon}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {value && <Text style={styles.value}>{value}</Text>}
        </View>
      </View>
      <ChevronRight size={24} color="#C7C7CC" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    color: "#000000",
  },
  value: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
})

export default ProfileSection

