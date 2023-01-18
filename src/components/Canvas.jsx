import { useRef, useEffect } from 'react';
import { useCanvas } from '../hooks/useCanvas';

export default function Canvas({ imageFile, newLine, setNewLine, lines, color }) {
    const { initCanvas } = useCanvas({ imageFile, newLine, setNewLine, lines, color });

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        // const context = canvas.getContext('2d');

        initCanvas(canvas, color);
    }, [initCanvas, color]);

    return (
        <canvas ref={canvasRef}></canvas>
    )
}