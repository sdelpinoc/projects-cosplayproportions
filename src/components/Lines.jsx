export default function Lines(props) {
    const { id, name, lengthInCM, color, lengthInPixels, lines, setLines, drawStoredLines } = props;
    console.log({ lines });

    const handleDeleteLine = (id) => {
        console.log({ id });

        const newLines = lines.filter(line => line.id != id);
        console.log({ newLines });

        setLines(newLines);

        drawStoredLines(newLines);
    };

    const showDelete = () => {
        if ((lines.length === 1) || (lines.length > 1 && name !== 'Base')) {
            return <img onClick={() => handleDeleteLine(id)} src="./src/assets/images/delete.png" alt={`Delete ${name} line`} title={`Delete ${name} line`} />;
        }

        return <></>;
    }

    return (
        <tr>
            <td>{name}</td>
            <td><span style={{ display: 'block', width: '50%', backgroundColor: `${color}` }}>&nbsp;</span></td>
            <td>{Math.round(lengthInPixels, 2)}</td>
            <td>{lengthInCM}</td>
            <td>{showDelete()}</td>
            {/* <td><img onClick={() => handleDeleteLine(id)} src="./src/assets/images/delete.png" alt={`Delete ${name} line`} title={`Delete ${name} line`} /></td> */}
        </tr>
    )
}