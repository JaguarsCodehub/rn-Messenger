import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ChannelList } from "stream-chat-expo";
import React, { useContext } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import AuthContext from "../contexts/Authentication";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const onChannelPressed = (channel) => {
    navigation.navigate("Channel", { channel });
  };

  const { userId } = useContext(AuthContext);
  const filters = { members: { $in: [userId] } };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ChannelList onSelect={onChannelPressed} filters={filters} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
