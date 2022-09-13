import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Text } from "react-native";
import { StreamChat } from "stream-chat";
import {
  OverlayProvider,
  Chat,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthContext from "./contexts/Authentication";

const API_KEY = "btzx9quc4an2";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [userId, setUserId] = useState("");

  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  useEffect(() => {
    return () => client.disconnectUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AuthContext.Provider value={{ userId, setUserId }}>
            <OverlayProvider>
              <Chat client={client}>
                <Navigation colorScheme="light" />
              </Chat>
              {/* <Chat client={client}>
              {selectedChannel ? (
                <Channel channel={selectedChannel}>
                  <MessageList />
                  <MessageInput />
                  <Text onPress={() => setSelectedChannel(null)}>Go Back</Text>
                </Channel>
              ) : (
              )}
            </Chat> */}
            </OverlayProvider>
          </AuthContext.Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}
