import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { getLaunchpad } from "../services/api";
import { Launch, Launchpad } from "../types";
import { logError } from "../utils/logger";

export default function LaunchDetailsScreen() {
  const { launch } = useLocalSearchParams<{ launch: string }>();
  const router = useRouter();

  const parsedLaunch: Launch = JSON.parse(launch);
  const [launchpad, setLaunchpad] = useState<Launchpad | null>(null);

  useEffect(() => {
    getLaunchpad(parsedLaunch.launchpad)
    .then(setLaunchpad)
    .catch((err) => logError("Failed to fetch launchpad", err));
  }, [parsedLaunch.launchpad]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{parsedLaunch.name}</Text>
        <Text style={styles.date}>
          {new Date(parsedLaunch.date_utc).toDateString()}
        </Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: parsedLaunch.success ? "#28a74520" : "#dc354520" },
          ]}
        >
          <Ionicons
            name={parsedLaunch.success ? "checkmark-circle" : "close-circle"}
            size={18}
            color={parsedLaunch.success ? "#28a745" : "#dc3545"}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              styles.statusText,
              { color: parsedLaunch.success ? "#28a745" : "#dc3545" },
            ]}
          >
            {parsedLaunch.success ? "Success" : "Failed"}
          </Text>
        </View>
      </View>

      {launchpad && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Launchpad</Text>
          <Text style={styles.cardSubtitle}>{launchpad.name}</Text>
          <Text style={styles.cardLocation}>
            {launchpad.locality}, {launchpad.region}
          </Text>

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() =>
              router.push({
                pathname: "/MapScreen",
                params: { launchpad: JSON.stringify(launchpad) },
              })
            }
          >
            <Ionicons name="map-outline" size={18} color="#fff" />
            <Text style={styles.mapButtonText}>View on Map</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF",
  },
  cardLocation: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 8,
  },
  mapButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 6,
  },
});