import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { logError } from "../utils/logger";

import { Launchpad } from "../types";
import { openMaps } from "../utils/maps";

export default function MapScreen() {
  const { launchpad } = useLocalSearchParams<{ launchpad: string }>();
  const parsedLaunchpad: Launchpad = JSON.parse(launchpad);

  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Enable location to see your position.");
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } catch (err) {
        logError("Failed to get user location", err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: parsedLaunchpad.latitude,
          longitude: parsedLaunchpad.longitude,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        <Marker
          coordinate={{
            latitude: parsedLaunchpad.latitude,
            longitude: parsedLaunchpad.longitude,
          }}
          title={parsedLaunchpad.name}
        />
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="You"
            pinColor="blue"
          />
        )}
      </MapView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          openMaps(parsedLaunchpad.latitude, parsedLaunchpad.longitude)
        }
      >
        <Text style={styles.buttonText}>Open in Maps</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});