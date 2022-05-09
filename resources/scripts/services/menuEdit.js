import { EDIT_MENU_PAGE } from "../configurations/constants.js";
import dataProcess from "../api/dataProcess.js";
import checkInput from "../utils/checkings/checkInputs.js";
import checkForm from "../utils/checkings/checkForm.js";
import processLocalStorage from "../utils/helpers/localStorage.js";
import signOutUser from "../services/signOut.js";

class Menu {
  constructor(
    { $generalWrapper, $backBtn, $form, $sbmt, $save, $menuItems, $editBtns, $deleteBtns },
    addMenuItem,
    editMenuItem,
    deleteMenuItem
  ) {
    this.generalWrapper = $generalWrapper;
    this.backBtn = $backBtn;
    this.form = $form;
    this.sbmt = $sbmt;
    this.save = $save;
    this.menuItems = Array.from($menuItems);
    this.editBtns = Array.from($editBtns);
    this.deleteBtns = Array.from($deleteBtns);
    this.addedItemData = {};
    this.editedItemData = {};
    this.addMenuItem = addMenuItem;
    this.editMenuItem = editMenuItem;
    this.deleteMenuItem = deleteMenuItem;
    this.backBtn.addEventListener("click", this.onBackClick);
    this.form.addEventListener("input", this.onInput);
    this.sbmt.addEventListener("click", this.onAddClick);
    this.save.addEventListener("click", this.onSaveClick);
    this.menuItems.forEach((item) => {
      item.addEventListener("mouseover", this.onEditAppear);
      item.addEventListener("mouseout", this.onEditDisappear);
    });
    this.editBtns.forEach((editBtn) => editBtn.addEventListener("click", this.onEditClick));
    this.deleteBtns.forEach((deleteBtn) => deleteBtn.addEventListener("click", this.onDeleteClick));
  }

  //BACK BUTTON CLICK HANDLER
  onBackClick = () => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      this.backBtn.classList.add("backActive");
      setTimeout(() => {
        location.href = "/profile";
      }, 500);
    } else {
      signOutUser.onSignOutClick();
    }
  };

  //INPUT VALIDATION HANDLER
  onInput = (e) => {
    const charFormat = /(\b[a-z](?!\s))/g;

    if (e.target.closest(".menu-inpt-nm") || e.target.closest(".menu-inpt-url")) {
      //validating inputs
      const input = e.target;
      const validData = checkInput(input, input.type, input.value);
      validData && (this.addedItemData = { ...validData });
    }

    if (this.addedItemData.hasOwnProperty("menu_name")) {
      this.addedItemData["menu_name"] = this.addedItemData["menu_name"].replace(
        charFormat,
        (char) => char.toUpperCase()
      );
    }
  };

  //ADD BUTTON CLICK HANDLER
  onAddClick = (e) => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      //validating form
      const formFields = Array.from(
        this.form.querySelectorAll(".menu-sidebar-add-wrpr-inpts-inpt")
      );
      const valid = checkForm(
        this.form,
        formFields,
        ".menu-sidebar-add-wrpr-inpts",
        _,
        this.addedItemData
      );

      if (valid) {
        if (!this.addedItemData.hasOwnProperty("url")) {
          this.addedItemData.url = "";
        }

        setTimeout(() => {
          this.addMenuItem(
            this.addedItemData,
            this.generalWrapper,
            this.form,
            formFields,
            ".menu-sidebar-add-wrpr-inpts"
          );
        }, 500);
      } else {
        return;
      }
    } else {
      signOutUser.onSignOutClick();
    }
  };

  //SAVE BUTTON CLICK HANDLER
  onSaveClick = () => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      //validating form
      const formFields = Array.from(
        this.form.querySelectorAll(".menu-sidebar-add-wrpr-inpts-inpt")
      );
      const valid = checkForm(this.form, formFields, ".menu-sidebar-add-wrpr-inpts", _, {
        _key: "value",
      });

      if (valid) {
        if (Object.keys(this.addedItemData).length) {
          if (!this.addedItemData.hasOwnProperty("menu_name")) {
            this.addedItemData["menu_name"] = this.editedItemData["menu_name"];
          }

          if (!this.addedItemData.hasOwnProperty("url")) {
            this.addedItemData.url = this.editedItemData.url;
          }

          this.addedItemData.id = this.editedItemData.id;
          this.editedItemData = { ...this.addedItemData };
        }

        setTimeout(() => {
          this.editMenuItem(
            this.editedItemData,
            this.generalWrapper,
            this.form,
            formFields,
            ".menu-sidebar-add-wrpr-inpts"
          );
        }, 500);

        this.save.style.display = "none";
      } else {
        return;
      }
    } else {
      signOutUser.onSignOutClick();
    }
  };

  //EDIT BUTTON APPEAR AND DISAPPEAR HANDLERS
  onEditAppear = (e) => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      const editBtn = e.currentTarget.querySelector(".menu-content-item-edit");
      editBtn.style.display = "block";
    } else {
      signOutUser.onSignOutClick();
    }
  };

  onEditDisappear = (e) => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      const editBtn = e.currentTarget.querySelector(".menu-content-item-edit");
      editBtn.style.display = "none";
    } else {
      signOutUser.onSignOutClick();
    }
  };

  //EDIT BUTTON CLICK HANDLER
  onEditClick = (e) => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      const charFormat = /(\b[a-z](?!\s))/g;
      this.sbmt.style.display = "none";
      this.save.style.display = "block";
      const dtset = e.currentTarget.dataset;
      this.form.querySelector(".menu-inpt-nm").value = dtset.menu_name;
      this.form.querySelector(".menu-inpt-url").value = dtset.url;

      for (let key in dtset) {
        this.editedItemData[key] = dtset[key];
      }

      this.editedItemData["menu_name"] = this.editedItemData["menu_name"].replace(
        charFormat,
        (char) => char.toUpperCase()
      );
    } else {
      signOutUser.onSignOutClick();
    }
  };

  //DELETE BUTTON CLICK HANDLER
  onDeleteClick = (e) => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      this.deleteMenuItem({ id: e.currentTarget.dataset.id }, this.generalWrapper);
    } else {
      signOutUser.onSignOutClick();
    }
  };
}

const menu = new Menu(
  EDIT_MENU_PAGE,
  dataProcess.addMenuItem,
  dataProcess.editMenuItem,
  dataProcess.deleteMenuItem
);
export default menu;
