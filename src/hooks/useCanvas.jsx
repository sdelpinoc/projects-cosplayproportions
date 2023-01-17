import { useState } from 'react';

const initialLine = {
    name: '',
    lengthInCM: 0,
    startPosition: 0,
    finalPosition: 0,
    color: '',
    lengthInPixels: 0,
    isBaseLine: true
};

const initialLines = [];

export const useCanvas = () => {
    const [imageFile, setImageFile] = useState(null);

    // Form inputs for the new line
    const [lineName, setLineName] = useState('Base');
    const [lineLength, setLineLength] = useState(0);

    // Store the new drawn line
    const [newLine, setNewLine] = useState(initialLine);

    // Store base line status
    const [baseLine, setBaseLine] = useState(false);

    // Store the added lines
    const [lines, setLines] = useState(initialLines);

    // Errors
    const [errors, setErrors] = useState([]);

    let canvas;
    let ctx;

    let initialStartPosition = { x: 0, y: 0 };
    let lineCoordinates = { x: 0, y: 0 };
    let isDrawStart = false;
    let lineColors = [
        '#000000', // Black
        '#FF0000', // Red
        '#00FF00', // Lime
        '#0000FF', // Blue
        '#FFFF00', // Yellow
        '#800080', // Purple
        '#FF00FF', // Fuchsia
        '#00FFFF', // Aqua
        '#008000', // Green
        '#808080' // Grey
    ];

    const initCanvas = (elementCanvas, linesLength) => {
        console.log({ linesLength })
        canvas = elementCanvas;
        ctx = canvas.getContext('2d');

        canvas.addEventListener('mousedown', mouseDownListener);
        canvas.addEventListener('mousemove', (evt) => {
            mouseMoveListener(evt, linesLength);
        });
        canvas.addEventListener('mouseup', () => {
            mouseupListener(linesLength);
        });
    };

    const getClientOffset = (event) => {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

        return {
            x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
            y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    };

    /**
     * Draw the actual line y the stored lines in every move of the mouse
     * Its execute in the mousemove event
     */
    const drawLine = (linesLength) => {
        // console.log('drawLine -> imageFile: ', imageFile);

        if (imageFile) {
            // Draw the stored lines
            lines.forEach(line => {
                const { startPosition, finalPosition, color } = line;

                ctx.beginPath();

                ctx.moveTo(startPosition.x, startPosition.y);
                ctx.lineTo(finalPosition.x, finalPosition.y);

                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.stroke();
            });

            ctx.beginPath();

            ctx.moveTo(initialStartPosition.x, initialStartPosition.y);
            ctx.lineTo(lineCoordinates.x, lineCoordinates.y);

            ctx.strokeStyle = lineColors[linesLength];
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    };

    const drawStoredLines = (lines) => {
        // console.log('drawStoredLines - imageFile: ', imageFile);
        // console.log('drawStoredLines - lines: ', lines);

        clearCanvas();

        if (imageFile) {
            // Draw the stored lines
            lines.forEach(line => {
                const { startPosition, finalPosition, color } = line;

                ctx.beginPath();

                ctx.moveTo(startPosition.x, startPosition.y);
                ctx.lineTo(finalPosition.x, finalPosition.y);

                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.stroke();
            });
        }
    };

    /**
     * 
     * @param {*} event
     * 
     * When you do the first mouse click and the image is loaded, we get the initial coordinates
     * 
     * The event is mousedown
     */
    const mouseDownListener = (event) => {
        // console.log('mouseDownListener -> imageFile: ',imageFile);
        if (imageFile) {
            initialStartPosition = getClientOffset(event);
            isDrawStart = true;
        }
    };

    /**
     * 
     * @param {*} event 
     * @returns 
     * 
     * The event is mousemove, also need a uploaded image and the mouse has been clicked
     * lineCoordinates store the coordinates
     * We get the final coordinates of the line, based on the mouse pointer
     * Clear the canvas and re-draw the actual y the stored lines
     */
    const mouseMoveListener = (event, linesLength) => {
        // console.log('mouseMoveListener -> imageFile: ', imageFile);
        if (imageFile) {
            if (!isDrawStart) return;

            lineCoordinates = getClientOffset(event);
            clearCanvas();
            drawLine(linesLength);
        }
    };

    /**
     * @param linesLength
     * 
     * It's called when we stop pressing the mouse click(mouseup event)
     */
    const mouseupListener = linesLength => {
        // console.log('mouseupListener -> imageFile: ', imageFile);
        if (imageFile) {
            isDrawStart = false;

            var a = initialStartPosition.x - lineCoordinates.x;
            var b = initialStartPosition.y - lineCoordinates.y;

            var distanceInPixels = Math.sqrt(a * a + b * b);

            // Only to check the object
            const tempLine = {
                'startPosition': {
                    'x': initialStartPosition.x,
                    'y': initialStartPosition.y
                },
                'lineCoordinates': {
                    'x': lineCoordinates.x,
                    'y': lineCoordinates.y
                },
                'color': lineColors[linesLength],
                'distance': distanceInPixels
            };
            console.log({ tempLine });

            // We save the coordinates of the new line, along with its color and distance in pixels
            setNewLine({
                'startPosition': {
                    'x': initialStartPosition.x,
                    'y': initialStartPosition.y
                },
                'lineCoordinates': {
                    'x': lineCoordinates.x,
                    'y': lineCoordinates.y
                },
                'color': lineColors[linesLength],
                'distance': distanceInPixels
            });
        }
    };

    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // *** HTML Events ***
    /**
     * The first line to add will always be the base line
     */
    const addNewLine = (lineName, lineLength) => {
        console.log('newLine.distance: ', newLine.distance);

        // Validations
        if (lineName === '' || (newLine.distance == 0 || newLine.distance == undefined)) {
            setErrors(['Missing to add the name or draw the line']);
            return;
        }

        if (lineLength == 0 || lineLength === '' || lineLength === null || isNaN(lineLength)) {
            setErrors(['Missing length(Cm)']);
            return;
        }

        let newLineName = lineName;
        let newLineLength = lineLength;

        console.log({ newLine });
        const { startPosition, lineCoordinates, color, distance } = newLine;

        if (!baseLine) {
            newLineName = 'Base';
            setBaseLine(true);
        } else {
            // We must calculate the distance according to the pixels of the line and the distance in cm from the baseline
            const { lengthInCM, lengthInPixels } = lines.filter(line => line.isBaseLine === true)[0];
            // console.log({ medidaCM, medidaPX });

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
        setLineName('');
    };

    return {
        // Elements
        imageFile,
        lineName,
        lineLength,
        lines,
        baseLine,
        errors,

        // Functions
        initCanvas,
        addNewLine,
        clearCanvas,
        drawStoredLines,

        setImageFile,
        setBaseLine,
        setLineName,
        setLineLength,
        setLines,
        setErrors
    }
}