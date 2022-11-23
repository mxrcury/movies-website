import { createContext, useReducer } from "react";
import {defaultContext} from "./defaultContext";
import { ACTIONS } from "./constants";

export const Context = createContext(defaultContext);

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LANGUAGE:
      return { ...state, locale: action.locale };
    case ACTIONS.SET_USER:
      return { ...state, user:{...action.payload} };
    case ACTIONS.REMOVE_USER:
      return { ...state, user:{ username: null, email: null, token: null }};
    case ACTIONS.SET_SAVED_LISTS:
      return {...state,user:{...state.user,savedLists:action.savedLists}}
    case ACTIONS.SET_SETTINGS:
      return {...state,locale:action.locale,saveLists:action.saveLists}
    case ACTIONS.SET_SAVE_LIST:
      return {...state,saveLists:action.saveLists}
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultContext);
  const value = { state, dispatch };

  window.state = state

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

