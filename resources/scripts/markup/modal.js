import { COMMON_DOM } from "../configurations/constants.js";

const showModal = (generalWrapper, message, url, className) => {
  const { $container, $editProfileContainer } = COMMON_DOM;

  generalWrapper.style.display = "none";
  const modalWrapper = document.createElement("div");
  modalWrapper.className = "modalWrapper";
  const textWrapper = document.createElement("div");
  textWrapper.className = className;
  const text = document.createElement("h1");
  text.className = "modalWrapper-content-text";
  text.innerHTML = message;
  textWrapper.append(text);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.className = "modalWrapper-content-link";
  link.innerHTML = "Back";
  textWrapper.append(link);
  modalWrapper.append(textWrapper);

  if ($container.classList.contains("header-container")) {
    $editProfileContainer.append(modalWrapper);
  } else {
    $container.append(modalWrapper);
  }
};

export default showModal;
