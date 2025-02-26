export const isLoggedIn = () => {
    return localStorage.getItem("loggedInUser") !== null;
  };
  
  export const logout = () => {
    localStorage.removeItem("loggedInUser");
  };
  