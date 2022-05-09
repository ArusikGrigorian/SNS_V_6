import dataProcess from "../api/dataProcess.js";
import processLocalStorage from "../utils/helpers/localStorage.js";

class SignOut {
  constructor(signOutUser) {
    this.signOutUser = signOutUser;
    this.signOutUserData = {};
  }

  onSignOutClick = () => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      this.signOutUserData.token = getToken;
      this.signOutUser(this.signOutUserData);
    } else {
      this.signOutUserData.token = null;
      this.signOutUser(this.signOutUserData);
    }
  };
}

let signOutUser = new SignOut(dataProcess.signOutUser);
export default signOutUser;
