import { useState } from 'react';

import { imageLoader } from '../helpers/imageLoader';

export const useImage = () => {
    const [imageFile, setImageFile] = useState(null);

    const settingImage = file => {
        setImageFile(file);
    };

    const uploadImage = (fileUpload, container) => {
        imageLoader(fileUpload, container);
    };

    return {
        imageFile,
        settingImage,
        uploadImage
    };
}