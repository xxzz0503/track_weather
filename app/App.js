import React from "react";
import { setNavigator } from "./_navigationRef";
import { Easing, Animated } from "react-native";
import { MaterialCommunityIcons, Feather, Entypo } from "@expo/vector-icons";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import TrackListScreen from "./screens/TrackListScreen";
import TrackDetailScreen from "./screens/TrackDetailScreen";
import TrackCreateScreen from "./screens/TrackCreateScreen";
import AccountScreen from "./screens/AccountScreen";
import ResolveAuthScreen from "./screens/ResolveAuthScreen";

import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as LocationProvider } from "./context/LocationContext";

let SlideFromRight = (index, position, width) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [width, 0],
  });

  return { transform: [{ translateX }] };
};

let SlideFromBottom = ({
  current,
  index,
  next,
  inverted,
  layouts: { screen },
}) => {
  const scale = Animated.add(
    current.progress.interpolate({
      inputRange: [index - 1, index],
      outputRange: [1, 0.5],
    }),
    next
      ? next.progress.interpolate({
          inputRange: [index - 1, index],
          outputRange: [1, 0.5],
        })
      : 0
  );

  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [index - 1, index],
      outputRange: [screen.height, 0],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [index - 1, index],
          outputRange: [screen.height, 0],
          extrapolate: "clamp",
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateY: progress,
        },
        {
          scale: scale,
        },
      ],
    },
  };
};

let CollapseTransition = ({ index, current, next }) => {
  const opacity = current.progress.interpolate({
    // index - 1 === newScreen
    // index === currentScreen
    // index + 1 === previousScreen
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1],
  });

  const scale = Animated.add(
    current.progress.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.5, 1, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.5, 0.5, 0.5],
          extrapolate: "clamp",
        })
      : 0
  );

  return {
    cardStyle: {
      opacity,
      transform: [
        {
          scale: scale,
        },
      ],
    },
  };
};

const config = {
  animation: "timing",
  config: {
    duration: 1000,
    easing: Easing.ease,
  },
};

const MyTransition = {
  gestureDirection: "vertical",
  transitionSpec: {
    open: config,
    close: config,
  },
  // cardStyleInterpolator: CollapseTransition,
};

// main flow manage 2 flow with switch navigator: authFlow & contentFlow
// ResolveAuthScreen handle auto login action
// if token is already available in AsyncStorage
const auth_contentFlow = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    authFlow: createStackNavigator(
      {
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
      },
      {
        defaultNavigationOptions: {
          gestureEnabled: true,
          ...MyTransition,
        },
      }
    ),
    contentFlow: createBottomTabNavigator(
      {
        list_detailFlow: createStackNavigator(
          {
            TrackList: TrackListScreen,
            TrackDetail: TrackDetailScreen,
          },
          {
            navigationOptions: ({ navigation }) => ({
              tabBarLabel: () => {
                return null;
              },
              tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state.routes[0];
                let icon;
                if (routeName === "TrackList") {
                  icon = <Entypo name="list" size={30} color={tintColor} />;
                } else if (routeName === "TrackDetail") {
                  icon = <Feather name="info" size={30} color={tintColor} />;
                }
                return icon;
              },
            }),
          }
        ),
        CreateTrack: TrackCreateScreen,
        Account: AccountScreen,
      },
      {
        tabBarOptions: {
          activeTintColor: "#2d6187",
        },
      }
    ),
  },
  {
    initialRouteName: "ResolveAuth",
    headerMode: "none",
  }
);

const App = createAppContainer(auth_contentFlow);

export default () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <App ref={(navigator) => setNavigator(navigator)} />
      </AuthProvider>
    </LocationProvider>
  );
};
