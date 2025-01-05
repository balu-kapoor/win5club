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
    setLoading(navState.loading);

    if (webViewRef.current && navState.url.includes("deposit")) {
      const script = `
        (function() {
          const form = document.querySelector('form');
          if (form) {
            // Create a container div for better styling
            const container = document.createElement('div');
            container.style.textAlign = 'center';
            container.style.padding = '20px';
            container.style.maxWidth = '600px';
            container.style.margin = '0 auto';

            // Add heading
            const heading = document.createElement('h4');
            heading.textContent = 'For secure payment processing';
            heading.style.marginBottom = '15px';
            heading.style.color = '#333';

            // Add message
            const message = document.createElement('p');
            message.textContent = 'Please visit our official website:';
            message.style.marginBottom = '15px';

            // Add link
            const link = document.createElement('a');
            link.href = 'https://win5club.net/deposit';
            link.textContent = 'Pay Now';
            link.target = '_blank';
            link.style.color = '#007bff';
            link.style.textDecoration = 'underline';
            link.style.fontSize = '16px';
            link.style.display = 'block';
            link.style.marginTop = '10px';

            // Assemble the elements
            container.appendChild(heading);
            container.appendChild(message);
            container.appendChild(link);

            // Replace form with container
            form.parentNode.replaceChild(container, form);
          }
          true;
        })();
      `;

      webViewRef.current.injectJavaScript(script);
    }
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
        source={{
          uri: "https://win5club.net/",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            "X-Requested-With": "XMLHttpRequest",
          },
        }}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadEnd={() => setLoading(false)} // Hide loader when the page finishes loading
        userAgent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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
    marginBottom: 70,
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
