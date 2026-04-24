# Countdown

A minimal React Native app for counting down to a single event.

## Features

- Set a custom title and target date/time
- Live D : H : M : S countdown, updating every second
- Persists across app restarts via AsyncStorage
- Dark UI

## Stack

- [Expo](https://expo.dev) (React Native)
- `date-fns` for time math
- `@react-native-async-storage/async-storage` for persistence
- `@react-native-community/datetimepicker` for date/time input

## Getting Started

```bash
npm install
npx expo start
```

Then open in Expo Go or an iOS/Android simulator.

## Project Structure

```
app/
  index.tsx                  # Main screen — setup form + countdown view
  components/
    CountdownDisplay.tsx     # D:H:M:S display component
  utils/
    useCountdown.ts          # Hook that drives the countdown logic
```
