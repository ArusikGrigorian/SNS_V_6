const checkMenuLength = (headerNavWrapper, headerMenuList, headerBurgerMenuExtended) => {
  const menuItemList = Array.from(headerMenuList.querySelectorAll(".header-nav-wrpr-list-item"));

  if (menuItemList.length > 7) {
    headerBurgerMenuExtended.style.display = "flex";
    headerNavWrapper.classList.toggle("extended");
    headerMenuList.classList.toggle("extended-list");

    menuItemList.forEach((item) => {
      item.classList.toggle("extended-list-item");
      item.children[0].classList.toggle("extended-list-item-link");

      if (item.querySelector(".header-nav-wrpr-list-item-option")) {
        item.querySelector(".header-nav-wrpr-list-item-option").style.top = "70%";
        item.querySelector(".header-nav-wrpr-list-item-option").style.left = "70%";
      }
    });
  } else {
    headerBurgerMenuExtended.style.display = "none";
    headerNavWrapper.classList.remove("extended");
    headerMenuList.classList.remove("extended-list");
    menuItemList.forEach((item) => {
      item.classList.remove("extended-list-item");
      item.children[0].classList.remove("extended-list-item-link");
    });
  }
};

export default checkMenuLength;
