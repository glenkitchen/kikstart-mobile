# Setup

Create application

```bash
bun create expo-app
```

Reset project

```
bun run reset-project
```

[Install Nativewind](https://www.nativewind.dev/docs/getting-started/installation)

Install Expo dependencies

```bash
# Install
bunx expo install expo-audio
bunx expo install expo-camera
bunx expo install expo-checkbox
bunx expo install expo-dev-client
bunx expo install expo-file-system
bunx expo install expo-image-picker
bunx expo install expo-maps
bunx expo install expo-media-library
bunx expo install expo-secure-store
bunx expo install expo-video

# Doctor
bunx expo-doctor

# Build
bunx expo prebuild
bunx expo run:android -d
```

Install template dependencies in AI Chat.

```bash
bunx expo install @expo-google-fonts/outfit
bunx expo install @react-native-community/datetimepicker
bunx expo install @react-native-community/slider
bunx expo install @react-native-community/viewpager
bunx expo install @react-navigation/drawer
bunx expo install babel-preset-expo
bunx expo install clsx
bunx expo install expo-asset
bunx expo install expo-linear-gradient
bunx expo install expo-location
bunx expo install expo-navigation-bar
bunx expo install expo-notifications
bunx expo install expo-sharing
bunx expo install expo-updates
bunx expo install lottie-react-native
bunx expo install lucide-react-native
bunx expo install react-native-actions-sheet
bunx expo install react-native-calendars
bunx expo install react-native-chart-kit
bunx expo install react-native-css-interop
bunx expo install react-native-maps
bunx expo install react-native-modal
bunx expo install react-native-modal-datetime-picker
bunx expo install react-native-navigation-bar-color
bunx expo install react-native-svg
bunx expo install tailwind-merge
bunx expo install victory-native
```

Copy template components

- Copy folders and tailwind configuration

  - app/\_layout.tsx
  - app/[...404].tsx
  - assets/
  - components/
  - contexts/
  - hooks/
  - lib/
  - screens/
  - utils/
  - tailwind.config.js

- Fix errors in AI Chat.
  - Navigation/Link Type Errors (expo-router)
  - IconName Type Errors
  - Section Import Errors
  - NativeWind v4 Migration (Usage of deprecated APIs like styled and NativeWindStyleSheet from nativewind v4+.)
  - Other Prop Type Mismatches

```bash
bunx tsc --noEmit
```
