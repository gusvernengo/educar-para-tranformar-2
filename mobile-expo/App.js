import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
  BackHandler,
  Platform,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';

// IP local por defecto detectada en la red Wi-Fi de tu computadora
const DEFAULT_URL = 'http://192.168.100.63:3000';

export default function App() {
  const [currentUrl, setCurrentUrl] = useState(DEFAULT_URL);
  const [inputUrl, setInputUrl] = useState(DEFAULT_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const webViewRef = useRef(null);

  // Manejador del botón físico "Atrás" en Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true; // No cierra la app
        }
        return false; // Cierra la app si está en la raíz
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }
  }, [canGoBack]);

  const handleReload = () => {
    setHasError(false);
    setIsLoading(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleSaveUrl = () => {
    let cleanUrl = inputUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'http://' + cleanUrl;
    }
    setCurrentUrl(cleanUrl);
    setShowConfigModal(false);
    setHasError(false);
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />

      {/* Barra de cabecera institucional */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🎓</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Educar para Transformar</Text>
            <Text style={styles.headerSubtitle}>Centro Educativo • Campus Móvil</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleReload}
            accessibilityLabel="Recargar página"
          >
            <Text style={styles.headerButtonText}>🔄</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowConfigModal(true)}
            accessibilityLabel="Configuración de IP"
          >
            <Text style={styles.headerButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenedor del WebView principal */}
      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: currentUrl }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          allowsBackForwardNavigationGestures={true}
          mixedContentMode="always"
          originWhitelist={['*']}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('Error en WebView:', nativeEvent);
            setHasError(true);
            setIsLoading(false);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            if (nativeEvent.statusCode >= 400) {
              console.warn('HTTP error:', nativeEvent.statusCode);
            }
          }}
        />

        {/* Indicador de carga */}
        {isLoading && !hasError && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingCard}>
              <ActivityIndicator size="large" color="#1e3a8a" />
              <Text style={styles.loadingText}>Cargando plataforma escolar...</Text>
              <Text style={styles.loadingSubtext}>{currentUrl}</Text>
            </View>
          </View>
        )}

        {/* Pantalla de error si no conecta al servidor */}
        {hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>No se pudo conectar al servidor</Text>
            <Text style={styles.errorDescription}>
              Asegúrate de que la computadora y el celular estén conectados a la misma red Wi-Fi y que el servidor web esté iniciado con:{'\n'}
              <Text style={styles.codeText}>npm run dev</Text>
            </Text>

            <Text style={styles.errorUrlLabel}>Servidor intentado:</Text>
            <Text style={styles.errorUrl}>{currentUrl}</Text>

            <View style={styles.errorButtonsRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleReload}>
                <Text style={styles.primaryButtonText}>Reintentar 🔄</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setShowConfigModal(true)}
              >
                <Text style={styles.secondaryButtonText}>Cambiar IP ⚙️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Modal para configurar la IP del servidor si cambia la red */}
      <Modal
        visible={showConfigModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowConfigModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurar Servidor Local</Text>
            <Text style={styles.modalSubtitle}>
              Ingresa la dirección IP de tu computadora (puerto 3000) donde corre Vite:
            </Text>

            <TextInput
              style={styles.modalInput}
              value={inputUrl}
              onChangeText={setInputUrl}
              placeholder="http://192.168.100.63:3000"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowConfigModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSaveUrl}
              >
                <Text style={styles.modalSaveText}>Conectar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1e3a8a',
  },
  header: {
    height: 60,
    backgroundColor: '#1e3a8a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerIconText: {
    fontSize: 18,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  headerButtonText: {
    fontSize: 16,
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(248, 250, 252, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  loadingText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  loadingSubtext: {
    marginTop: 4,
    fontSize: 11,
    color: '#64748b',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorDescription: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontWeight: 'bold',
    color: '#ea580c',
  },
  errorUrlLabel: {
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  errorUrl: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
    marginBottom: 20,
  },
  errorButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  secondaryButton: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: '#334155',
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1e3a8a',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  modalCancelText: {
    color: '#64748b',
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalSaveButton: {
    backgroundColor: '#ea580c',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  modalSaveText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 13,
  },
});
