import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://api.whitecaves.ae';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>WHITE CAVES</Text>
          <Text style={styles.brandSubtitle}>Luxury Real Estate LLC — Dubai</Text>
        </View>

        {/* Status Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mobile Platform Initialized</Text>
          <Text style={styles.cardText}>
            Cross-platform React Native engine connected with unified White Caves backend services.
          </Text>

          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>React Native 0.76</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Expo SDK 52</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Expo Router v4</Text>
            </View>
          </View>
        </View>

        {/* Backend Connectivity */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>API Gateway Bridge</Text>
          <Text style={styles.endpointText}>{apiUrl}</Text>
          <Text style={styles.helperText}>
            Bridges directly via Cloudflare Tunnel to your local development server or cloud production cluster.
          </Text>
        </View>

        {/* Fast Action Modules */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionButtonTitle}>VIP Leads</Text>
            <Text style={styles.actionButtonSubtitle}>Instant Lead Routing</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionButtonTitle}>Properties</Text>
            <Text style={styles.actionButtonSubtitle}>Offplan & Secondary</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionButtonTitle}>Viewings</Text>
            <Text style={styles.actionButtonSubtitle}>Calendar & Lockboxes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionButtonTitle}>Contracts</Text>
            <Text style={styles.actionButtonSubtitle}>Ejari & NOC Vault</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#EF4444',
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  badge: {
    backgroundColor: '#0F172A',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  badgeText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E2E8F0',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  endpointText: {
    fontSize: 13,
    color: '#10B981',
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  helperText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  actionButtonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  actionButtonSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
