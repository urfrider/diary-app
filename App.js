import Navigator from "./navigator";
import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Realm from "realm";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { DBContext } from "./context";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const DiarySchema = {
  name: "Diary",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [realm, setRealm] = useState(null);

  async function prepare() {
    try {
      const connection = await Realm.open({
        path: "diaryDB",
        schema: [DiarySchema],
      });
      setRealm(connection);
    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  }

  useEffect(() => {
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <DBContext.Provider value={realm}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </View>
    </DBContext.Provider>
  );
}
