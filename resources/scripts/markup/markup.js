class Markup {
  static message = {
    password_confirmation:
      "Password must contain at least 6 characters including numbers and symbols",
    password: "Password must contain at least 6 characters including numbers and symbols",
    email: "Please enter a valid email address",
    name: "Please enter a valid name",
    last_name: "Please enter a valid last name",
    phone_number: "Please enter a valid phone number",
    menu_name: "Please enter a valid menu item name",
    url: "Please enter a valid url",
  };

  addMarkup = (input, className, sentMessage) => {
    const parent = input.parentElement;
    const child = document.createElement("div");
    child.className = className;
    sentMessage ? (child.innerHTML = sentMessage) : (child.innerHTML = Markup.message[input.name]);

    if (
      parent.children.length > 2 &&
      parent.className !== "signUp-content-form-inpt-wrpr" &&
      parent.className !== "editProfile-bio-wrpr"
    ) {
      parent.removeChild(parent.lastElementChild);
      parent.append(child);
    }

    if (parent.children.length > 5 && parent.className === "signUp-content-form-inpt-wrpr") {
      parent.removeChild(parent.lastElementChild);
      parent.append(child);
    }

    if (parent.children.length > 1 && parent.className === "frgtPass-content-form-inpt-wrpr") {
      parent.removeChild(parent.lastElementChild);
      parent.append(child);
    }
    if (parent.children.length > 4 && parent.className === "editProfile-bio-wrpr") {
      parent.removeChild(parent.lastElementChild);
      parent.append(child);
    }
    parent.append(child);
  };
}

const markup = new Markup();
export default markup;
