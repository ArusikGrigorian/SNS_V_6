import { COMMON_DOM } from "../configurations/constants.js";

const showLoader = (mode, generalWrapper) => {
  let { $container, $header, $editProfileContainer, $editProfileSection } = COMMON_DOM;

  if ($container.classList.contains("fluid-container")) {
    $container.parentElement.style.backgroundColor = "transparent";
  }

  if (mode === "on") {
    generalWrapper.style.display = "none";
    const loaderWrapper = document.createElement("div");
    loaderWrapper.className = "loaderWrapper";
    const loader = document.createElement("div");
    loader.className = "loaderWrapper-centered";
    const circle_1 = document.createElement("div");
    circle_1.className = "loaderWrapper-centered-blob-1";
    const circle_2 = document.createElement("div");
    circle_2.className = "loaderWrapper-centered-blob-2";
    loader.append(circle_1);
    loader.append(circle_2);
    loaderWrapper.append(loader);

    if ($container.classList.contains("header-container")) {
      $header.style.display = "none";
      $editProfileSection.style.height = "93.5vh";
      $editProfileSection.style.backgroundColor = "transparent";
      $editProfileContainer.append(loaderWrapper);
    } else {
      $container.append(loaderWrapper);
    }
  }

  if (mode === "off") {
    if ($container.classList.contains("header-container")) {
      $editProfileContainer.querySelector(".loaderWrapper").remove();
    } else {
      $container.querySelector(".loaderWrapper").remove();
    }
  }
};

export default showLoader;
