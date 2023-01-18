export default function Lines(props) {
    const { id, name, lengthInCM, color, lengthInPixels, lines, handleDeleteLine } = props;
    // console.log({ lines });

    const showDelete = () => {
        return (lines.length === 1) || (lines.length > 1 && name !== 'Base')
            ? <img onClick={() => handleDeleteLine(id)} src="./src/assets/images/delete.png" alt={`Delete ${name} line`} title={`Delete ${name} line`} />
            : <></>
    }

    const displayColorCell = color => {
        return (
            <span style={{ display: 'block', width: '50%', backgroundColor: `${color}` }}>&nbsp;</span>
        )
    } 

    return (
        <tr>
            <td>{name}</td>
            <td>{displayColorCell(color)}</td>
            <td>{Math.round(lengthInPixels, 2)}</td>
            <td>{lengthInCM}</td>
            <td>{showDelete()}</td>
        </tr>
    )
}