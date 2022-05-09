import { FORGOT_PASS_DOM } from "../configurations/constants.js";
import dataProcess from "../api/dataProcess.js";
import checkInput from "../utils/checkings/checkInputs.js";
import checkForm from "../utils/checkings/checkForm.js";

class ForgotPassword {
  constructor({ $generalWrapper, $form, $email, $sbmt }, forgotPassword) {
    this.generalWrapper = $generalWrapper;
    this.form = $form;
    this.email = $email;
    this.submit = $sbmt;
    this.forgotPassword = forgotPassword;
    this.forgotPassData = {};
    this.form.addEventListener("input", this.onInput);
    this.submit.addEventListener("click", this.onClick);
  }

  onInput = (e) => {
    if (e.target.closest(".frgtPass-inpt-email")) {
      //validating inputs
      const input = e.target;
      const validData = checkInput(input, input.type, input.value);
      validData && (this.forgotPassData = { ...validData });
    }
  };

  onClick = (e) => {
    //validating form
    const formFields = Array.from(this.form.querySelectorAll(".frgtPass-content-form-wrpr-inpt"));
    const valid = checkForm(
      this.form,
      formFields,
      ".frgtPass-content-form-wrpr",
      _,
      this.forgotPassData
    );

    if (valid) {
      setTimeout(() => {
        this.forgotPassword(
          this.forgotPassData,
          this.generalWrapper,
          this.form,
          formFields,
          ".frgtPass-content-form-wrpr"
        );
      }, 500);
    } else {
      return;
    }
  };
}

const forgotPassword = new ForgotPassword(FORGOT_PASS_DOM, dataProcess.forgotPassword);
export default forgotPassword;
