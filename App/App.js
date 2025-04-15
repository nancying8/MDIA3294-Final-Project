// Ensures safe area usage for different devices
import { SafeAreaProvider } from "react-native-safe-area-context";
// Manages navigation in the app
import { NavigationContainer } from "@react-navigation/native";
// Creates a stack-based navigation flow
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Provides a custom theme for UI components
import { ThemeProvider } from '@rneui/themed';
// Custom theme for styling
import AdoptlyTheme from "./theme/AdoptlyTheme.js";
// Main navigation structure
import MainNavigation from "./navigation/MainNavigation";

// Context to manage favorite dogs 
import { AdoptionProvider } from "./components/AdoptionContext.js";


//Screens
import OnBoardingScreen from "./screens/OnBoardingScreen"; 
import LogInScreen from "./screens/LogInScreen";

// Creates the root stack navigator
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider >
      <AdoptionProvider> 
        <NavigationContainer >
          <ThemeProvider theme={AdoptlyTheme}>
            <RootStack.Navigator
            initialRouteName="Onboarding" 
            screenOptions={{ headerShown: false }}
            >
              <RootStack.Screen 
                name="Onboarding" 
                component={OnBoardingScreen} />
              <RootStack.Screen 
                name="LogIn" 
                component={LogInScreen} />
              <RootStack.Screen
                name="MainNavigation" 
                component={MainNavigation} 
                options={{ headerShown: false }}
              />
            </RootStack.Navigator>
          </ThemeProvider>
        </NavigationContainer>
      </AdoptionProvider>
    </SafeAreaProvider>
  );
}

