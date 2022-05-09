import { COMMON_DOM } from "../configurations/constants.js";
import showLoader from "./loader.js";

const badRequest = (generalWrapper) => {
  const { $section, $container } = COMMON_DOM;
  showLoader("off", generalWrapper);
  $container.style.display = "none";
  const errorWrapper = document.createElement("div");
  errorWrapper.className = "badRequestWrapper";
  const img = document.createElement("img");
  img.src = "../media/images/error/badrequest.png";
  img.className = "badRequestImg";
  errorWrapper.append(img);
  $section.append(errorWrapper);
};

export default badRequest;
