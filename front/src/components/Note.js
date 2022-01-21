import { RiDeleteBin5Line } from 'react-icons/ri';

const Note = ({id, text, date, handleDeleteNote}) => {
    return (
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
                <small>{date}</small>
                <RiDeleteBin5Line onClick={()=> handleDeleteNote(id)} 
                className='delete-icon' size= '1.3em'/>
            </div>
        </div>
    );
};

export default Note;
