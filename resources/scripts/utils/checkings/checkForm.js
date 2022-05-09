import toggleClass from "../helpers/toggleClass.js";
import markup from "../../markup/markup.js";

const checkForm = (form, formFields, className, message, data) => {
  //IF THERE IS A WARNING AFTER FETCHING
  if (!data) {
    markup.addMarkup(form.querySelector(className), "invalidMarkupForm", message);
  } else if (!Object.keys(data).length) {
    //IF FORM IS EMPTY
    formFields.forEach((inpt) => toggleClass(false, inpt, ["invalidLabel", "invalidInput"], true));

    //if all inputs are invalid
    if (formFields.every((inpt) => inpt.getAttribute("data-valid") === "isInvalid")) {
      //adding warning below the form
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "Please fill valid credentials"
      );
    }

    //if all inputs are empty
    if (formFields.every((inpt) => !inpt.getAttribute("data-valid"))) {
      //adding warning below the form
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "Please fill all the fields"
      );
    }

    //if all inputs are invalid and empty
    if (
      formFields.every((inpt) => inpt.getAttribute("data-valid") === "isInvalid" && !inpt.value)
    ) {
      //adding warning below the form
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "Please fill all the fields"
      );
    }

    //if some inputs are invalid and some are untouched
    if (
      formFields.some((inpt) => inpt.getAttribute("data-valid") === "isInvalid") &&
      formFields.some((inpt) => !inpt.getAttribute("data-valid"))
    ) {
      //adding warning below the form
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "Please fill all the fields carefully"
      );
      //making inputs turn into red
      formFields.forEach((inpt) => {
        if (!inpt.getAttribute("data-valid")) {
          toggleClass(false, inpt, ["invalidLabel", "invalidInput"], true);
        }
      });
    }

    //if all inputs are valid [by default] [special case for menu form]
    if (formFields.every((inpt) => inpt.getAttribute("data-valid") === "isValid")) {
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "Please fill required fields carefully"
      );

      formFields.forEach((inpt) => {
        if (inpt.name === "menu_name") {
          toggleClass(false, inpt, ["invalidLabel", "invalidInput"], true);
        } else if (inpt.name === "url") {
          toggleClass(true, inpt, ["invalidLabel", "invalidInput"]);
        }
      });
    }

    //if all inputs are valid [by default] and untouched [special case for menu form]
    if (formFields.every((inpt) => inpt.getAttribute("data-valid") === "isValid")) {
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "Please fill required fields carefully"
      );

      formFields.forEach((inpt) => {
        if (inpt.name === "menu_name") {
          toggleClass(false, inpt, ["invalidLabel", "invalidInput"], true);
        } else if (inpt.name === "url") {
          toggleClass(true, inpt, ["invalidLabel", "invalidInput"]);
        }
      });
    }

    //if all inputs are inserted via browser dom
    if (
      formFields.every((inpt) => inpt.getAttribute("data-valid") === "isValid" && inpt.value) ||
      formFields.every(
        (inpt) =>
          inpt.getAttribute("data-valid") === "isValid" &&
          !inpt.value &&
          !(inpt.name === "menu_name" || inpt.name === "url")
      ) ||
      formFields.every((inpt) => !inpt.getAttribute("data-valid") && inpt.value) ||
      (formFields.some((inpt) => inpt.getAttribute("data-valid") === "isValid") &&
        formFields.some((inpt) => inpt.getAttribute("data-valid") === "isInvalid"))
    ) {
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "Please fill required fields carefully"
      );

      //special case check for menu form
      if (form.className === "menu-sidebar-add-wrpr") {
        formFields.forEach((inpt) => {
          if (inpt.name === "menu_name") {
            toggleClass(false, inpt, ["invalidLabel", "invalidInput"], true);
          } else if (inpt.name === "url") {
            toggleClass(true, inpt, ["invalidLabel", "invalidInput"]);
          }
        });
      }
    }
  } else {
    //IF FORM IS FILLED OR SEMI-FILLED
    //if some inputs are valid and some are untouched
    if (
      formFields.some((inpt) => inpt.getAttribute("data-valid") === "isValid") &&
      formFields.some((inpt) => !inpt.getAttribute("data-valid"))
    ) {
      //adding warning below the form
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "Please fill required fields"
      );
      //making inputs turn into red
      formFields.forEach((inpt) => {
        if (!inpt.getAttribute("data-valid")) {
          toggleClass(false, inpt, ["invalidLabel", "invalidInput"], true);
        }
      });
    }

    //if some inputs are valid and some are invalid
    if (
      formFields.some((inpt) => inpt.getAttribute("data-valid") === "isValid") &&
      formFields.some((inpt) => inpt.getAttribute("data-valid") === "isInvalid")
    ) {
      //adding warning below the form
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "All credentials must be valid"
      );
    }

    //if all inputs are invalid [a special check for edit profile form]
    if (formFields.every((inpt) => inpt.getAttribute("data-valid") === "isInvalid")) {
      //adding warning below the form
      markup.addMarkup(
        form.querySelector(className),
        "invalidMarkupForm",
        "Please fill valid credentials"
      );
    }

    //if all imputs are valid
    if (formFields.every((inpt) => inpt.getAttribute("data-valid") === "isValid")) {
      //if all inputs is valid [by default] and some have no value [special case for menu form]
      if (
        formFields.some((inpt) => inpt.name === "menu_name" && !inpt.value) &&
        formFields.some((inpt) => inpt.name === "url" && (inpt.value || !inpt.value))
      ) {
        markup.addMarkup(
          form.querySelector(className),
          "invalidMarkupForm",
          "Please fill required fields"
        );

        formFields.forEach((inpt) => {
          if (inpt.name === "menu_name") {
            toggleClass(false, inpt, ["invalidLabel", "invalidInput"], true);
          } else if (inpt.name === "url") {
            toggleClass(true, inpt, ["invalidLabel", "invalidInput"]);
          }
        });

        return;
      }

      //removing warning if there was one before valid inserts
      if (form.querySelector(".invalidMarkupForm")) {
        form.querySelector(".invalidMarkupForm").innerHTML = "";
      }
      return true;
    }
  }
};

export default checkForm;
