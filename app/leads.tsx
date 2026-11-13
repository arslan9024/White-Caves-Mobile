import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiFetch } from '../src/services/api';

interface Lead {
  id: string;
  name?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  status?: string;
  budget?: number;
  currency?: string;
  createdAt?: string;
}

export default function LeadsScreen() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setError(null);
      const res = await apiFetch<any>('/leads?limit=25');
      const items = Array.isArray(res) ? res : res.data || res.leads || [];
      setLeads(items);
    } catch (err: any) {
      setError(err.message || 'Failed to load leads list');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLeads();
  };

  const renderLeadCard = ({ item }: { item: Lead }) => {
    const leadName = item.fullName || item.name || 'Anonymous Client';
    const status = (item.status || 'NEW').toUpperCase();

    const getStatusColor = (s: string) => {
      switch (s) {
        case 'QUALIFIED':
        case 'WON':
          return '#10B981';
        case 'CONTACTED':
        case 'IN_PROGRESS':
          return '#3B82F6';
        case 'LOST':
          return '#EF4444';
        default:
          return '#F59E0B';
      }
    };

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.leadName}>{leadName}</Text>
          <View style={[styles.statusBadge, { borderColor: getStatusColor(status) }]}>
            <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
              {status}
            </Text>
          </View>
        </View>

        {item.phone ? (
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={14} color="#94A3B8" />
            <Text style={styles.infoText}>{item.phone}</Text>
          </View>
        ) : null}

        {item.email ? (
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={14} color="#94A3B8" />
            <Text style={styles.infoText}>{item.email}</Text>
          </View>
        ) : null}

        {item.budget ? (
          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={14} color="#10B981" />
            <Text style={[styles.infoText, { color: '#10B981', fontWeight: '600' }]}>
              Budget: {item.currency || 'AED'} {item.budget.toLocaleString()}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#EF4444" />
          <Text style={styles.loadingText}>Fetching Live Leads...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={styles.errorTitle}>Could Not Fetch Leads</Text>
          <Text style={styles.errorSub}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchLeads}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : leads.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="folder-open-outline" size={48} color="#64748B" />
          <Text style={styles.emptyText}>No leads available at this time.</Text>
        </View>
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          renderItem={renderLeadCard}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#EF4444" />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leadName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 14,
  },
  errorTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  errorSub: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 15,
    marginTop: 12,
  },
});
