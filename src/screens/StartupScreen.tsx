import React from "react";
import { StyleSheet, View, Text, SafeAreaView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { colors } from "../theme/colors";
import { fonts, fontSize } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const { width, height } = Dimensions.get("window");
const isTablet = Math.min(width, height) >= 600;

type Props = NativeStackScreenProps<RootStackParamList, "Startup">;

const mainSticker = require("../../assets/stickers/unimate-sticker.gif");

export default function StartupScreen({ navigation }: Props) {
  const cy = height * (isTablet ? 0.50 : 0.53);
  const mainSize = isTablet ? Math.min(width * 0.50, 520) : Math.min(width * 0.68, 360);

  return (
    <LinearGradient colors={[colors.gradientFrom, colors.gradientTo]} style={styles.fill}>
      <SafeAreaView style={styles.fill}>
        <View style={styles.container}>
          <View style={styles.brandBlock}>
            <Text style={styles.brand}>
              <Text style={styles.brandUni}>Uni</Text>
              <Text style={styles.brandMate}>Mate</Text>
            </Text>
            <Text style={styles.subtitle}>Your Campus Life Assistant</Text>
          </View>

          <Image
            source={mainSticker}
            style={[styles.centerGif, {
              width: mainSize, height: mainSize,
              left: width / 2 - mainSize / 2, top: cy - mainSize / 2,
            }]}
            contentFit="contain"
          />

          <View style={styles.bottomBlock}>
            <Text style={styles.welcome}>👋 Welcome!</Text>
            <Text style={styles.caption}>Please log in with your Campus account to continue</Text>
            <PrimaryButton title="Login" onPress={() => navigation.navigate("Login")} style={{ width: 180, marginTop: 14 }} />
            <Text style={styles.secondary}>No account?</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  container: { flex: 1, alignItems: "center" },
  brandBlock: { marginTop: height * 0.06, alignItems: "center" },
  brand: { fontSize: fontSize.heading, fontFamily: fonts.heading, letterSpacing: 0.5 },
  brandUni: { color: colors.secondary },
  brandMate: { color: colors.primary },
  subtitle: { marginTop: 6, fontSize: fontSize.subtitle, fontFamily: fonts.body, color: colors.textBlack, opacity: 0.7 },
  centerGif: { position: "absolute", zIndex: 2 },
  bottomBlock: { position: "absolute", bottom: height * 0.08, width: "86%", alignItems: "center" },
  welcome: { fontSize: fontSize.body, fontFamily: fonts.body, color: colors.textBlack, marginBottom: 4, fontWeight: "600" },
  caption: { textAlign: "center", color: colors.textBlack, opacity: 0.65, fontSize: fontSize.body, lineHeight: 18, marginBottom: 14, fontFamily: fonts.body },
  secondary: { marginTop: 12, fontSize: 10, color: colors.textBlack, opacity: 0.55, fontFamily: fonts.body },
});
