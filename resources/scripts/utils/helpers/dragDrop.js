const draggables = Array.from(document.querySelectorAll(".draggable"));
const dragContainers = document.querySelectorAll(".menu-content-item");
const generalContainer = document.querySelector(".menu-content");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    const dragging = document.querySelector(".dragging");
    dragging.parentElement.dataset.dragged = "isDragged";
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    const draggedParent = document.querySelectorAll(`[data-dragged*="isDragged"]`)[0];
    const extendedParent = draggable.parentElement;
    const draggedParentChildren = Array.from(draggedParent.children);
    const extendedParentChildren = Array.from(extendedParent.children);

    //making a parent sibling child and/or parent to child
    if (
      extendedParentChildren[0].classList.contains("menu-content-item-parent") &&
      extendedParentChildren[1].classList.contains("menu-content-item-parent")
    ) {
      extendedParentChildren[1].classList.remove("menu-content-item-parent");
      extendedParentChildren[1].classList.add("menu-content-item-child");
    } else {
      draggable.classList.remove("menu-content-item-parent");
      draggable.classList.add("menu-content-item-child");
    }

    //removing an empty wrapper of dragged item
    if (!draggedParentChildren.length) {
      draggedParent.remove();
    }

    //turning a first child item to a parent if a parent was dragged
    if (
      draggedParentChildren.length &&
      Array.from(draggedParentChildren).every(
        (child) => !child.classList.contains("menu-content-item-parent")
      )
    ) {
      draggedParentChildren[0].classList.remove("menu-content-item-child");
      draggedParentChildren[0].classList.add("menu-content-item-parent");
    }

    //turning a first child item into parent after inserted before
    if (
      draggedParentChildren.length &&
      Array.from(draggedParentChildren)[0].classList.contains("menu-content-item-child")
    ) {
      draggedParentChildren[0].classList.remove("menu-content-item-child");
      draggedParentChildren[0].classList.add("menu-content-item-parent");
      draggedParentChildren[1].classList.remove("menu-content-item-parent");
      draggedParentChildren[1].classList.add("menu-content-item-child");
    }
    delete draggedParent.dataset.dragged;
  });
});

dragContainers.forEach((dragContainer) => {
  dragContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const elemAfterDrag = getDragAfterElem(dragContainer, e.clientY);
    const draggable = document.querySelector(".dragging");

    if (!elemAfterDrag) {
      dragContainer.appendChild(draggable);
    } else {
      dragContainer.insertBefore(draggable, elemAfterDrag);
    }
    console.log("drag over minor");
  });
});

// generalContainer.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   const draggable = document.querySelector(".dragging");
//   const elemAfterDrag = getDragAfterElem(generalContainer, e.clientY);

//   if (!elemAfterDrag) {
//     //appending item if it is positioned in the end
//     generalContainer.appendChild(draggable);
//   } else {
//     //inserting item befor another item
//     generalContainer.insertBefore(draggable, elemAfterDrag);
//   }
//   console.log("drag over general");
// });

function getDragAfterElem(dragContainer, y) {
  const draggablesElements = [...dragContainer.querySelectorAll(".draggable:not(.dragging)")];

  return draggablesElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
