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

## Screenshots

<p float="left">
  <img src="assets/images/Simulator Screenshot - iPhone 17 - 2026-04-24 at 17.56.01.png" width="22%" />
  <img src="assets/images/Simulator Screenshot - iPhone 17 - 2026-04-24 at 17.56.16.png" width="22%" />
  <img src="assets/images/Simulator Screenshot - iPhone 17 - 2026-04-24 at 17.56.39.png" width="22%" />
  <img src="assets/images/Simulator Screenshot - iPhone 17 - 2026-04-24 at 18.15.55.png" width="22%" />
</p>

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
