import ContextFactory from "./ContextFactory";
import Weather from "../api/Weather";

const LocationReducer = (state, action) => {
  switch (action.type) {
    case "change_name":
      return { ...state, name: action.payload };
    case "add_location":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const addLocation = (dispatch) => () => {};

const startSearch = (dispatch) => async (name) => {
  const response = await Weather.get("", {
    params: {
      q: name,
    },
  });
  console.log();
  dispatch({
    type: "add_location",
    payload: response.data,
  });
};

const changeName = (dispatch) => (name) => {
  dispatch({
    type: "change_name",
    payload: name,
  });
};

export const { Context, Provider } = ContextFactory(
  LocationReducer,
  { addLocation, changeName, startSearch },
  { data: null, name: "" }
);
