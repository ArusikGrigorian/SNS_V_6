import { SIGN_IN_DOM } from "../configurations/constants.js";
import dataProcess from "../api/dataProcess.js";
import checkInput from "../utils/checkings/checkInputs.js";
import checkForm from "../utils/checkings/checkForm.js";

class SignIn {
  constructor({ $generalWrapper, $form, $email, $password, $sbmt }, signInUser) {
    this.generalWrapper = $generalWrapper;
    this.form = $form;
    this.email = $email;
    this.password = $password;
    this.submit = $sbmt;
    this.signInUser = signInUser;
    this.signInData = {};
    this.form.addEventListener("input", this.onInput);
    this.submit.addEventListener("click", this.onClick);
  }

  onInput = (e) => {
    if (e.target.closest(".signIn-inpt-email") || e.target.closest(".signIn-inpt-pass")) {
      //validating inputs
      const input = e.target;
      const validData = checkInput(input, input.type, input.value);
      validData && (this.signInData = { ...validData });
    }
  };

  onClick = (e) => {
    //validating form
    const formFields = Array.from(this.form.querySelectorAll(".signIn-content-form-wrpr-inpt"));
    const valid = checkForm(this.form, formFields, ".signIn-content-form-wrpr", _, this.signInData);

    if (valid) {
      setTimeout(() => {
        this.signInUser(
          this.signInData,
          this.generalWrapper,
          this.form,
          formFields,
          ".signIn-content-form-wrpr"
        );
      }, 500);
    } else {
      return;
    }
  };
}

const signIn = new SignIn(SIGN_IN_DOM, dataProcess.signInUser);
export default signIn;
