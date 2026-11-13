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

interface Property {
  id: string;
  title?: string;
  name?: string;
  type?: string;
  price?: number;
  location?: string;
  community?: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt?: number;
}

export default function PropertiesScreen() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setError(null);
      const res = await apiFetch<any>('/properties?limit=25');
      const items = Array.isArray(res) ? res : res.data || res.properties || [];
      setProperties(items);
    } catch (err: any) {
      setError(err.message || 'Failed to load property inventory');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProperties();
  };

  const renderPropertyCard = ({ item }: { item: Property }) => {
    const title = item.title || item.name || 'Luxury Residential Unit';
    const location = item.community || item.location || 'Dubai, UAE';

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{item.type || 'PENTHOUSE'}</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#EF4444" />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <View style={styles.specRow}>
          {item.bedrooms ? (
            <View style={styles.specItem}>
              <Ionicons name="bed-outline" size={14} color="#94A3B8" />
              <Text style={styles.specText}>{item.bedrooms} Beds</Text>
            </View>
          ) : null}

          {item.bathrooms ? (
            <View style={styles.specItem}>
              <Ionicons name="water-outline" size={14} color="#94A3B8" />
              <Text style={styles.specText}>{item.bathrooms} Baths</Text>
            </View>
          ) : null}

          {item.areaSqFt ? (
            <View style={styles.specItem}>
              <Ionicons name="scan-outline" size={14} color="#94A3B8" />
              <Text style={styles.specText}>{item.areaSqFt.toLocaleString()} sq.ft</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.footer}>
          <Text style={styles.priceLabel}>Asking Price</Text>
          <Text style={styles.priceValue}>
            AED {item.price ? item.price.toLocaleString() : 'Price on Request'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#EF4444" />
          <Text style={styles.loadingText}>Fetching Dubai Inventory...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={styles.errorTitle}>Could Not Fetch Inventory</Text>
          <Text style={styles.errorSub}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchProperties}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : properties.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="business-outline" size={48} color="#64748B" />
          <Text style={styles.emptyText}>No properties currently loaded.</Text>
        </View>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={renderPropertyCard}
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
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  locationText: {
    color: '#94A3B8',
    fontSize: 13,
  },
  specRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 12,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  specText: {
    color: '#CBD5E1',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    color: '#64748B',
    fontSize: 12,
  },
  priceValue: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '700',
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
