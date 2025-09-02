import { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, View, StyleSheet, Text } from "react-native";
import colors from "@/constants/colors";

export default function LoadingComponent() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}>
        <Text style={styles.logoChegou}>Chegou</Text>
        <Text style={styles.logoApp}>App!</Text>
      </Animated.View>
      
      <Text style={styles.loadingText}>Preparando tudo para você...</Text>
      
      <ActivityIndicator 
        size="large" 
        color={colors.green} 
        style={styles.spinner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.zinc,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  
  logoContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  
  logoChegou: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
  },
  
  logoApp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.green,
  },
  
  loadingText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 30,
    textAlign: 'center',
  },
  
  spinner: {
    marginTop: 20,
  },
  
  // Dots Animation
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.green,
    marginHorizontal: 5,
  },
  
  // Progress Bar
  progressContainer: {
    width: 200,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginBottom: 30,
    overflow: 'hidden',
  },
  
  progressBar: {
    height: '100%',
    backgroundColor: colors.green,
    borderRadius: 3,
  },
  
  // Circle Progress
  circleProgress: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderTopColor: colors.green,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  circleInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  
  // Splash Screen
  splashContainer: {
    flex: 1,
    backgroundColor: colors.zinc,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  splashContent: {
    alignItems: 'center',
    marginBottom: 80,
  },
  
  splashLogoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  
  splashLogoChegou: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.white,
  },
  
  splashLogoApp: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.green,
  },
  
  splashTagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  
  splashSpinner: {
    position: 'absolute',
    bottom: 100,
  },
});