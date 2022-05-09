import { COMMON_DOM } from "../configurations/constants.js";
import processLocalStorage from "../utils/helpers/localStorage.js";
import signOutUser from "../services/signOut.js";
import checkMenuLength from "../utils/checkings/checkMenuLength.js";

class Header {
  constructor({
    $headerMenuList,
    $headerBurgerMenu,
    $headerEdit,
    $headerBurgerMenuExtended,
    $headerNavWrapper,
  }) {
    this.headerMenuList = $headerMenuList;
    this.headerBurgerMenu = $headerBurgerMenu;
    this.editBtn = $headerEdit;
    this.headerBurgerMenuExtended = $headerBurgerMenuExtended;
    this.headerNavWrapper = $headerNavWrapper;
    this.headerMenuList.addEventListener("click", this.toggleOption);
    this.headerBurgerMenu.addEventListener("click", this.toggleMenu);
    this.editBtn.addEventListener("click", this.onClick);
    this.headerBurgerMenuExtended.addEventListener("click", this.toggleExtendedMenu);
    document.addEventListener("DOMContentLoaded", this.checkMenuListLength);
  }

  //CHECK MENU LIST ITEMS NUMBER
  checkMenuListLength = () => {
    checkMenuLength(this.headerNavWrapper, this.headerMenuList, this.headerBurgerMenuExtended);
  };

  //SELECT MENU TOGGLE
  toggleOption = (e) => {
    const getToken = processLocalStorage("get", "token");
    const openedOptions = Array.from(this.headerMenuList.querySelectorAll(".opened"));

    if (getToken) {
      openedOptions.forEach((option) => {
        if (option.getAttribute("data-open") === "isOpen") {
          option.classList.remove("opened");
          delete option.dataset.open;
        }
      });

      if (e.target.closest(".fa-angle-down")) {
        const optionsList = e.target.parentElement.lastElementChild;

        if (optionsList) {
          if (optionsList.classList.contains("closed")) {
            optionsList.classList.toggle("opened");
            optionsList.dataset.open = "isOpen";
          }
        }
      }
    } else {
      signOutUser.onSignOutClick();
    }
  };

  //MAIN MENU TOGGLE
  toggleMenu = (e) => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      //toggling menu
      this.headerMenuList.classList.toggle("show");
    } else {
      signOutUser.onSignOutClick();
    }
  };

  toggleExtendedMenu = (e) => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      //toggling menu
      this.headerMenuList.classList.toggle("showExtended");
    } else {
      signOutUser.onSignOutClick();
    }
  };

  //EDIT BUTTON EVENT HANDLER
  onClick = () => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      location.href = "/show-menu";
    } else {
      signOutUser.onSignOutClick();
    }
  };
}

const header = new Header(COMMON_DOM);
