import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import {
  User,
  Phone,
  Mail,
  CreditCard,
  Wallet,
  Tag,
  Settings,
  Lock,
  HelpCircle,
  Info,
  DollarSign,
  Landmark,
} from "lucide-react-native"
import PaymentMethodModal from "../../components/PaymentMethodModal"
import ProfileSection from "../../components/ProfileSection"
import TabBar from "../../components/Tabbar"

const Profile = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const [user, setUser] = useState({
    name: "John Doe",
    phone: "+1234567890",
    balance: "$120.50",
    email: "john@example.com",
  })

  const [paymentMethod, setPaymentMethod] = useState({
    type: "Cash",
    icon: <DollarSign size={24} color="#007AFF" />,
  })
  const [isModalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (route.params?.updatedPhone) {
      setUser((prevUser) => ({ ...prevUser, phone: route.params.updatedPhone }))
    }
    if (route.params?.updatedEmail) {
      setUser((prevUser) => ({ ...prevUser, email: route.params.updatedEmail }))
    }
  }, [route.params?.updatedPhone, route.params?.updatedEmail])

  const changePaymentMethod = (method) => {
    setPaymentMethod(method)
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello, {user.name.split(" ")[0]}!</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentMethod} onPress={() => setModalVisible(true)}>
            {paymentMethod.icon}
            <Text style={styles.paymentMethodText}>{paymentMethod.type}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.balanceContainer}>
            <Wallet size={24} color="black" />
            <Text style={styles.balanceLabel}>Toya Balance</Text>
            <Text style={styles.balanceText}>{user.balance}</Text>
          </View>
        </View>

        <View style={styles.profileSection}>
          <User size={24} color="black" />
          <View style={styles.profileDetails}>
            <Text style={styles.profileTitle}>Name</Text>
            <Text style={styles.profileValue}>{user.name}</Text>
          </View>
        </View>

        <ProfileSection
          icon={<Phone size={24} color="black" />}
          title="Phone"
          value={user.phone}
          onPress={() => navigation.navigate("Phone", { phone: user.phone })}
        />

        <ProfileSection
          icon={<Mail size={24} color="black" />}
          title="Email"
          value={user.email}
          onPress={() => navigation.navigate("Email", { email: user.email })}
        />

        <Text style={styles.sectionTitle}>Other</Text>

        <ProfileSection
          icon={<Tag size={24} color="black" />}
          title="Promo Codes"
          onPress={() => navigation.navigate("Promo")}
        />

        <ProfileSection
          icon={<Settings size={24} color="black" />}
          title="Account Settings"
          onPress={() => navigation.navigate("Account")}
        />

        <ProfileSection
          icon={<Lock size={24} color="black" />}
          title="Privacy"
          onPress={() => navigation.navigate("Privacy")}
        />

        <ProfileSection
          icon={<Info size={24} color="black" />}
          title="About"
          onPress={() => navigation.navigate("About")}
        />

        <ProfileSection
          icon={<HelpCircle size={24} color="black" />}
          title="Support"
          onPress={() => navigation.navigate("Support")}
        />
      </View>

      <PaymentMethodModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={changePaymentMethod}
      />

      <TabBar navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000000",
  },
  content: {
    flex: 1,
  },
  greetingContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#000000",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentMethodText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000000",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 18,
    color: "#000000",
    marginLeft: 10,
    flex: 1,
  },
  balanceText: {
    fontSize: 15,
    color: "black",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  profileDetails: {
    marginLeft: 15,
  },
  profileTitle: {
    fontSize: 16,
    color: "#000000",
  },
  profileValue: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
})

export default Profile

