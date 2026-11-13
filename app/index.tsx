import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F1D" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.brandingRow}>
            <Image
              source={require('../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.brandTitle}>WHITE CAVES</Text>
              <Text style={styles.brandSubtitle}>REAL ESTATE LLC · DUBAI</Text>
            </View>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>AEGIS V5.0</Text>
          </View>
        </View>

        {/* User Session Banner */}
        <View style={styles.sessionCard}>
          <View style={styles.sessionInfo}>
            <Ionicons
              name={user ? 'person-circle-outline' : 'shield-outline'}
              size={36}
              color="#EF4444"
            />
            <View style={styles.sessionText}>
              <Text style={styles.userName}>
                {user ? (user.name || user.email) : 'Guest Agent'}
              </Text>
              <Text style={styles.userRole}>
                {user ? `Authenticated · ${user.role || 'Broker'}` : 'Sign in to sync live listings & leads'}
              </Text>
            </View>
          </View>
          {user ? (
            <TouchableOpacity style={styles.authBtn} onPress={logout}>
              <Text style={styles.authBtnText}>Sign Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.authBtn} onPress={() => router.push('/login')}>
              <Text style={styles.authBtnText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Nav Grid */}
        <Text style={styles.sectionTitle}>COMMAND OPERATIONS</Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/leads')}
          >
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
              <Ionicons name="people-outline" size={24} color="#EF4444" />
            </View>
            <Text style={styles.cardTitle}>Live Leads</Text>
            <Text style={styles.cardSubtitle}>Inbound inquiries & client matches</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/properties')}
          >
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
              <Ionicons name="business-outline" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.cardTitle}>Properties</Text>
            <Text style={styles.cardSubtitle}>Dubai penthouses, villas & offplan</Text>
          </TouchableOpacity>
        </View>

        {/* System Telemetry Banner */}
        <View style={styles.telemetryCard}>
          <View style={styles.telemetryHeader}>
            <Ionicons name="pulse" size={16} color="#10B981" />
            <Text style={styles.telemetryTitle}>AEGIS MESH TELEMETRY</Text>
          </View>
          <Text style={styles.telemetryBody}>
            Connected to 4-tier White Caves mesh. Zero-latency DLD/RERA compliance ledger active.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 1,
  },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.5,
  },
  badge: {
    backgroundColor: '#1E293B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  badgeText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '800',
  },
  sessionCard: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: 10,
  },
  sessionText: {
    flex: 1,
  },
  userName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  userRole: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  authBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  authBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#64748B',
    fontSize: 11,
    lineHeight: 15,
  },
  telemetryCard: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  telemetryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  telemetryTitle: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  telemetryBody: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 17,
  },
});
