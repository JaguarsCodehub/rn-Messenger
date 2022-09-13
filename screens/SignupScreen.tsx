import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import AuthContext from "../contexts/Authentication";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const { setUserId } = useContext(AuthContext);

  const { client } = useChatContext();

  const connectUser = async (username: string, fullName: string) => {
    await client.connectUser(
      {
        id: username,
        name: fullName,
        // image: "https://i.imgur.com/fr93z14.png",
      },
      client.devToken(username)
    );

    // Create a CHannel
    const channel = client.channel("livestream", "live", {
      name: "notJust.dev",
    });
    await channel.create();

    setUserId(username);
  };

  const signUp = () => {
    // Sign up the user with your backend
    connectUser(username, fullName);
  };
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setFullName}
          placeholder="Fullname"
          style={styles.input}
        />
      </View>

      <Pressable onPress={signUp} style={styles.button}>
        <Text>Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "white",
    marginVertical: 10,
  },
  input: {},
  button: {
    backgroundColor: "#256cff",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
  },
});

export default SignupScreen;
