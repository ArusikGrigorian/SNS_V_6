import { RESET_PASS_DOM } from "../configurations/constants.js";
import dataProcess from "../api/dataProcess.js";
import checkInput from "../utils/checkings/checkInputs.js";
import checkForm from "../utils/checkings/checkForm.js";
import comparePasswords from "../utils/checkings/comparePasswords.js";

class ResetPassword {
  constructor({ $generalWrapper, $form, $password, $cnfrm_password, $sbmt }, resetPassword) {
    this.generalWrapper = $generalWrapper;
    this.form = $form;
    this.password = $password;
    this.cnfrm_password = $cnfrm_password;
    this.submit = $sbmt;
    this.resetPassword = resetPassword;
    this.resetPassData = {};
    this.form.addEventListener("input", this.onInput);
    this.submit.addEventListener("click", this.onClick);
  }

  onInput = (e) => {
    if (e.target.closest(".crtPass-inpt-npass") || e.target.closest(".crtPass-inpt-cnpass")) {
      //validating inputs;
      const input = e.target;
      const validData = checkInput(input, input.type, input.value);
      validData && (this.resetPassData = { ...validData });
    }

    //comparing passwords
    if (
      (!this.resetPassData.hasOwnProperty("password") &&
        this.form.querySelector(".np-wrpr .invalidMarkup") &&
        this.resetPassData.hasOwnProperty("password_confirmation")) ||
      (this.resetPassData.hasOwnProperty("password") &&
        this.resetPassData.hasOwnProperty("password_confirmation"))
    ) {
      comparePasswords(
        this.resetPassData.password,
        this.resetPassData.password_confirmation,
        this.form,
        this.cnfrm_password
      );
    }
  };

  onClick = (e) => {
    //validating form
    const formFields = Array.from(this.form.querySelectorAll(".crtPass-content-form-wrpr-inpt"));
    const valid = checkForm(
      this.form,
      formFields,
      ".crtPass-content-form-wrpr",
      _,
      this.resetPassData
    );

    if (valid) {
      const resetToken = this.form.querySelector(".reset-token").value;
      this.resetPassData.token = resetToken;

      setTimeout(() => {
        this.resetPassword(
          this.resetPassData,
          this.generalWrapper,
          this.form,
          formFields,
          ".crtPass-content-form-wrpr"
        );
      }, 500);
    } else {
      return;
    }
  };
}

const resetPassword = new ResetPassword(RESET_PASS_DOM, dataProcess.resetPassword);
export default resetPassword;
