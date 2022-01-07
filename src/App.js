import NotesList from "./components/NotesList";
import { nanoid } from 'nanoid';
import { useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([{
    text: "this is first note!",
    date: "16/02/2022"
  }]);

  const addNote = (text) => {
    console.log(text);
  }
 
  return <div className="container">
    <NotesList notes={notes} handleAddNote={addNote}/>
  </div>
  
}

export default App;