import showLoader from "../../markup/loader.js";
import showModal from "../../markup/modal.js";
import badRequest from "../../markup/error.js";
import checkForm from "../checkings/checkForm.js";
import cutToken from "../helpers/cuttingToken.js";
import processLocalStorage from "../helpers/localStorage.js";

const checkData = ({
  data,
  generalWrapper,
  form,
  formFields,
  formClassName,
  modalClassName,
  url,
  methodName,
}) => {
  if (!data) {
    //IF THE CATCH BLOCK CATCHES ERRORS AFTER FETCH OR JSON IN REQUEST METHOD
    badRequest(generalWrapper);
  } else {
    //IF THERE IS A JSON WITH STATUS AND MESSAGE OR ERROR
    showLoader("off");
    //if json is with false status and error
    if (!data.success) {
      generalWrapper.style.display = "flex";
      checkForm(form, formFields, formClassName, data.error || data.message);
    } else {
      //if json is with true status and message
      if (methodName === "signInUser") {
        const token = cutToken(data.token);
        processLocalStorage("set", "token", token);
        location.href = url;
      } else {
        showModal(generalWrapper, data.message, url, modalClassName);
      }
    }
  }
};

export default checkData;
