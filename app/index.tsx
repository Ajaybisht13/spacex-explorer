import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { getLaunches } from "@/services/api";
import { LaunchItem } from "../components/LaunchItem";
import { Launch } from "../types";
import { logError, logInfo } from "../utils/logger";

export default function LaunchListScreen() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const fetchLaunches = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getLaunches(page);
      setLaunches((prev) =>
        page === 1 ? response.docs : [...prev, ...response.docs]
      );
      logInfo("Fetched launches", response.docs.length);
    } catch (error) {
      logError("Failed to fetch launches", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page]);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  const filtered = useMemo(() => {
    if (!search.trim()) return launches;
    const lowerSearch = search.toLowerCase();
    return launches.filter((item) =>
      item.name?.toLowerCase().includes(lowerSearch)
    );
  }, [search, launches]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search by mission name..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />
      </View>

      {loading && page === 1 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loaderText}>Loading launches...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="rocket-outline" size={50} color="#aaa" />
          <Text style={styles.emptyText}>No launches found</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <LaunchItem
              launch={item}
              onPress={() =>
                router.push({
                  pathname: "/LaunchDetailsScreen",
                  params: { launch: JSON.stringify(item) },
                })
              }
            />
          )}
          onEndReached={() => setPage((prev) => prev + 1)}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setPage(1);
              }}
              tintColor="#007AFF"
              colors={["#007AFF"]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 16,
  },
});