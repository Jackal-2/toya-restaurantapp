import React, { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, Switch } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { ChevronRight, Globe, Moon, Bell, Save } from "lucide-react-native"

const Account = () => {
  const [language, setLanguage] = useState("en")
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
  const [theme, setTheme] = useState("system")
  const [notifications, setNotifications] = useState(true)

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme)
  }

  const handleSaveSettings = () => {
    // Implement save functionality here
    alert("Settings Saved")
  }

  const renderThemeOption = (themeOption, icon) => (
    <TouchableOpacity
      style={[styles.themeOption, theme === themeOption && styles.activeThemeOption]}
      onPress={() => handleThemeChange(themeOption)}
    >
      {icon}
      <Text style={[styles.themeText, theme === themeOption && styles.activeThemeText]}>
        {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Account Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity style={styles.option} onPress={() => setIsLanguageModalVisible(true)}>
            <View style={styles.optionLeft}>
              <Globe size={24} color="grey" />
              <Text style={styles.optionText}>Language</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>
                {language === "en" ? "English" : language === "es" ? "Español" : "Français"}
              </Text>
              <ChevronRight size={20} color="#C7C7CC" />
            </View>
          </TouchableOpacity>

          <View style={styles.option}>
            <View style={styles.optionLeft}>
              <Moon size={24} color="grey" />
              <Text style={styles.optionText}>Dark Mode</Text>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={(value) => handleThemeChange(value ? "dark" : "light")}
              trackColor={{ false: "#D1D1D6", true: "#4CD964" }}
              thumbColor={theme === "dark" ? "#FFFFFF" : "#F2F2F7"}
            />
          </View>

          <View style={styles.option}>
            <View style={styles.optionLeft}>
              <Bell size={24} color="grey" />
              <Text style={styles.optionText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#D1D1D6", true: "#4CD964" }}
              thumbColor={notifications ? "#FFFFFF" : "#F2F2F7"}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Save size={24} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isLanguageModalVisible}
          animationType="slide"
          onRequestClose={() => setIsLanguageModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <Picker
                selectedValue={language}
                onValueChange={(itemValue) => setLanguage(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Español" value="es" />
                <Picker.Item label="Français" value="fr" />
              </Picker>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsLanguageModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 15,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 17,
    color: "#000000",
    marginLeft: 10,
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionValue: {
    fontSize: 17,
    color: "#8E8E93",
    marginRight: 5,
  },
  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  activeThemeOption: {
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
  },
  themeText: {
    fontSize: 17,
    color: "#000000",
    marginLeft: 10,
  },
  activeThemeText: {
    color: "#007AFF",
  },
  saveButton: {
    backgroundColor: "#add624",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
  },
  picker: {
    width: "100%",
  },
  modalCloseButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
})

export default Account

