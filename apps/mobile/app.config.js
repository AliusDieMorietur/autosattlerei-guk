export default ({ config }) => ({
  ...config,
  expo: {
    name: "Autosattlerei Guk",
    slug: "autosattlerei-guk",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.iakaminskij.autosattlereiguk",
      permissions: ["ACCESS_NETWORK_STATE"],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-font",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "84b6d46d-128e-4d65-acb0-7948c0de4a70",
      },
    },
  },
  build: {
    preview: {
      env: {
        EXPO_PUBLIC_SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL,
        EXPO_PUBLIC_SECRET_TOKEN: process.env.EXPO_PUBLIC_SECRET_TOKEN,
      },
    },
  },
});
