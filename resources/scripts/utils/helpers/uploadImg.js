import Cropper from "cropperjs";

let isInitialized = false;
let cropper;
let avatarBlob;

// Initializing cropper
function initCropper() {
  const uploadedImg = document.querySelector("#uploadedImg");

  cropper = new Cropper(uploadedImg, {
    viewMode: 1,
    dragMode: "move",
    aspectRatio: 1,
    checkOrientation: false,
    cropBoxMovable: true,
    cropBoxResizable: true,
    zoomOnTouch: true,
    zoomOnWheel: true,
    guides: true,
    highlight: true,
    preview: ".editProfile-modal-body-imgWrpr-preview",

    ready: function () {
      cropper = this.cropper;
      const imageData = cropper.getImageData();
    },
  });
  isInitialized = true;
}

// Default function for Img upload/crop
function upload() {
  const inputImg = document.querySelector("#inputImg");
  const changePhoto = document.querySelector(".editProfile-img-wrpr-camera-wrpr");
  const modal = document.querySelector(".editProfile-modal");
  const uploadedImg = document.querySelector("#uploadedImg");
  const cropBtn = document.querySelector(".editProfile-modal-footer-btnCrop");
  const cancelCropBtn = document.querySelector(".editProfile-modal-footer-btnCancel");
  let editProfAvatar = document.querySelector("#editProfAvatar");

  // event listeners
  cropBtn.addEventListener("click", cropUploadedImg);
  cancelCropBtn.addEventListener("click", cancelCropImg);
  changePhoto.addEventListener("click", triggerInput);
  inputImg.addEventListener("change", onImgInputChange);

  // trigger input on camera icon
  function triggerInput(e) {
    e.stopPropagation();
    inputImg.click();
  }
  // uploading- IMG
  function onImgInputChange() {
    const fileList = inputImg.files;

    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        uploadedImg.src = reader.result;
        if (isInitialized) {
          cropper.destroy();
          isInitialized = false;
        }
        initCropper();
      },
      false
    );
    if (fileList[0]) {
      modal.style.display = "block";
      reader.readAsDataURL(fileList[0]);
    }
  }

  // crop IMG - toBlob transformation
  function cropUploadedImg() {
    cropper.getCroppedCanvas().toBlob((blob) => {
      editProfAvatar.src = URL.createObjectURL(blob);
      avatarBlob = blob;
      modal.style.display = "none";
      cropper.destroy();
      isInitialized = false;
    });
  }
  // cancel cropping - close modal
  function cancelCropImg() {
    modal.style.display = "none";
    cropper.destroy();
    isInitialized = false;
  }
}
export { avatarBlob };
export default upload;
