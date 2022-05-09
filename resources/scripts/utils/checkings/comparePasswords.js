import toggleClass from "../helpers/toggleClass.js";
import markup from "../../markup/markup.js";

const comparePasswords = (password, confirmedPassword, form, cnfrmPassInpt) => {
  if (!password && confirmedPassword) {
    form.querySelector(".cp-wrpr .invalidMarkup").style.display = "none";
  }

  if (password && confirmedPassword) {
    const matching = password.localeCompare(confirmedPassword);

    if (password.length !== confirmedPassword.length || matching > 0 || matching < 0) {
      markup.addMarkup(cnfrmPassInpt, "invalidMarkup", "Passwords do not match!");
      toggleClass(false, cnfrmPassInpt, ["invalidLabel", "invalidInput"]);
    } else {
      toggleClass(true, cnfrmPassInpt, ["invalidLabel", "invalidInput"]);
      form.querySelector(".cp-wrpr .invalidMarkup").style.display = "none";
    }
  }
};

export default comparePasswords;
