import Lines from './Lines';

export default function TableLines({ lines, handleDeleteLine }) {
    return (
        <div className="contain-table">
            {/* <h4 className="text-center">Lines</h4> */}
            <table className="striped-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Pixels</th>
                        <th>Cm</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (lines.length > 0) ?
                            lines.map(line => (
                                <Lines key={line.name} {...line} lines={lines} handleDeleteLine={handleDeleteLine} />
                            ))
                            : <tr>
                                <td colSpan={5}>&nbsp;</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
