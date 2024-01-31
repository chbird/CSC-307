import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  
  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE',
    })
    .then((res) => {
      if (res.status === 204) {
        const updated = characters.filter((character) => character.id !== id);
        setCharacters(updated);
      } else if (res.status === 404) {
        console.log("Resource not found.");
      } else {
        console.log("Failed to delete user.");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  }

  function updateList(person) {
    postUser(person)
      .then((addedUser) => setCharacters([...characters, addedUser]))
      .catch((error) => {
        console.log(error);
      });
  }  

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users"); // constant reference
    return promise;
  }
  
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
      }).then((res) => 
      {
        if (res.status === 201) {
          return res.json(); // Return the added user data
        } else {
          throw new Error("Failed to add user");
        }
    });

    return promise;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
    <Form handleSubmit={updateList} />
    </div>
  );
}


export default MyApp;