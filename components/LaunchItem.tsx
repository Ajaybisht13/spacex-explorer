import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Launch } from "../types";

interface Props {
  launch: Launch;
  onPress: () => void;
}

export const LaunchItem: React.FC<Props> = ({ launch, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    {launch.links.patch.small && (
      <Image source={{ uri: launch.links.patch.small }} style={styles.image} />
    )}
    <View style={styles.info}>
      <Text style={styles.title}>{launch.name}</Text>
      <Text>{new Date(launch.date_utc).toDateString()}</Text>
      <Text>Status: {launch.success ? "✅ Success" : "❌ Failed"}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 12, borderBottomWidth: 1, borderColor: "#ddd" },
  image: { width: 50, height: 50, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600" },
});
