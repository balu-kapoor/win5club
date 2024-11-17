import React, { useRef, useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  BackHandler,
  Alert,
  ActivityIndicator,
} from "react-native";

interface WebViewNavigationState {
  canGoBack: boolean;
  canGoForward: boolean;
  loading: boolean;
  title: string;
  url: string;
}

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading

  const handleNavigationStateChange = (navState: WebViewNavigationState) => {
    setCanGoBack(navState.canGoBack);
    setLoading(navState.loading); // Update loading state based on navigation
  };

  // Handle the hardware back button press
  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // Prevent default behavior (exiting the app)
      } else {
        Alert.alert(
          "Confirmation",
          "You are about to exit the application. Do you wish to proceed?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            { text: "YES", onPress: () => BackHandler.exitApp() },
          ]
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      )}
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{ uri: "https://win5club.net/" }}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadEnd={() => setLoading(false)} // Hide loader when the page finishes loading
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight, // Ensures the WebView does not overlap with the status bar
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 1,
  },
});
