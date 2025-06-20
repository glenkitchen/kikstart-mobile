# Setup

- Create application

```bash
# Create application
bunx create-expo

## Reset project
bun run reset-project
```

- [Install Nativewind](https://www.nativewind.dev/docs/getting-started/installation)

- Install Expo dependencies

```bash
# Install
bun expo install expo-asset
bun expo install expo-audio
bun expo install expo-camera
bun expo install expo-checkbox
bun expo install expo-dev-client
bun expo install expo-file-system
bun expo install expo-image-picker
bun expo install expo-linear-gradient
bun expo install expo-location
bun expo install expo-maps
bun expo install expo-media-library
bun expo install expo-navigation-bar
bun expo install expo-notifications
bun expo install expo-secure-store
bun expo install expo-sharing
bun expo install expo-updates
bun expo install expo-video

# Run Expo doctor
bunx expo-doctor

```

- Install template dependencies.

Use Cursor to extract dependencies. (Compare `package.json`)

```bash
bun expo install @expo-google-fonts/outfit
bun expo install @react-native-community/datetimepicker
bun expo install @react-navigation/drawer
bun expo install babel-preset-expo
bun expo install clsx
bun expo install lucide-react-native
bun expo install react-native-actions-sheet
bun expo install react-native-svg
bun expo install tailwind-merge
```

- Copy template components and screens

  - Copy files and folders (Including Tailwindcss configuration):

    - `app/\_layout.tsx`
    - `app/[...404].tsx`
    - `assets/`
    - `components/`
    - `contexts/`
    - `hooks/`
    - `lib/`
    - `screens/`
    - `utils/`
    - `tailwind.config.js`

  - Check and fix errors with Cursor:

    ```bash
    bunx tsc --noEmit
    ```

    - Navigation/Link Type Errors (expo-router)
    - IconName Type Errors
    - Section Import Errors
    - NativeWind v4 Migration (Usage of deprecated APIs like styled and NativeWindStyleSheet from nativewind v4+.)
    - Other Prop Type Mismatches
