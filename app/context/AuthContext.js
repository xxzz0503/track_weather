import ContextFactory from "./ContextFactory";
import trackerApi from "../api/Tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../_navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "auth_action":
      return { errorMessage: "", token: action.payload };
    case "error":
      return { ...state, errorMessage: action.payload };
    case "clear_error":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const autoLoginIfExistedToken = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({
      type: "auth_action",
      payload: token,
    });
    navigate("TrackList");
  } else {
    navigate("SignIn");
  }
};

const doSignIn = (dispatch) => async (email, password) => {
  try {
    const response = await trackerApi.post("/SignIn", {
      email: email,
      password: password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "auth_action",
      payload: response.data.token,
    });
    navigate("TrackList");
  } catch (e) {
    dispatch({
      type: "error",
      payload: "Invalid Email!!",
    });
  }
};

const doSignUp = (dispatch) => async (email, password) => {
  try {
    const response = await trackerApi.post("/SignUp", {
      email: email,
      password: password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "auth_action",
      payload: response.data.token,
    });
    navigate("TrackList");
  } catch (e) {
    dispatch({
      type: "error",
      payload: "Duplicated",
    });
  }
};

const doSignOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({
    type: "auth_action",
    payload: "",
  });
  navigate("SignIn");
};

const clearErrorMsg = (dispatch) => () => {
  dispatch({
    type: "clear_error",
  });
};

export const { Context, Provider } = ContextFactory(
  authReducer,
  {
    doSignIn,
    doSignUp,
    doSignOut,
    clearErrorMsg,
    autoLoginIfExistedToken,
  },
  { token: null, errorMessage: "" }
);
