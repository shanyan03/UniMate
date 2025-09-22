import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { fonts } from "../theme/typography";

export default function LighthouseScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.center}>
        <Text style={styles.h}>Lighthouse</Text>
        <Text>Placeholder — wire SOS + calming tools next.</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  h: { fontFamily: fonts.heading, fontSize: 24, marginBottom: 8 },
});
