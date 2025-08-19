import React, { useState, useEffect } from 'react';

// Estilos personalizados
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  .bg-gradient-header {
    background-image: linear-gradient(to right, #FFA500, #FF4500);
  }
  .bg-gradient-item {
    background-image: linear-gradient(135deg, #f0f4f8, #e6ecf2);
  }
  .list-item {
    transition: all 0.2s ease-in-out;
  }
  .list-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  .video-container {
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
    height: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
    margin-top: 1rem;
    border-radius: 0.5rem;
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// Componente para el reproductor de YouTube
const YouTubePlayer = ({ videoId, onClose }) => {
  return (
    <div className="w-full">
      <div className="video-container shadow-xl">
        <iframe
          id="youtube-player"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video de Solución"
        ></iframe>
      </div>
      <button
        onClick={onClose}
        className="mt-4 w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors duration-200 shadow-md transform hover:scale-105"
      >
        Cerrar Video
      </button>
    </div>
  );
};

// Componente de la lista de problemas
const ProblemList = ({ pageData, onSelectVideo }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    {Object.keys(pageData).filter(key => key !== 'home').map(key => (
      <button
        key={key}
        onClick={() => onSelectVideo(pageData[key].videoId)}
        className="w-full text-left p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-colors duration-200 list-item animate-fadeIn"
      >
        <h3 className="text-lg font-semibold text-gray-800">{pageData[key].title}</h3>
      </button>
    ))}
  </div>
);

// Componente principal de la aplicación
const App = () => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const pageData = {
    'kallpa': {
      title: 'Inicio de Sesión en KALLPA',
      videoId: 't8A8V_3UPEg'
    },
    'internet': {
      title: 'Validar Internet',
      videoId: 'h7Nf-y2b1bQ'
    },
    'balanza': {
      title: 'Reinicio de Balanza',
      videoId: 'nf6QB53r-CE'
    },
    'gabinete': {
      title: 'Componentes del Gabinete',
      videoId: 'Yw6J_n_vU5c'
    },
    'camaras': {
      title: 'Descarte de Cámaras',
      videoId: 'C_jK93fVq7Q'
    },
    'monitor': {
      title: 'Descarte de Monitor',
      videoId: 'SWd51cuUTjk'
    },
    'aloha': {
      title: 'Reinicio Aloha',
      videoId: 'qmvbiLxOV7A'
    },
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-gray-100 font-sans p-4">
        <header className="text-center py-8 bg-white rounded-xl shadow-lg mb-6 bg-gradient-header text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Guía rápida de soluciones tiendas 3A</h1>
          <p className="mt-2 text-md md:text-lg">Selecciona un problema para ver el video de la solución.</p>
        </header>

        <main className="container mx-auto max-w-4xl">
          {selectedVideoId ? (
            <YouTubePlayer
              videoId={selectedVideoId}
              onClose={() => setSelectedVideoId(null)}
            />
          ) : (
            <ProblemList
              pageData={pageData}
              onSelectVideo={setSelectedVideoId}
            />
          )}
        </main>
      </div>
    </>
  );
};

// Exporta el componente principal
export default App;