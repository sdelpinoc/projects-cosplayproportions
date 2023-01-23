import { fireEvent, render, screen } from '@testing-library/react';

import CosplayProp from '../src/CosplayProp';
import { useImage } from '../src/hooks/useImage';

// import { imageLoader } from '../src/helpers/imageLoader';

// const mockImageLoader = jest.fn();

// jest.mock('../src/helpers/imageLoader', () => ({
//     imageLoader: mockImageLoader
// }));

jest.mock('../src/hooks/useImage');

describe('Testing in <CosplayProp />', () => {

    const mockImageFile = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const mockSettingImage = jest.fn();
    const mockUploadImage = jest.fn();

    test('Should rendering correctly con default values', async () => {
        useImage.mockReturnValue({
            imageFile: null,
            // settingImage: mockSettingImage,
            // uploadImage: mockUploadImage
        });

        render(<CosplayProp />);
        // screen.debug();

        expect(screen.getByText('Cosplay Proportions')).toBeTruthy();
        expect(screen.getByLabelText('name').value).toBe('Base');
        expect(screen.getByLabelText('length').value).toBe('0');
    });

    test('Should call uploadImage 1 time', async () => {
        useImage.mockReturnValue({
            imageFile: mockImageFile,
            settingImage: mockSettingImage,
            uploadImage: mockUploadImage
        });

        render(<CosplayProp />);

        const uploadImageBtn = screen.getByText('Upload image');
        fireEvent.click(uploadImageBtn)

        expect(mockUploadImage).toHaveBeenCalledTimes(1);
    })
});