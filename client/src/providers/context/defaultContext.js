import { getFromStorage } from "../../utils/sessionStorage";
import { LOCALES } from './../i18n/constants';

export const defaultContext = {
  locale: getFromStorage("locale") || LOCALES.UKRAINIAN,
  saveLists:null,
  user: {
    username: getFromStorage("username") || null,
    email: getFromStorage("email") || null,
    token: getFromStorage("token") || null,
    savedLists:null
  },
};