import NotesList from "../components/NotesList";
import { nanoid } from 'nanoid';
import { useState, useEffect } from "react";
import Search from "../components/Search";
import Header from "../components/Header";
import AddButton from '../components/AddButton';
import './index.css';

const App = () => {
  const [notes, setNotes] = useState([{
    text: "Welcome to Notes! You can keep your notes here.",
    date: `${new Date().toLocaleString()}`
  }]);

  const [SearchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  const [addButton, setAddButton] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [])
  useEffect(() => {
    localStorage.setItem (
      'react-notes-app-data', 
      JSON.stringify(notes)
    );
  },[notes]);

  const addNote = (text) => {
    const newNote = {
      id: nanoid(),
      text : text,
      date: `${new Date().toLocaleString()}`
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }

 
  return (
    <div className={`${darkMode && "dark-mode"}`}>
       <div className="container">
    <Header handleToggleDarkMode = {setDarkMode}/>
    <Search handleSearchNote={setSearchText}/>
    <NotesList notes={notes.filter((note) =>
     note.text.toLocaleLowerCase().includes(SearchText))} 
    handleAddNote={addNote}
    handleDeleteNote = {deleteNote}
    
    />
    </div>

    </div>

  );
  
};

export default App;
