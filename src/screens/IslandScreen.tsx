// src/screens/IslandScreen.tsx
import React, { useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { fonts } from "../theme/typography";
import BuildingMarker from "../components/BuildingMarker";
import BuildingSheet from "../components/BuildingSheet";

import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { RootStackParamList } from "../../App";
import type { TabParamList } from "../navigation/MainTabs";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W, height: H } = Dimensions.get("window");

// assets
const ISLAND = require("../../assets/island/Island.png");
const COIN = require("../../assets/ui/coin.png");
const LIBRARY = require("../../assets/buildings/wellness_library.png");
const LIGHTHOUSE = require("../../assets/buildings/lighthouse.png");
const GYM = require("../../assets/buildings/challenge_gym.png");
const CAFE = require("../../assets/buildings/community_cafe.png");
const DIARY = require("../../assets/buildings/dairy_cabin.png");
const REWARD = require("../../assets/buildings/reward_market.png");
const MEDITATION = require("../../assets/buildings/mediation_store.png");

// ✅ Island is a TAB screen; compose Tab + Stack props:
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Island">,
  NativeStackScreenProps<RootStackParamList>
>;

type BuildingKey =
  | "library"
  | "lighthouse"
  | "gym"
  | "cafe"
  | "diary"
  | "reward"
  | "meditation";

const ISLAND_SHIFT_Y = Math.round(H * 0.045);

type Placement = {
  key: BuildingKey;
  label: string;
  src: any;
  x: number;
  y: number;
  widthDp?: number;
  gapPx?: number;
};

const PLACEMENTS: Placement[] = [
  { key: "library",    label: "Wellness Library",  src: LIBRARY,    x: 0.20, y: 0.165 },
  { key: "lighthouse", label: "Light House",       src: LIGHTHOUSE, x: 0.65, y: 0.150 },
  { key: "gym",        label: "Challenge Gym",     src: GYM,        x: 0.18, y: 0.375 },
  { key: "cafe",       label: "Community Cafe",    src: CAFE,       x: 0.55, y: 0.395 },
  { key: "diary",      label: "Diary Cabin",       src: DIARY,      x: 0.50, y: 0.530 },
  { key: "reward",     label: "Reward Market",     src: REWARD,     x: 0.27, y: 0.675 },
  { key: "meditation", label: "Meditation Store",  src: MEDITATION, x: 0.70, y: 0.800 },
];

const DEV_TAP_COORDS = false;

export default function IslandScreen({ navigation }: Props) {
  const [tokens] = useState(1026);
  const [active, setActive] = useState<BuildingKey | null>(null);
  const insets = useSafeAreaInsets();

  const sheet = useMemo(() => {
    switch (active) {
      case "library":
        return { title: "Wellness Library", desc: "Explore mental health assessments, educational resources, and personalized wellness recommendations.", enter: false };
      case "lighthouse":
        return { title: "Light House", desc: "Crisis info, SOS shortcuts, and calming resources when you need them most.", enter: true };
      case "gym":
        return { title: "Challenge Gym", desc: "Bite-size reset games: 30 minute breathing, grounding, and focus challenges that help you de-stress (and earn coins).", enter: false };
      case "cafe":
        return { title: "Community Cafe", desc: "Find your friends: anonymous Encourage Wall, topic-based peer groups, and friend streaks with safe, moderated spaces.", enter: false };
      case "diary":
        return { title: "Diary Cabin", desc: "Capture your day in seconds: mood emoji, quick note or voice-to-text, and a weekly trend sparkline that turns check-ins into insight.", enter: false };
      case "reward":
        return { title: "Reward Market", desc: "Wellness rewards: trade coins from healthy habits for café vouchers, gym passes, study perks, and fun theme packs.", enter: true };
      case "meditation":
        return { title: "Meditation Store", desc: "Calm zone: guided meditations (5/10/20 min), breath timers, and ambient soundscapes—captioned and accessibility-friendly.", enter: false };
      default:
        return null;
    }
  }, [active]);

  const onEnter = () => {
    // navigate on the parent stack for full-screen flows
    const parent = navigation.getParent?.();
    if (active === "lighthouse") {
      parent ? parent.navigate("Lighthouse") : navigation.navigate("Lighthouse");
    }
    if (active === "reward") {
      parent ? parent.navigate("RewardMarket") : navigation.navigate("RewardMarket");
    }
    setActive(null);
  };

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.fill}>
        <Image
          source={ISLAND}
          style={[styles.bg, { top: ISLAND_SHIFT_Y, height: H + ISLAND_SHIFT_Y }]}
          contentFit="cover"
        />

        <View style={[styles.hud, { top: insets.top + 16 }]}>
          <Image source={COIN} style={styles.coin} contentFit="contain" />
          <Text style={styles.hudText}>{tokens.toLocaleString()}</Text>
        </View>

        {PLACEMENTS.map((p) => (
          <BuildingMarker
            key={p.key}
            source={p.src}
            label={p.label}
            x={p.x}
            y={p.y}
            widthDp={p.widthDp}
            onPress={() => setActive(p.key)}
          />
        ))}

        {sheet && (
          <BuildingSheet
            visible={!!active}
            title={sheet.title}
            description={sheet.desc}
            canEnter={sheet.enter}
            onEnter={onEnter}
            onClose={() => setActive(null)}
          />
        )}

        {DEV_TAP_COORDS && (
          <View
            style={StyleSheet.absoluteFill}
            pointerEvents="box-only"
            onStartShouldSetResponder={() => true}
            onResponderRelease={(e) => {
              const { locationX, locationY } = e.nativeEvent;
              const x = +(locationX / W).toFixed(3);
              const y = +(locationY / H).toFixed(3);
              console.log(`x=${x}, y=${y}`);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#9EC0E1" },
  bg: { position: "absolute", left: 0, width: W },
  hud: { position: "absolute", right: 16, flexDirection: "row", alignItems: "center", gap: 8 },
  coin: { width: 22, height: 22 },
  hudText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: fonts.heading,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
