export const useCanvas = ({ imageFile, setNewLine, lines }) => {
    let initialStartPosition = { x: 0, y: 0 };
    let lineCoordinates = { x: 0, y: 0 };

    let isDrawStart = false;

    const mouseDownListener = (event, canvas) => {
        if (imageFile) {
            initialStartPosition = getClientOffset(event, canvas);
            isDrawStart = true;
        }
    };

    const getClientOffset = (event, canvas) => {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

        return {
            x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
            y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    };

    const mouseMoveListener = (event, canvas, color) => {
        if (imageFile) {
            if (!isDrawStart) return;

            lineCoordinates = getClientOffset(event, canvas);
            clearCanvas(canvas);
            drawLine(canvas, color);
        }
    };

    const mouseupListener = color => {
        if (imageFile) {
            isDrawStart = false;

            var a = initialStartPosition.x - lineCoordinates.x;
            var b = initialStartPosition.y - lineCoordinates.y;

            var distanceInPixels = Math.sqrt(a * a + b * b);

            // Only to check the object
            // const tempLine = {
            //     'startPosition': {
            //         'x': initialStartPosition.x,
            //         'y': initialStartPosition.y
            //     },
            //     'lineCoordinates': {
            //         'x': lineCoordinates.x,
            //         'y': lineCoordinates.y
            //     },
            //     'color': color,
            //     'distance': distanceInPixels
            // };
            // console.log({ tempLine });

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
                'color': color,
                'distance': distanceInPixels
            });
        }
    };

    const clearCanvas = canvas => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawLine = (canvas, color) => {
        const ctx = canvas.getContext('2d');

        if (imageFile) {
            // Draw the stored lines
            if (lines && lines.length > 0) {
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

            ctx.beginPath();

            ctx.moveTo(initialStartPosition.x, initialStartPosition.y);
            ctx.lineTo(lineCoordinates.x, lineCoordinates.y);

            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }

    return {
        mouseDownListener,
        mouseMoveListener,
        mouseupListener,
        clearCanvas
    }
}