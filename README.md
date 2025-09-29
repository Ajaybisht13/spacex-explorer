# 🚀 SpaceX Explorer

A React Native app built with **Expo SDK 53**, **TypeScript**, and **Expo Router**.  
The app lists SpaceX launches, shows launch details, and integrates maps to display launchpad locations along with your current position.  

---

## ✨ Features
- 📋 **Launch List** with infinite scroll and pull-to-refresh  
- 🔍 **Search** launches by mission name  
- 📄 **Launch Details** including launchpad information  
- 🗺️ **Map Screen** with:  
  - Launchpad location (from SpaceX API)  
  - User’s current location (via Expo Location)  
  - Button to open in Google Maps / Apple Maps  
- 🛡️ **Error boundary** & logging helper for stability  
- ✅ **Strong TypeScript typing** for API responses  
- 🎨 **ESLint + Prettier** enforced code style  
- ⚡ **Memoized list items** to avoid unnecessary re-renders  

---

## 🗺️ Map Implementation
- **react-native-maps** → renders map and markers  
- **expo-location** → fetches user’s current location  
- **utils/maps.ts** → opens launchpad in native Maps (Google Maps / Apple Maps)  

---

## 🔐 Permission Flows
- On app load, `expo-location` requests **foreground location permission**.  
- If **denied** → the app shows an alert and only displays the launchpad location.  
- If **granted** → both the launchpad and your **current position** are displayed on the map.  