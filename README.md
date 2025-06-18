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
