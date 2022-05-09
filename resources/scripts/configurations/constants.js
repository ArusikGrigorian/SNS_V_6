// FOR COMMON ELEMENTS
const COMMON_DOM = {
  $section: document.querySelector(".section"),
  $container: document.querySelector(".container"),
  $headerMenuList: document.querySelector(".header-nav-wrpr-list"),
  $headerBurgerMenu: document.querySelector(".header-nav-wrpr-icons-brgr"),
  $headerEdit: document.querySelector(".header-nav-wrpr-icons-btn-edit"),
  $signOutBtn: document.querySelector(".sign-out-btn"),
  $header: document.querySelector(".header"),
  $editProfileContainer: document.querySelector(".editProfile-container"),
  $editProfileSection: document.querySelector(".editProfile-section"),
  $headerBurgerMenuExtended: document.querySelector(".header-nav-wrpr-icons-brgr-extended"),
  $headerNavWrapper: document.querySelector(".header-nav-wrpr"),
};

// FOR SIGN IN
const SIGN_IN_DOM = {
  $generalWrapper: document.querySelector(".signIn"),
  $form: document.querySelector(".signIn-content-form"),
  $email: document.querySelector(".signIn-inpt-email"),
  $password: document.querySelector(".signIn-inpt-pass"),
  $sbmt: document.querySelector(".signIn-content-form-frgt-sbmt"),
};

// FOR SIGN UP
const SIGN_UP_DOM = {
  $generalWrapper: document.querySelector(".signUp"),
  $form: document.querySelector(".signUp-content-form"),
  $name: document.querySelector(".signUp-inpt-name"),
  $surname: document.querySelector(".signUp-inpt-lname"),
  $email: document.querySelector(".signUp-inpt-email"),
  $password: document.querySelector(".signUp-inpt-pass"),
  $cnfrm_password: document.querySelector(".signUp-inpt-cpass"),
  $sbmt: document.querySelector(".signUp-content-form-wrpr-btns-sbmt"),
};

// FOR FORGOT PASSWORD
const FORGOT_PASS_DOM = {
  $generalWrapper: document.querySelector(".frgtPass"),
  $form: document.querySelector(".frgtPass-content-form"),
  $email: document.querySelector(".frgtPass-inpt-email"),
  $sbmt: document.querySelector(".frgtPass-content-form-wrpr-btns-sbmt"),
};

// FOR CREATE PASSWORD
const RESET_PASS_DOM = {
  $generalWrapper: document.querySelector(".crtPass"),
  $form: document.querySelector(".crtPass-content-form"),
  $password: document.querySelector(".crtPass-inpt-npass"),
  $cnfrm_password: document.querySelector(".crtPass-inpt-cnpass"),
  $sbmt: document.querySelector(".crtPass-content-form-wrpr-btns-sbmt"),
};

// FOR PROFILE
const PROFILE_DOM = {
  $editBtn: document.querySelector(".profile-btns-wrpr-sbmt"),
};

// FOR EDIT PROFILE PAGE
const EDIT_PROFILE_DOM = {
  $generalWrapper: document.querySelector(".editProfile"),
  $imgUpload: document.querySelector(".editProfile-img-wrpr-camera-wrpr"),
  $name: document.querySelector(".editProfile-bio-name"),
  $surname: document.querySelector(".editProfile-bio-last_name"),
  $email: document.querySelector(".editProfile-bio-email"),
  $phone: document.querySelector(".editProfile-bio-phone"),
  $form: document.querySelector(".editProfile-content-form"),
  $sbmt_cancel: document.querySelector(".editProfile-sbmts-btns-wrpr-sbmt-cancel"),
  $sbmt_save: document.querySelector(".editProfile-sbmts-btns-wrpr-sbmt-save"),
  $modalCloseBtn: document.querySelector(".editProfile-modal-header-closeBtn"),
  $modal: document.querySelector(".editProfile-modal"),
  $editProfAvatar: document.querySelector("#editProfAvatar"),
};

//FOR EDIT MENU PAGE
const EDIT_MENU_PAGE = {
  $generalWrapper: document.querySelector(".menu"),
  $backBtn: document.querySelector(".menu-sidebar-back-wrpr-link"),
  $form: document.querySelector(".menu-sidebar-add-wrpr"),
  $sbmt: document.querySelector(".menu-sidebar-btn-wrpr-sbmt"),
  $save: document.querySelector(".menu-sidebar-btn-wrpr-sbmt-save"),
  $menuItems: document.querySelectorAll(".draggable"),
  $editBtns: document.querySelectorAll(".menu-content-item-edit"),
  $deleteBtns: document.querySelectorAll(".menu-content-item-remove"),
};

export {
  COMMON_DOM,
  SIGN_IN_DOM,
  SIGN_UP_DOM,
  FORGOT_PASS_DOM,
  RESET_PASS_DOM,
  PROFILE_DOM,
  EDIT_PROFILE_DOM,
  EDIT_MENU_PAGE,
};
