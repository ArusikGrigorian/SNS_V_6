import { EDIT_PROFILE_DOM, COMMON_DOM } from "../configurations/constants.js";
import dataProcess from "../api/dataProcess.js";
import upload, { avatarBlob } from "../utils/helpers/uploadImg.js";
import signOutUser from "./signOut.js";
import processLocalStorage from "../utils/helpers/localStorage.js";
import checkInput from "../utils/checkings/checkInputs.js";
import checkForm from "../utils/checkings/checkForm.js";

class ProfileEdit {
  constructor(
    {
      $generalWrapper,
      $imgUpload,
      $name,
      $surname,
      $phone,
      $email,
      $sbmt_cancel,
      $sbmt_save,
      $form,
      $modal,
      $modalCloseBtn,
      $editProfAvatar,
    },
    { $signOutBtn },
    editProflie
  ) {
    this.generalWrapper = $generalWrapper;
    this.imgUpload = $imgUpload;
    this.name = $name;
    this.surname = $surname;
    this.phone = $phone;
    this.email = $email;
    this.submitCancel = $sbmt_cancel;
    this.submitSave = $sbmt_save;
    this.editProfAvatar = $editProfAvatar;
    this.form = $form;
    this.modal = $modal;
    this.modalCloseBtn = $modalCloseBtn;
    this.signOutBtn = $signOutBtn;
    this.editProflie = editProflie;
    this.editProfData = {};
    this.imgUpload.addEventListener("click", this.uploadImg);
    this.signOutBtn.addEventListener("click", signOutUser.onSignOutClick);
    this.submitSave.addEventListener("click", this.onClickSave);
    this.submitCancel.addEventListener("click", this.onClickCancel);
    this.form.addEventListener("input", this.onInputEdit);
  }

  onInputEdit = (e) => {
    if (
      e.target.closest(".editProfile-bio-name") ||
      e.target.closest(".editProfile-bio-last_name") ||
      e.target.closest(".editProfile-bio-email") ||
      e.target.closest(".editProfile-bio-phone")
    ) {
      //validating inputs
      const input = e.target;
      const validData = checkInput(input, input.type, input.value);
      validData && (this.editProfData = { ...validData });
    }
  };

  // for uploading Img
  uploadImg = (e) => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      e.stopPropagation();
      this.modalCloseBtn.addEventListener("click", this.closeModal);
      upload();
    } else {
      signOutUser.onSignOutClick();
    }
  };

  // closing modal
  closeModal = (e) => {
    this.modal.style.display = "none";
    this.modalCloseBtn.removeEventListener("click", this.closeModal);
  };

  // onClickSave
  onClickSave = (e) => {
    let formData;
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      //validating form
      const formFields = Array.from(this.form.querySelectorAll(".editProfile-bio-wrpr-item-txt"));
      const valid = checkForm(this.form, formFields, ".editProfile-bio-wrpr-item", _, {
        _key: "value",
      });

      // FormData creation
      if (valid) {
        if (!Object.keys(this.editProfData).length) {
          formData = new FormData(this.form);
        }
        if (
          Object.keys(this.editProfData).length <= 4 &&
          Object.keys(this.editProfData).length > 0
        ) {
          formData = new FormData(this.form);
          for (let key in this.editProfData) {
            formData.append(key, this.editProfData[key]);
          }
        }

        if (!avatarBlob) {
          formData.append("image_url", "");
        } else {
          formData.append("image_url", avatarBlob);
        }

        setTimeout(() => {
          this.editProflie(
            formData,
            this.generalWrapper,
            this.form,
            formFields,
            ".editProfile-bio-wrpr-item"
          );
        }, 500);
      } else {
        return;
      }
    } else {
      signOutUser.onSignOutClick();
    }
  };

  //onClickCancel;
  onClickCancel = () => {
    const getToken = processLocalStorage("get", "token");

    if (getToken) {
      location.href = "/profile";
    } else {
      signOutUser.onSignOutClick();
    }
  };
}

let editedProfile = new ProfileEdit(EDIT_PROFILE_DOM, COMMON_DOM, dataProcess.editProflie);
export default editedProfile;
