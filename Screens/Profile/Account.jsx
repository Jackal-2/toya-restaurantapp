import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const Account = () => {
  const [language, setLanguage] = useState("en");
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [theme, setTheme] = useState("system"); // Can be 'system', 'light', or 'dark'

  // Handle theme change
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  // Handle save settings
  const handleSaveSettings = () => {
    // You can add functionality to save settings (e.g., store in AsyncStorage or update state)
    alert("Settings Saved");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Language Selection */}
        <View style={styles.languageContainer}>
          <Text style={styles.subtitle}>Language</Text>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setIsLanguageModalVisible(true)}
          >
            <Text style={styles.arrow}> &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Theme Section */}
        <View style={styles.themeContainer}>
          <Text style={styles.subtitle}>Theme</Text>
          <View style={styles.themeOptions}>
            <View style={styles.themeOption}>
              <Text style={styles.themeText}>System</Text>
              <Switch
                value={theme === "system"}
                onValueChange={() => handleThemeChange("system")}
              />
            </View>
            <View style={styles.themeOption}>
              <Text style={styles.themeText}>Light</Text>
              <Switch
                value={theme === "light"}
                onValueChange={() => handleThemeChange("light")}
              />
            </View>
            <View style={styles.themeOption}>
              <Text style={styles.themeText}>Dark</Text>
              <Switch
                value={theme === "dark"}
                onValueChange={() => handleThemeChange("dark")}
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>

        {/* Language Picker Modal */}
        <Modal
          transparent={true}
          visible={isLanguageModalVisible}
          animationType="fade"
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
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
                <Picker.Item label="German" value="de" />
                <Picker.Item label="Italian" value="it" />
              </Picker>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsLanguageModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  scrollView: {
    alignItems: "center",
  },
  subtitle: {
    fontSize: 22,
    color: "#343a40",
    marginBottom: 10,

  },
  languageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop:"20"
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,  
  },
  arrow: {
    fontSize: 18,
    color: "grey",
    marginLeft: 5,
  },
  themeContainer: {
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  themeOptions: {
    marginTop: 15,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 5, 
  },
  themeOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeText: {
    fontSize: 18,
    color: "#495057",
  },
  themeIconContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 20,
  },
  themeIconText: {
    fontSize: 18,
    color: "#495057",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#add624",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 20,
  },
  picker: {
    height: 150,
    width: "100%",
  },
  modalCloseButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Account;
