import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#B0BEC5",
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel, // Custom label styling
        tabBarBackground: () => (
          <LinearGradient
            colors={["#6339c3", "#299868"]} // Gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground} // Apply the style for the gradient
          />
        ),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name='globe' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='info'
        options={{
          title: "Info",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name='info-circle' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    marginHorizontal: 5,
    marginBottom: 5,
    paddingVertical: 10,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6339c3",
    borderTopColor: "#6339c3",
    elevation: 12,
    shadowColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent shadow
    shadowOpacity: 0.4, // This mainly affects iOS
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowRadius: 5,
  },
  tabBarLabel: {
    fontSize: 12, // Smaller, modern font size
    fontWeight: "500", // Medium weight for better readability
    marginBottom: 5,
    letterSpacing: 0.5, // Slight spacing for a cleaner look
  },
  gradientBackground: {
    flex: 1, // Ensure gradient fills the entire tab bar
    overflow: "hidden",
    borderRadius: 30, // Rounded corners
    // Rounded corners
  },
});
