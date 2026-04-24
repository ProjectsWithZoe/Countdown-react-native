import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CountdownDisplay } from "./components/CountdownDisplay";
import { useCountdown } from "./utils/useCountdown";

const pad = (n: number) => String(n).padStart(2, "0");

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function Index() {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [pickerDate, setPickerDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const { timeLeft, isExpired } = useCountdown(targetDate);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("countdownData");
        if (saved) {
          const { date, title: t } = JSON.parse(saved);
          setTargetDate(new Date(date));
          setTitle(t ?? "");
          setShowInput(false);
        }
      } catch {}
    })();
  }, []);

  const handleDateChange = (_: any, selected?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (!selected) return;
    const next = new Date(pickerDate);
    next.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
    setPickerDate(next);
  };

  const handleTimeChange = (_: any, selected?: Date) => {
    if (Platform.OS === "android") setShowTimePicker(false);
    if (!selected) return;
    const next = new Date(pickerDate);
    next.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
    setPickerDate(next);
  };

  const startCountdown = async () => {
    setTargetDate(pickerDate);
    setShowInput(false);
    try {
      await AsyncStorage.setItem(
        "countdownData",
        JSON.stringify({ date: pickerDate.toISOString(), title })
      );
    } catch {}
  };

  const resetCountdown = async () => {
    setTargetDate(null);
    setTitle("");
    setPickerDate(new Date());
    setShowInput(true);
    try {
      await AsyncStorage.removeItem("countdownData");
    } catch {}
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {showInput ? (
          <View style={styles.form}>
            <Text style={styles.sectionLabel}>What are you counting down to?</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="e.g. Summer vacation"
              placeholderTextColor="#2E2E2E"
              value={title}
              onChangeText={setTitle}
              returnKeyType="done"
              selectionColor="#555"
            />

            <View style={styles.divider} />

            {/* Date row */}
            <Pressable
              style={styles.pickerRow}
              onPress={() => {
                setShowTimePicker(false);
                setShowDatePicker((v) => !v);
              }}
            >
              <Text style={styles.pickerRowLabel}>Date</Text>
              <Text style={styles.pickerRowValue}>{formatDate(pickerDate)}</Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={pickerDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                themeVariant="dark"
                minimumDate={new Date()}
                onChange={handleDateChange}
                style={styles.picker}
              />
            )}

            {/* Time row */}
            <Pressable
              style={styles.pickerRow}
              onPress={() => {
                setShowDatePicker(false);
                setShowTimePicker((v) => !v);
              }}
            >
              <Text style={styles.pickerRowLabel}>Time</Text>
              <Text style={styles.pickerRowValue}>{formatTime(pickerDate)}</Text>
            </Pressable>

            {showTimePicker && (
              <DateTimePicker
                value={pickerDate}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                themeVariant="dark"
                onChange={handleTimeChange}
                style={styles.picker}
              />
            )}

            <View style={styles.divider} />

            <Pressable
              style={({ pressed }) => [
                styles.startButton,
                pressed && styles.startButtonPressed,
              ]}
              onPress={startCountdown}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.countdownContainer}>
            <CountdownDisplay
              title={title}
              timeLeft={timeLeft}
              isExpired={isExpired}
              onReset={resetCountdown}
            />
            {!isExpired && (
              <Pressable onPress={resetCountdown} style={styles.resetButton}>
                <Text style={styles.resetText}>reset</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  form: {
    gap: 0,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#333",
    fontWeight: "500",
    marginBottom: 14,
  },
  titleInput: {
    fontSize: 26,
    fontWeight: "300",
    color: "#F5F5F5",
    letterSpacing: -0.5,
    paddingVertical: 4,
    marginBottom: 32,
  },
  divider: {
    height: 1,
    backgroundColor: "#161616",
    marginVertical: 4,
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
  },
  pickerRowLabel: {
    fontSize: 13,
    color: "#444",
    letterSpacing: 0.3,
  },
  pickerRowValue: {
    fontSize: 13,
    color: "#888",
    letterSpacing: 0.3,
  },
  picker: {
    marginBottom: 8,
  },
  startButton: {
    marginTop: 28,
    paddingVertical: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 100,
    alignItems: "center",
  },
  startButtonPressed: {
    backgroundColor: "#CCC",
  },
  startButtonText: {
    color: "#0A0A0A",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  countdownContainer: {
    alignItems: "center",
    gap: 48,
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  resetText: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#333",
  },
});
