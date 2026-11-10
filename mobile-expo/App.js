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
  ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview';

// URLs predefinidas y configurables por entorno
const VERCEL_PROD_URL = process.env.EXPO_PUBLIC_VERCEL_URL || 'https://educar-para-transformar-gamma.vercel.app';
const LOCAL_DEV_URL = process.env.EXPO_PUBLIC_LOCAL_URL || 'http://127.0.0.1:3000';
const LAN_DEV_URL = process.env.EXPO_PUBLIC_LAN_URL || 'http://10.13.19.38:3000';

// URL inicial: variable de entorno EXPO_PUBLIC_WEB_URL, o local por defecto
const DEFAULT_URL = process.env.EXPO_PUBLIC_WEB_URL || LOCAL_DEV_URL;

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

  const handleApplyPreset = (presetUrl) => {
    let cleanUrl = presetUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    setInputUrl(cleanUrl);
    setCurrentUrl(cleanUrl);
    setShowConfigModal(false);
    setHasError(false);
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />

      {/* Contenedor del WebView principal a pantalla completa */}
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

        {/* Control flotante discreto (píldora compacta para no duplicar el header) */}
        <View style={styles.floatingPillContainer} pointerEvents="box-none">
          <View style={styles.floatingPill}>
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={handleReload}
              accessibilityLabel="Recargar aplicación"
              activeOpacity={0.7}
            >
              <Text style={styles.floatingButtonText}>🔄</Text>
            </TouchableOpacity>

            <View style={styles.floatingDivider} />

            <TouchableOpacity
              style={styles.floatingButton}
              onPress={() => setShowConfigModal(true)}
              accessibilityLabel="Configurar servidor y URL"
              activeOpacity={0.7}
            >
              <Text style={styles.floatingButtonText}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Indicador de carga fluido e institucional */}
        {isLoading && !hasError && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingCard}>
              <View style={styles.loadingIconCircle}>
                <Text style={styles.loadingIconText}>🎓</Text>
              </View>
              <ActivityIndicator size="large" color="#1e3a8a" style={styles.loadingSpinner} />
              <Text style={styles.loadingTitle}>Educar para Transformar</Text>
              <Text style={styles.loadingText}>Conectando con el campus escolar...</Text>
              <View style={styles.loadingUrlBadge}>
                <Text style={styles.loadingSubtext} numberOfLines={1}>{currentUrl}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Pantalla de error con acceso a presets rápidos */}
        {hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>No se pudo conectar al servidor</Text>
            <Text style={styles.errorDescription}>
              Verificá que el servidor web esté iniciado o conectate directamente a la versión de producción en Vercel:
            </Text>

            <Text style={styles.errorUrlLabel}>Servidor intentado:</Text>
            <Text style={styles.errorUrl} numberOfLines={2}>{currentUrl}</Text>

            <View style={styles.errorButtonsRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleReload}>
                <Text style={styles.primaryButtonText}>Reintentar 🔄</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setShowConfigModal(true)}
              >
                <Text style={styles.secondaryButtonText}>Configurar ⚙️</Text>
              </TouchableOpacity>
            </View>

            {/* Presets rápidos directos en caso de fallo */}
            <View style={styles.errorPresetsContainer}>
              <Text style={styles.errorPresetsLabel}>Conectar directamente con 1 toque:</Text>
              <View style={styles.errorPresetsRow}>
                <TouchableOpacity
                  style={[styles.errorPresetChip, styles.errorPresetVercel]}
                  onPress={() => handleApplyPreset(VERCEL_PROD_URL)}
                >
                  <Text style={styles.errorPresetChipTextVercel}>🚀 Vercel (Producción)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.errorPresetChip}
                  onPress={() => handleApplyPreset(LOCAL_DEV_URL)}
                >
                  <Text style={styles.errorPresetChipText}>💻 Local (3000)</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Modal para configurar la URL del servidor y presets rápidos */}
      <Modal
        visible={showConfigModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowConfigModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurar Servidor</Text>
            <Text style={styles.modalSubtitle}>
              Elegí una conexión rápida o personalizá la dirección IP:
            </Text>

            {/* Presets de conexión rápida (1-tap) */}
            <Text style={styles.presetSectionLabel}>PRESETS RÁPIDOS (1-TAP):</Text>
            <View style={styles.presetsList}>
              <TouchableOpacity
                style={[
                  styles.presetItem,
                  currentUrl === VERCEL_PROD_URL && styles.presetItemActive
                ]}
                onPress={() => handleApplyPreset(VERCEL_PROD_URL)}
                activeOpacity={0.8}
              >
                <Text style={styles.presetItemIcon}>🚀</Text>
                <View style={styles.presetItemTextContainer}>
                  <Text style={styles.presetItemTitle}>Usar Producción (Vercel)</Text>
                  <Text style={styles.presetItemUrl} numberOfLines={1}>{VERCEL_PROD_URL}</Text>
                </View>
                {currentUrl === VERCEL_PROD_URL && (
                  <Text style={styles.presetActiveBadge}>Activo</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.presetItem,
                  currentUrl === LOCAL_DEV_URL && styles.presetItemActive
                ]}
                onPress={() => handleApplyPreset(LOCAL_DEV_URL)}
                activeOpacity={0.8}
              >
                <Text style={styles.presetItemIcon}>💻</Text>
                <View style={styles.presetItemTextContainer}>
                  <Text style={styles.presetItemTitle}>Usar Red Local (Simulador)</Text>
                  <Text style={styles.presetItemUrl} numberOfLines={1}>{LOCAL_DEV_URL}</Text>
                </View>
                {currentUrl === LOCAL_DEV_URL && (
                  <Text style={styles.presetActiveBadge}>Activo</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.presetItem,
                  currentUrl === LAN_DEV_URL && styles.presetItemActive
                ]}
                onPress={() => handleApplyPreset(LAN_DEV_URL)}
                activeOpacity={0.8}
              >
                <Text style={styles.presetItemIcon}>📱</Text>
                <View style={styles.presetItemTextContainer}>
                  <Text style={styles.presetItemTitle}>Usar Red Local (Wi-Fi / LAN)</Text>
                  <Text style={styles.presetItemUrl} numberOfLines={1}>{LAN_DEV_URL}</Text>
                </View>
                {currentUrl === LAN_DEV_URL && (
                  <Text style={styles.presetActiveBadge}>Activo</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.modalDivider} />

            <Text style={styles.manualInputLabel}>O ingresá manualmente la IP o dominio:</Text>
            <TextInput
              style={styles.modalInput}
              value={inputUrl}
              onChangeText={setInputUrl}
              placeholder="http://192.168.1.X:3000"
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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

  // Píldora flotante compacta
  floatingPillContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 14,
    zIndex: 999,
  },
  floatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.84)',
    borderRadius: 22,
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  floatingButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonText: {
    fontSize: 16,
  },
  floatingDivider: {
    width: 1,
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    marginHorizontal: 1,
  },

  // Indicador de carga fluido
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(248, 250, 252, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCard: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 28,
    paddingVertical: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
    maxWidth: '85%',
  },
  loadingIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  loadingIconText: {
    fontSize: 24,
  },
  loadingSpinner: {
    marginBottom: 10,
  },
  loadingTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loadingText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
  },
  loadingUrlBadge: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  loadingSubtext: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },

  // Pantalla de error
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorIcon: {
    fontSize: 44,
    marginBottom: 10,
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
  },
  errorUrlLabel: {
    fontSize: 10,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  errorUrl: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  secondaryButton: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: '#334155',
    fontWeight: 'bold',
    fontSize: 12,
  },
  errorPresetsContainer: {
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    alignItems: 'center',
  },
  errorPresetsLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '700',
    marginBottom: 8,
  },
  errorPresetsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  errorPresetChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
  },
  errorPresetVercel: {
    backgroundColor: '#eff6ff',
    borderColor: '#93c5fd',
  },
  errorPresetChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  errorPresetChipTextVercel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1e40af',
  },

  // Modal de configuración y presets
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
    marginBottom: 12,
  },
  presetSectionLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94a3b8',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  presetsList: {
    gap: 8,
    marginBottom: 12,
  },
  presetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 10,
  },
  presetItemActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  presetItemIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  presetItemTextContainer: {
    flex: 1,
  },
  presetItemTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1e293b',
  },
  presetItemUrl: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 1,
  },
  presetActiveBadge: {
    fontSize: 9,
    fontWeight: '900',
    color: '#1e40af',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    textTransform: 'uppercase',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 10,
  },
  manualInputLabel: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '700',
    marginBottom: 6,
  },
  modalInput: {
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#1e293b',
    marginBottom: 14,
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
    fontSize: 12,
  },
  modalSaveButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  modalSaveText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 12,
  },
});
