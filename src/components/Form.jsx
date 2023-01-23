export default function Form(props) {
    const { name, length, color, onInputChange, baseLine, handleAddNewLine, errors } = props;

    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={e => { onInputChange(e) }}
                readOnly={!baseLine}
                aria-label="name"
            />
            {
                (!baseLine) ? (
                    <>
                        <label htmlFor="name">Cm</label>
                        <input
                            type="text"
                            name="length"
                            placeholder="100"
                            value={length}
                            onChange={e => { onInputChange(e) }}
                            aria-label="length"
                        />
                    </>
                ) : <></>
            }
            <label htmlFor="name">Color</label>
            <input
                type="color"
                name="color"
                style={{ height: '60px' }}
                value={color}
                onChange={e => { onInputChange(e) }}
            />
            <button
                className="full-button"
                onClick={handleAddNewLine}
            >Add line</button>
            <div style={{ color: 'red' }}>
                {
                    (errors.length > 0)
                        ?
                        errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))
                        : <p>&nbsp;</p>
                }
            </div>
        </form>
    )
}
