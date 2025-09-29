import { Stack } from "expo-router";
import React from "react";
import { ErrorBoundary } from "../utils/ErrorBoundary";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Launches" }} />
        <Stack.Screen name="LaunchDetailsScreen" options={{ title: "Details" }} />
        <Stack.Screen name="MapScreen" options={{ title: "Map" }} />
      </Stack>
    </ErrorBoundary>
  );
}