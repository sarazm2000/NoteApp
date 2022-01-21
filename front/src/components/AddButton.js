import { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import AddNote from './AddNote';

const AddButton = (handleAddNote) => {
    return (
        <MdAddCircle className='AddButton' onClick={()=> handleAddNote()}
        size='1.6em'/>
    );
};


export default AddButton;

