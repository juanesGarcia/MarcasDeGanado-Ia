import React, { useState, useEffect } from 'react';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [similarities, setSimilarities] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Selecciona un archivo antes de cargarlo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
  
    
    try {
      const response = await fetch('http://localhost:5000/similarity', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSimilarities(data.similarities);
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  return (
    <div>
      <h1>Similitud de Imágenes</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Cargar y Comparar</button>

      {similarities.length > 0 && (
        <div>
          <h2>Imágenes Similares:</h2>
          <ul>
            {similarities.map((similarity, index) => (
              <li key={index}>
                <p>{similarity[0]}</p>
                <img
                  src={`http://localhost:5000/animals/${similarity[0]}`}
                  alt={`Similarity ${index + 1}`}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
                <p>Similitud: {similarity[1]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
