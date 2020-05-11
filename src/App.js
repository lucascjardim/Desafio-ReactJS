import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

useEffect(() => {
  api.get('repositories').then(response => {
    setRepositories(response.data);
  })
}, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      "title":"Desafio ReactJS",
      "url": "https://github.com/lucascjardim/semanaomnistack11",
      "techs": ["node JS", "react JS"]
    });
    const repo = response.data;
    setRepositories([...repositories, repo]);
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repos = repositories.filter(rep => rep.id !== id);
    console.log(repos);   
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
       
          {repositories.map(repository => <li key={repository.id}> {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>)}
 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
