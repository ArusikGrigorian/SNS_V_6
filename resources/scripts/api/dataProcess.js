import { BASE_URL } from "./configs.js";
import request from "./request.js";
import checkData from "../utils/checkings/checkData.js";
import showLoader from "../markup/loader.js";
import processLocalStorage from "../utils/helpers/localStorage.js";

class DataProcess {
  constructor(url) {
    this.url = url;
  }

  //SIGN UP
  registerUser = async (registerData, generalWrapper, form, formFields, className) => {
    //turning on loader
    showLoader("on", generalWrapper);

    //fetching data
    const data = await request(`${this.url}sign-up`, "POST", registerData);

    //checking data
    checkData({
      data,
      generalWrapper,
      form,
      formFields,
      formClassName: className,
      modalClassName: "modalWrapper-content",
      url: "/register",
      methodName: "registerUser",
    });
  };

  //SIGN IN
  signInUser = async (signInData, generalWrapper, form, formFields, className) => {
    //turning on loader
    showLoader("on", generalWrapper);

    //fetching data
    const data = await request(`${this.url}sign-in`, "POST", signInData);

    //checking data
    checkData({
      data,
      generalWrapper,
      form,
      formFields,
      formClassName: className,
      modalClassName: null,
      url: "/profile",
      methodName: "signInUser",
    });
  };

  //FORGOT PASSWORD
  forgotPassword = async (forgotPassData, generalWrapper, form, formFields, className) => {
    //turning on loader
    showLoader("on", generalWrapper);

    //fetching data
    const data = await request(`${this.url}forgot-password`, "POST", forgotPassData);

    //checking data
    checkData({
      data,
      generalWrapper,
      form,
      formFields,
      formClassName: className,
      modalClassName: "modalWrapper-content",
      url: "/sign-in",
      methodName: "forgotPassword",
    });
  };

  //RESET PASSWORD
  resetPassword = async (resetPassData, generalWrapper, form, formFields, className) => {
    //turning on loader
    showLoader("on", generalWrapper);

    //fetching data
    const data = await request(
      `/${this.url}reset-password/${resetPassData.token}`,
      "POST",
      resetPassData
    );

    //checking data
    checkData({
      data,
      generalWrapper,
      form,
      formFields,
      formClassName: className,
      modalClassName: "modalWrapper-content",
      url: "/sign-in",
      methodName: "resetPassword",
    });
  };

  // FOR EDIT PROFILE
  editProflie = async (editProfData, generalWrapper, form, formFields, className) => {
    // turning on loader
    showLoader("on", generalWrapper);
    // fetching data
    const data = await request(`${this.url}profile-edit`, "POST", editProfData);

    // checking data
    checkData({
      data,
      generalWrapper,
      form,
      formFields,
      formClassName: className,
      modalClassName: "modalWrapper-content",
      url: "/profile",
      methodName: "editProflie",
    });
  };

  //SIGN OUT
  signOutUser = async (signOutUserData) => {
    const response = await request(`${this.url}sign-out`, "POST", signOutUserData);

    if (response.success) {
      const removeToken = processLocalStorage("remove", "token");

      if (!removeToken) {
        location.href = "/sign-in";
      }
    }
  };

  //ADD MENU ITEM
  addMenuItem = async (addedItemData, generalWrapper, form, formFields, className) => {
    //turning on loader
    showLoader("on", generalWrapper);

    //fetching data
    const data = await request(`${this.url}add-menu`, "POST", addedItemData);

    //checking data
    checkData({
      data,
      generalWrapper,
      form,
      formFields,
      formClassName: className,
      modalClassName: "modalWrapper-content",
      url: "/show-menu",
      methodName: "addMenuItem",
    });
  };

  //EDIT MENU ITEM
  editMenuItem = async (editedItemData, generalWrapper, form, formFields, className) => {
    //turning on loader
    showLoader("on", generalWrapper);

    //fetching data
    const data = await request(`${this.url}edit-menu`, "POST", editedItemData);

    //checking data
    checkData({
      data,
      generalWrapper,
      form,
      formFields,
      formClassName: className,
      modalClassName: "modalWrapper-content",
      url: "/show-menu",
      methodName: "editMenuItem",
    });
  };

  //DELETE MENU ITEM
  deleteMenuItem = async (deletedItemData, generalWrapper) => {
    //turning on loader
    showLoader("on", generalWrapper);

    //fetching data
    const data = await request(`${this.url}delete-menu`, "POST", deletedItemData);

    //checking data
    checkData({
      data,
      generalWrapper,
      _,
      _,
      _,
      modalClassName: "modalWrapper-content",
      url: "/show-menu",
      methodName: "deleteMenuItem",
    });
  };
}

const dataProcess = new DataProcess(BASE_URL);
export default dataProcess;
