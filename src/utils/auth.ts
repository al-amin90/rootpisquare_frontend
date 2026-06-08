import Cookies from "js-cookie";

// Set token in cookies
export const setToken = (token: string, expiryDays = 7) => {
  Cookies.set("accessToken", token, { expires: expiryDays });
};

// Get token from cookies
export const getToken = () => {
  return Cookies.get("accessToken");
};

export const removeToken = () => {
  return Cookies.remove("accessToken");
};
