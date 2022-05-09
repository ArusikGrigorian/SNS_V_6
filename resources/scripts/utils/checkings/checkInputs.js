import toggleClass from "../helpers/toggleClass.js";
import markup from "../../markup/markup.js";
const data = {};

const checkInput = (input, type, value) => {
  const textFormat = /^[a-zA-Z ]{3,191}$/;
  const menuItemFormat = /^[a-zA-Z .-]{3,191}$/;
  const urlFormat = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
  const mailFormat = /^[^@]+@[^@]{2,}\.[^@]{2,5}$/;
  const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*,./;])[a-zA-Z0-9!@#$%^&*,./;]{6,191}$/;
  const numberFormat = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  const inputName = input.name.split("_").join(" ");

  if (
    (type === "text" &&
      (input.name === "name" || input.name === "last_name") &&
      !textFormat.test(value)) ||
    (type === "text" && input.name == "menu_name" && !menuItemFormat.test(value)) ||
    (type === "text" && input.name == "url" && value && !urlFormat.test(value)) ||
    (type === "email" && !mailFormat.test(value)) ||
    (type === "password" && !passwordFormat.test(value)) ||
    (type === "text" && input.name === "phone_number" && value && !numberFormat.test(value))
  ) {
    if (value.length > 191) {
      toggleClass(false, input, ["invalidLabel", "invalidInput"]);
      markup.addMarkup(input, "invalidMarkup", `Entered ${inputName} is too long`);
    } else {
      toggleClass(false, input, ["invalidLabel", "invalidInput"]);
      markup.addMarkup(input, "invalidMarkup");
    }

    if (data.hasOwnProperty([input.name])) {
      delete data[input.name];
    }
  } else if (value.length > 191) {
    toggleClass(false, input, ["invalidLabel", "invalidInput"]);
    markup.addMarkup(input, "invalidMarkup", `Entered ${inputName} is too long`);

    if (data.hasOwnProperty([input.name])) {
      delete data[input.name];
    }
  } else {
    toggleClass(true, input, ["invalidLabel", "invalidInput"]);
    data[input.name] = value;

    if (input.parentElement.querySelector(".invalidMarkup")) {
      input.parentElement.querySelector(".invalidMarkup").style.display = "none";
    }
  }
  return data;
};

export default checkInput;
