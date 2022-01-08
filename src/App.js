import NotesList from "./components/NotesList";
import { nanoid } from 'nanoid';
import { useState } from "react";
import Search from "./components/Search";

const App = () => {
  const [notes, setNotes] = useState([{
    text: "this is first note!",
    date: "16/02/2022"
  }]);

  const [SearchText, setSearchText] = useState('')

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text : text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }
 
  return <div className="container">
    <Search handleSearchNote={setSearchText}/>
    <NotesList notes={notes.filter((note) =>
     note.text.toLocaleLowerCase().includes(SearchText))} 
    handleAddNote={addNote}
    handleDeleteNote = {deleteNote}
    
    />
  </div>
  
}

export default App;