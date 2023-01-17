import { useEffect, useRef } from 'react';

import { imageLoader } from './helpers/imageLoader';
import { useCanvas } from './hooks/useCanvas';

import TableLines from './components/TableLines';

function CosplayProp() {

    const ref = useRef();

    const {
        imageFile, lineName, lineLength, lines, baseLine, errors,
        initCanvas, setImageFile, setBaseLine, setLineName, setLineLength, addNewLine, setErrors, setLines,
        clearCanvas, drawStoredLines
    } = useCanvas();

    const handleImageUpload = () => {
        imageLoader(imageFile, document.querySelector('.container-canvas'));
    };

    const handleSelectImage = e => {
        setImageFile(e.target.files[0]);
    };

    const handleAddNewLine = (e) => {
        e.preventDefault();
        console.log({ lineName });
        console.log({ lineLength });

        setErrors([]);

        if (!lineName.length > 0 || lineLength == 0) return;

        addNewLine(lineName, lineLength);
    };

    useEffect(() => {
        initCanvas(ref.current, lines.length);
        // initCanvas(document.querySelector('canvas'), lines.length);
    }, [imageFile, lines]);

    useEffect(() => {
        setLines([]);
        setBaseLine(false);
        setLineLength(0);
        clearCanvas();
    }, [imageFile]);

    useEffect(() => {
        if (lines.length === 0) {
            setBaseLine(false);
            setLineName('Base');
            setLineLength(0);
        }
    }, [lines]);

    return (
        <div className="container">
            <h1 className="text-center">Cosplay Proportions</h1>
            <div className="flex-row justify-center">
                <div className="flex-large three-fourths container-canvas">
                    <canvas
                        ref={ref}
                        width="500"
                        height="600"
                    ></canvas>
                </div>
                <div className="flex-small one-fourths">
                    <input
                        type="file"
                        name="imagen"
                        onChange={handleSelectImage}
                    />
                    <button
                        name="imageFile"
                        className="full-button"
                        onClick={handleImageUpload}>Upload image
                    </button>
                    <form>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={lineName}
                            onChange={(e) => { setLineName(e.target.value) }}
                            readOnly={!baseLine}
                        />
                        {
                            !baseLine ? (
                                <>
                                    <label htmlFor="name">Cm</label>
                                    <input
                                        type="text"
                                        name="lineLength"
                                        placeholder="100"
                                        value={lineLength}
                                        onChange={(e) => { setLineLength(e.target.value) }}
                                    />
                                </>
                            ) : <></>
                        }
                        <button
                            className="full-button"
                            onClick={handleAddNewLine}
                        >Add line</button>
                        <div style={{ color: 'red' }}>
                            {
                                errors.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))
                            }
                        </div>
                    </form>
                    <TableLines lines={lines} setLines={setLines} drawStoredLines={drawStoredLines} />
                </div>
            </div>
        </div>
    )
}

export default CosplayProp;
