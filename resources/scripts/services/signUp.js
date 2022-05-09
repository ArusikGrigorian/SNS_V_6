import { SIGN_UP_DOM } from "../configurations/constants.js";
import dataProcess from "../api/dataProcess.js";
import checkInput from "../utils/checkings/checkInputs.js";
import checkForm from "../utils/checkings/checkForm.js";
import comparePasswords from "../utils/checkings/comparePasswords.js";

class SignUp {
  constructor(
    { $generalWrapper, $form, $name, $surname, $email, $password, $cnfrm_password, $sbmt },
    registerUser
  ) {
    this.generalWrapper = $generalWrapper;
    this.form = $form;
    this.name = $name;
    this.surname = $surname;
    this.email = $email;
    this.password = $password;
    this.cnfrm_password = $cnfrm_password;
    this.submit = $sbmt;
    this.registerUser = registerUser;
    this.signUpData = {};
    this.form.addEventListener("input", this.onInput);
    this.submit.addEventListener("click", this.onClick);
  }

  onInput = (e) => {
    if (
      e.target.closest(".signUp-inpt-name") ||
      e.target.closest(".signUp-inpt-lname") ||
      e.target.closest(".signUp-inpt-email") ||
      e.target.closest(".signUp-inpt-pass") ||
      e.target.closest(".signUp-inpt-cpass")
    ) {
      //validating inputs
      const input = e.target;
      const validData = checkInput(input, input.type, input.value);
      validData && (this.signUpData = { ...validData });
    }

    //comparing passwords
    if (
      (!this.signUpData.hasOwnProperty("password") &&
        this.form.querySelector(".p-wrpr .invalidMarkup") &&
        this.signUpData.hasOwnProperty("password_confirmation")) ||
      (this.signUpData.hasOwnProperty("password") &&
        this.signUpData.hasOwnProperty("password_confirmation"))
    ) {
      comparePasswords(
        this.signUpData.password,
        this.signUpData.password_confirmation,
        this.form,
        this.cnfrm_password
      );
    }
  };

  onClick = (e) => {
    //validating form
    const formFields = Array.from(this.form.querySelectorAll(".signUp-content-form-wrpr-inpt"));
    const valid = checkForm(this.form, formFields, ".signUp-content-form-wrpr", _, this.signUpData);

    if (valid) {
      setTimeout(() => {
        this.registerUser(
          this.signUpData,
          this.generalWrapper,
          this.form,
          formFields,
          ".signUp-content-form-wrpr"
        );
      }, 500);
    } else {
      return;
    }
  };
}

const signUp = new SignUp(SIGN_UP_DOM, dataProcess.registerUser);
export default signUp;
