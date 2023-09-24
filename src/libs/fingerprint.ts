import { v4 as uuidV4 } from "uuid";
const IDENTIFIER_KEY = "fp";
export const identifyBrowser = () => {
  const local_identifier = localStorage.getItem(IDENTIFIER_KEY);
  if (!local_identifier) {
    const browser_id = uuidV4();
    localStorage.setItem(IDENTIFIER_KEY, browser_id);
    return browser_id;
  }

  return local_identifier;
};

export const getBrowserIdentification = () => {
  if (typeof window != undefined) {
    const identifier = localStorage.getItem(IDENTIFIER_KEY);
    if (!identifier) return "";
    return identifier;
  }
  return "";
};
