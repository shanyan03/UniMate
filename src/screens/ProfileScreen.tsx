import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { fonts } from "../theme/typography";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.center}>
        <Text style={styles.title}>Profile</Text>
        <Text>Coming soon: avatar, stats, and settings.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontFamily: fonts.heading, fontSize: 24, marginBottom: 8 },
});
