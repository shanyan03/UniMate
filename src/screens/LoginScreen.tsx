// src/screens/LoginScreen.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { fonts, fontSize } from "../theme/typography";
import LabeledInput from "../components/LabeledInput";
import PrimaryButton from "../components/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const { height } = Dimensions.get("window");
const SHEET_RADIUS = 28;

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [secure, setSecure] = useState(true);
  const [touched, setTouched] = useState({ email: false, pwd: false });

  const emailError = useMemo(() => {
    if (!touched.email) return "";
    if (!email.trim()) return "Email is required";
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return ok ? "" : "Enter a valid email";
  }, [email, touched.email]);

  const pwdError = useMemo(() => {
    if (!touched.pwd) return "";
    if (!pwd) return "Password is required";
    if (pwd.length < 6) return "Minimum 6 characters";
    return "";
  }, [pwd, touched.pwd]);

  const isValid = !emailError && !pwdError && email && pwd;

  const onLogin = () => {
    if (!isValid) {
      setTouched({ email: true, pwd: true });
      return;
    }

    // ✅ Jump into bottom tabs (initial route is Island) and clear history
    navigation.reset({
      index: 0,
      routes: [{ name: "Tabs" }], // Tabs navigator opens with Island by default
    });

    // If you're NOT using tabs and want to go straight to a stack screen:
    // navigation.reset({ index: 0, routes: [{ name: "Island" }] });
  };

  return (
    <LinearGradient colors={[colors.gradientTo, colors.gradientFrom]} style={styles.fill}>
      <SafeAreaView style={styles.fill}>
        <KeyboardAvoidingView
          style={styles.fill}
          behavior={Platform.select({ ios: "padding", android: undefined })}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            {/* Header with brand */}
            <View style={styles.header}>
              <Text style={styles.brand}>
                <Text style={styles.brandUni}>Uni</Text>
                <Text style={styles.brandMate}>Mate</Text>
              </Text>
            </View>

            {/* White sheet */}
            <View style={styles.sheet}>
              <Text style={styles.title}>Welcome Back</Text>
              <View style={{ height: 20 }} />

              <LabeledInput
                label="Campus Email"
                placeholder="you@xmu.edu.my"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (!touched.email) setTouched((s) => ({ ...s, email: true }));
                }}
                onBlur={() => setTouched((s) => ({ ...s, email: true }))}
                error={emailError}
              />

              <LabeledInput
                label="Password"
                placeholder="••••••••"
                secureToggle
                isSecure={secure}
                onToggleSecure={() => setSecure((s) => !s)}
                value={pwd}
                onChangeText={(t) => {
                  setPwd(t);
                  if (!touched.pwd) setTouched((s) => ({ ...s, pwd: true }));
                }}
                onBlur={() => setTouched((s) => ({ ...s, pwd: true }))}
                error={pwdError}
              />

              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.forgot}>Forgot Password</Text>
              </TouchableOpacity>

              <View style={{ height: 18 }} />
              <PrimaryButton
                title="Login"
                onPress={onLogin}
                style={{ alignSelf: "center", width: 140, height: 46, opacity: isValid ? 1 : 0.7 }}
              />

              <View style={{ marginTop: "auto", alignItems: "center" }}>
                <View style={{ height: 20 }} />
                <Text style={styles.footerText}>
                  Haven’t created account yet? <Text style={styles.footerLink}>Create one</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  header: { height: height * 0.24, alignItems: "center", justifyContent: "center" },
  brand: { fontSize: fontSize.heading, fontFamily: fonts.heading, letterSpacing: 0.5 },
  brandUni: { color: colors.secondary },
  brandMate: { color: colors.primaryDark },

  sheet: {
    flexGrow: 1,
    minHeight: height * 0.76,
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: -2 },
    elevation: 3,
  },
  title: { textAlign: "center", fontFamily: fonts.heading, fontSize: 32, color: "#111" },
  forgot: { marginTop: 8, fontFamily: fonts.body, fontSize: fontSize.body, color: "rgba(17,17,17,0.6)" },
  footerText: { fontFamily: fonts.body, fontSize: fontSize.body, color: "rgba(17,17,17,0.6)", textAlign: "center" },
  footerLink: { color: colors.secondary, fontFamily: fonts.body, fontSize: fontSize.body },
});
