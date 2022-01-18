import React from "react";
import {MdDarkMode} from 'react-icons/md';
import {MdAddCircle} from 'react-icons/md';
import {IoIosColorPalette} from 'react-icons/io';


const Header = ({handleToggleDarkMode}) => {

    return (
        <div className="header">
            <h1>Notes</h1>
            
            <IoIosColorPalette onClick={() => handleToggleDarkMode(
                (previousDarkMode) => !previousDarkMode
            )} 
                className='mode' size = "1.5em"/>
        </div>
    );
}

export default Header;