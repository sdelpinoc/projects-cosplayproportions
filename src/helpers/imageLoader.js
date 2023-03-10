export const imageLoader = (imageFile, containerDiv) => {
    if (!imageFile) {
        return;
    }

    const reader = new FileReader();

    reader.onloadend = function () {
        containerDiv.style.backgroundSize = 'contain';
        containerDiv.style.backgroundImage = 'url("' + reader.result + '")';
        containerDiv.style.backgroundRepeat = 'no-repeat';
        containerDiv.style.backgroundPosition = 'center center';
    }

    reader.readAsDataURL(imageFile);
};