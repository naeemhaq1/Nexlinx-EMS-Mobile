import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  const WORKSPACE_URL = 'https://nex-ems.replit.app';

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setKey(prev => prev + 1);
    setHasError(false);
    setIsLoading(true);
  };

  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar style="light" backgroundColor="#6366f1" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Nexlinx EMS</Text>
        </View>
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Connection Error</Text>
          <Text style={styles.errorMessage}>
            Unable to connect to the server.{'\n'}
            Please check your internet connection.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>↻ Retry Connection</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#6366f1" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Nexlinx EMS</Text>
      </View>
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading Employee Management System...</Text>
        </View>
      )}
      
      <WebView
        key={key}
        source={{ uri: WORKSPACE_URL }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        userAgent="NexlinxEMS/1.0.1 (Mobile App)"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        allowsBackForwardNavigationGestures={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366f1',
  },
  header: {
    height: 60,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
  },
  loadingText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  retryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});