import { useRef, useEffect } from 'react';
import { useCanvas } from '../hooks/useCanvas';

export default function Canvas({ imageFile, newLine, setNewLine, lines, color }) {
    const { 
        mouseDownListener, mouseMoveListener, mouseupListener, clearCanvas
    } = useCanvas({ imageFile, setNewLine, lines });

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const mousedownEvent = event => mouseDownListener(event, canvas);
        const mousemoveEvent = event => mouseMoveListener(event, canvas, color);
        const mouseupEvent = () => mouseupListener(color);

        canvas.addEventListener('mousedown', mousedownEvent);
        canvas.addEventListener('mousemove', mousemoveEvent);
        canvas.addEventListener('mouseup', mouseupEvent);

        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        clearCanvas(canvas);

        if (newLine && newLine.distance > 0) {
            const { startPosition, lineCoordinates, color } = newLine;

            ctx.beginPath();

            ctx.moveTo(startPosition.x, startPosition.y);
            ctx.lineTo(lineCoordinates.x, lineCoordinates.y);

            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();
        }

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

        return () => {
            canvas.removeEventListener('mousedown', mousedownEvent);
            canvas.removeEventListener('mousemove', mousemoveEvent);
            canvas.removeEventListener('mouseup', mouseupEvent);
        }
    }, [lines, color, clearCanvas, mouseDownListener, mouseMoveListener, mouseupListener, newLine]);

    return (
        <canvas ref={canvasRef}></canvas>
    )
}