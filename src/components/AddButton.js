import { useState } from 'react';
import {MdAddCircle} from 'react-icons/md';
import AddNote from './AddNote';

const AddButton = () => {
    return (
        <MdAddCircle className='AddButton' onClick={()=> <AddNote />}
        size='1.6em'/>
    );
};

export default AddButton;

