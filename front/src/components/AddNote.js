import { useState } from 'react';
import {BsFillCheckCircleFill} from 'react-icons/bs';

const AddNote = ({handleAddNote}) => {
    const [noteText, setNoteText] = useState('');
    const handleChange = (event) => {
        setNoteText(event.target.value)
    }

    const handleSaveClick = () => {
        if (noteText.trim().length > 0){
            handleAddNote(noteText);
            setNoteText('');
        }
    }
    return (<div className="note new">
        <textarea cols="10" rows="8" 
        value={noteText}
        placeholder="type to add a note..."
        onChange={handleChange}></textarea>
        <div className="note-footer">
            {/* <button className="save" onClick={handleSaveClick}>Save</button> */}
            <BsFillCheckCircleFill onClick={handleSaveClick} 
            className='save-icon' size = "1.3em"/>
        </div>
    </div>);
};

export default AddNote;