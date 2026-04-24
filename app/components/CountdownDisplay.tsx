import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TimeLeft } from "../utils/useCountdown";

interface CountdownDisplayProps {
  title: string;
  timeLeft: TimeLeft | null;
  isExpired: boolean;
  onReset: () => void;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  title,
  timeLeft,
  isExpired,
  onReset,
}) => {
  if (!timeLeft) {
    return (
      <View style={styles.center}>
        <Text style={styles.dimText}>Loading...</Text>
      </View>
    );
  }

  if (isExpired) {
    return (
      <View style={styles.center}>
        {!!title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.expiredText}>Time's up.</Text>
        <Pressable style={styles.button} onPress={onReset}>
          <Text style={styles.buttonText}>Start over</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      <Text style={styles.label}>counting down</Text>
      <View style={styles.timerRow}>
        <TimeUnit value={timeLeft.days} unit="d" />
        <Text style={styles.sep}>:</Text>
        <TimeUnit value={timeLeft.hours} unit="h" />
        <Text style={styles.sep}>:</Text>
        <TimeUnit value={timeLeft.minutes} unit="m" />
        <Text style={styles.sep}>:</Text>
        <TimeUnit value={timeLeft.seconds} unit="s" />
      </View>
    </View>
  );
};

const TimeUnit: React.FC<{ value: number; unit: string }> = ({
  value,
  unit,
}) => (
  <View style={styles.unitWrap}>
    <Text style={styles.number}>{String(value).padStart(0, "0")}</Text>
    <Text style={styles.unitLabel}>{unit}</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "300",
    color: "#F5F5F5",
    letterSpacing: 0.5,
    textAlign: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#333",
    fontWeight: "500",
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: -10,
  },
  unitWrap: {
    alignItems: "center",
    width: 90,
  },
  number: {
    fontSize: 40,
    fontWeight: "200",
    color: "#F5F5F5",
    letterSpacing: 0,
    lineHeight: 48,
  },
  unitLabel: {
    fontSize: 12,
    color: "#444",
    letterSpacing: 0,
    textTransform: "uppercase",
    marginTop: 4,
  },
  sep: {
    fontSize: 0,
    fontWeight: "200",
    color: "#2A2A2A",
    lineHeight: 48,
  },
  expiredText: {
    fontSize: 28,
    fontWeight: "300",
    color: "#F5F5F5",
    letterSpacing: -0.5,
  },
  dimText: {
    fontSize: 14,
    color: "#444",
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 100,
  },
  buttonText: {
    color: "#888",
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
