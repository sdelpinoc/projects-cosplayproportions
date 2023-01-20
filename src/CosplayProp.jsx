import { useState } from 'react';

import { imageLoader } from './helpers/imageLoader';
import { useForm } from './hooks/useForm';

import TableLines from './components/TableLines';
import Canvas from './components/Canvas';
import Form from './components/Form';

const initialForm = { name: 'Base', length: 0, color: '#000000' };
const initialLine = {
    'startPosition': {
        'x': 0,
        'y': 0
    },
    'lineCoordinates': {
        'x': 0,
        'y': 0
    },
    'color': '#000000',
    'distance': 0
};

export default function CosplayProp() {

    const { name, length, color, onInputChange, onResetForm } = useForm(initialForm);

    const [imageFile, setImageFile] = useState(null);
    const [newLine, setNewLine] = useState(initialLine);
    const [lines, setLines] = useState([]);
    const [baseLine, setBaseLine] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleImageUpload = () => {
        setErrors([]);

        if (!imageFile) {
            setErrors(['You need to upload a image']);
            return;
        };

        imageLoader(imageFile, document.querySelector('.container-canvas'));
        setLines([]);
        setNewLine(initialLine);
        setBaseLine(false);
        onResetForm(initialForm);
    };

    const handleSelectImage = e => {
        setImageFile(e.target.files[0]);
    };

    const addNewLine = (lineName, lineLength) => {
        // Validations
        if (lineName === '' || (newLine.distance === 0 || newLine.distance === undefined)) {
            setErrors(['Missing to add the name or draw the line']);
            return;
        }

        if (lineLength === 0 || lineLength === '' || lineLength === null || isNaN(lineLength)) {
            setErrors(['Missing length(Cm)']);
            return;
        }

        const checkLine = lines.find(line => line.name.toLowerCase() === lineName.toLowerCase());

        if (baseLine && checkLine) {
            setErrors(['Line with the same name']);
            return;
        }

        let newLineName = lineName;
        let newLineLength = lineLength;

        const { startPosition, lineCoordinates, color, distance } = newLine;

        if (!baseLine) {
            newLineName = 'Base';
            setBaseLine(true);
        } else {
            // We must calculate the distance according to the pixels of the line and the distance in cm from the baseline
            const { lengthInCM, lengthInPixels } = lines.filter(line => line.isBaseLine === true)[0];

            newLineLength = Math.round((lengthInCM * distance) / Math.round(lengthInPixels, 2), 2);
        }

        let newLineToAdd = {
            id: Date.now(),
            name: newLineName,
            lengthInCM: newLineLength,
            startPosition: startPosition,
            finalPosition: lineCoordinates,
            color: color,
            lengthInPixels: distance,
            isBaseLine: !baseLine
        };

        setLines([...lines, newLineToAdd]);
        setNewLine(initialLine);
    };

    const handleAddNewLine = (e) => {
        e.preventDefault();
        setErrors([]);

        if (!imageFile) {
            setErrors(['You need to upload a image']);
            return;
        };

        if (!name.length > 0 || length === 0) {
            setErrors(['It remains to add the centimeters or draw the line']);
            return;
        }

        addNewLine(name, length);
    };

    const handleDeleteLine = id => {
        const newLines = lines.filter(line => line.id !== id);

        setLines(newLines);

        if (newLines.length === 0) {
            setNewLine(initialLine);
            setBaseLine(false);
            onResetForm(initialForm);
        };
    };

    return (
        <div className="container">
            <h1 className="text-center">Cosplay Proportions</h1>
            <div>
                <div className="container-canvas">
                    <Canvas
                        imageFile={imageFile}
                        newLine={newLine}
                        lines={lines}
                        setNewLine={setNewLine}
                        color={color}
                    />
                </div>
                <div className="container-lines">
                    <div>
                        <input
                            type="file"
                            name="image"
                            onChange={handleSelectImage}
                        />
                        <button
                            name="imageFile"
                            className="full-button"
                            onClick={handleImageUpload}>Upload image
                        </button>
                        <Form
                            name={name}
                            length={length}
                            color={color}
                            onInputChange={onInputChange}
                            baseLine={baseLine}
                            handleAddNewLine={handleAddNewLine}
                            errors={errors}
                        />
                    </div>
                    <TableLines lines={lines} handleDeleteLine={handleDeleteLine} />
                </div>
            </div>
        </div>
    )
}
