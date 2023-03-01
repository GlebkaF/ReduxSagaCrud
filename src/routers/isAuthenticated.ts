import Cookies from "js-cookie";

const isAuthenticated = () => {
  const refreshToken: any = Cookies.get("refreshToken");

  try {
    if (refreshToken) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export default isAuthenticated;
