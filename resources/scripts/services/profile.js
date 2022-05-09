import { PROFILE_DOM, COMMON_DOM } from "../configurations/constants.js";
import processLocalStorage from "../utils/helpers/localStorage.js";
import signOutUser from "../services/signOut.js";

class Profile {
  constructor({ $editBtn }, { $signOutBtn }) {
    this.editBtn = $editBtn;
    this.signOutBtn = $signOutBtn;
    this.editBtn.addEventListener("click", this.onClickEdit);
    this.signOutBtn.addEventListener("click", signOutUser.onSignOutClick);
  }

  onClickEdit = () => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      location.href = "/profile-edit";
    } else {
      signOutUser.onSignOutClick();
    }
  };
}

const profile = new Profile(PROFILE_DOM, COMMON_DOM);
export default profile;
