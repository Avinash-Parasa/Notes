import { useState, useContext } from "react";
import NoteContext from "./noteContext";
import AlertContext from "../alert/alertContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_NOTES_HOST;
  const authToken = localStorage.getItem("auth-token");
  const [notes, setNotes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  
  // Function to fetch all notes
  const getNotes = async () => {
    try {
      let url = `${host}/fetchnotes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "auth-token": authToken,
        },
      });
      const allNotes = await response.json();

      if (response.ok) {
        showAlert("Fetched all notes", "info");
        setNotes(allNotes);
      } else {
        console.log("Error:", allNotes.error);
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  // Function to add a note with image and audio
  const addNote = async (title, description, tag, audio, image,image1,favourite) => {
    try {
      let url = `${host}/addnote`;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tag", tag);
      formData.append("favourite",favourite)
      if (audio) formData.append("audio", audio);
      if (image) formData.append("image", image);
      if(image1) formData.append("image1",image1)

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "auth-token": authToken,
        },
        body: formData, // Send data as FormData
      });

      const note = await response.json();
      if (response.ok) {
        setNotes(notes.concat(note));
        showAlert("Note Added Successfully", "success");
      } else {
        showAlert(`Server Error: ${note.errors[0]?.msg || "Failed to add note"}`, "danger");
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  // Function to edit a note (updates title, description, tag, and optionally replaces image/audio)
  // const editNote = async (id, title, description, tag, audio, image) => {
  //   try {
  //     let url = `${host}/updatenote/${id}`;
  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("description", description);
  //     formData.append("tag", tag);
  //     if (audio) formData.append("audio", audio);
  //     if (image) formData.append("image", image);

  //     const response = await fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         "auth-token": authToken,
  //       },
  //       body: formData,
  //     });

  //     const updatedNote = await response.json();

  //     let newNotes = JSON.parse(JSON.stringify(notes));
  //     for (let index = 0; index < newNotes.length; index++) {
  //       if (newNotes[index]._id === updatedNote._id) {
  //         newNotes[index] = updatedNote;
  //         break;
  //       }
  //     }
  //     setNotes(newNotes);
  //     showAlert("Note Edited Successfully", "warning");
  //   } catch (error) {
  //     showAlert(`Error: ${error.message}`, "danger");
  //   }
  // };

  // noteState.js

// Update the editNote function to accept image1
const editNote = async (id, title, description, tag, audio, image, image1) => {
  try {
    let url = `${host}/updatenote/${id}`;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
    if (audio) formData.append("audio", audio);
    if (image) formData.append("image", image);
    if (image1) formData.append("image1", image1); // Append image1 to FormData

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "auth-token": authToken,
      },
      body: formData,
    });

    const updatedNote = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === updatedNote._id) {
        newNotes[index] = updatedNote;
        break;
      }
    }
    setNotes(newNotes);
    showAlert("Note Edited Successfully", "warning");
  } catch (error) {
    showAlert(`Error: ${error.message}`, "danger");
  }
};

  // Function to delete a note
  const deleteNote = async (id) => {
    try {
      let url = `${host}/deletenote/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== id));
        showAlert("Note Deleted Successfully", "danger");
      } else {
        showAlert("Failed to delete note", "danger");
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  // Function to delete all notes
  const deleteAllNotes = async () => {
    try {
      let url = `${host}/deleteallnotes`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (response.ok) {
        setNotes([]);
        showAlert("All Notes Deleted Successfully", "danger");
      } else {
        showAlert("Failed to delete all notes", "danger");
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };
  const getFavourites = async () => {
    try {
      let url = `${host}/fetchfavourites`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "auth-token": authToken,
        },
      });
      const favouriteNotes = await response.json();

      if (response.ok) {
        console.log("fetched")
        showAlert("Fetched favourite notes", "info");
        setFavourites(favouriteNotes);
      } else {
        console.log("Error:", favouriteNotes.error);
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  // Function to toggle favourite status
  const toggleFavourite = async (id) => {
    try {
      let url = `${host}/togglenotefavourite/${id}`;
      console.log("Sending request to:", url); 
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "auth-token": authToken,
        },
      });
      
      const updatedNote = await response.json();
      console.log(updatedNote)
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === updatedNote._id) {
          newNotes[index] = updatedNote;
          break;
        }
      }
      setNotes(newNotes);
      showAlert("Note Favourite Status Updated", "warning");
    } catch (error) {
      showAlert(`Error: ${error.message}`, "danger");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, favourites, addNote, deleteNote, editNote, getNotes, deleteAllNotes, toggleFavourite, getFavourites }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
