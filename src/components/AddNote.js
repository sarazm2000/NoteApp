import { useState } from 'react';

const AddNote = () => {
    const [noteText, setNoteText] = useState('');
    const handleChange = (event) => {
        setNoteText(event.target.value)
    }

    const handleSaveClick = () => {
        
    }
    return (<div className="note new">
        <textarea cols="10" rows="8" 
        value={noteText}
        placeholder="type to add a note..."
        onChange={handleChange}></textarea>
        <div className="note-footer">
            <small>200 remaining</small>
            <button className="save" onClick={handleSaveClick}>Save</button>
        </div>
    </div>);
};

export default AddNote;