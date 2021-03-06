import Cookies from "js-cookie";

export const setCookie = (name, value) => {
  return Cookies.set(name, value);
};
export const getCookie = (name) => {
  let cookieVal = Cookies.get(name);
  if (cookieVal !== undefined) {
    return JSON.parse(cookieVal);
  }
  console.log(Cookies.get(name) !== undefined);
};
export const removeCookie = (name) => {
  if (Cookies.get(name) !== undefined) {
    return Cookies.remove(name);
  }
};
