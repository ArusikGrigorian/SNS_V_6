const toggleClass = (valid, input, classArray, withDataSet) => {
  if (!valid && !withDataSet) {
    input.previousElementSibling.classList.add(classArray[0]);
    input.classList.add(classArray[1]);
    input.dataset.valid = "isInvalid";
  } else if (!valid && withDataSet) {
    input.previousElementSibling.classList.add(classArray[0]);
    input.classList.add(classArray[1]);
  } else {
    input.previousElementSibling.classList.remove(classArray[0]);
    input.classList.remove(classArray[1]);
    input.dataset.valid = "isValid";
  }
};

export default toggleClass;
