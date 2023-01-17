import Lines from './Lines'

export default function TableLines({ lines, setLines, drawStoredLines }) {
    return (
        <div className="contain-table">
            <h4 className="text-center">Lines</h4>
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
                        lines.map(line => (
                            <Lines key={line.name} {...line} lines={lines} setLines={setLines} drawStoredLines={drawStoredLines} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
