import { useEffect } from 'react';
import { useApp } from './use-app';

function App() {
  const {
    breeds,
    loading,
    handleBreedClick,
    selectedBreed,
    currentIndex,
    images,
    handleNextClick,
    handlePrevClick,
    handleBackgroundClick,
    loadingModal
  } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex justify-center">
      <div className="w-full">
        <h1 className="text-3xl font-semibold mb-4">Razas de Perros</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Razas</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {breeds.map((breed, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center ">{breed}</td>
                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => handleBreedClick(breed)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <svg className="h-5 w-5 flex-none stroke-sky-500 " fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M17.25 10c0 1-1.75 6.25-7.25 6.25S2.75 11 2.75 10 4.5 3.75 10 3.75 17.25 9 17.25 10Z"></path><circle cx="10" cy="10" r="2.25"></circle></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedBreed && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50" onClick={handleBackgroundClick}>
          <div className="bg-white p-4 rounded-lg relative" onClick={(e) => e.stopPropagation()}>
            {loadingModal ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="relative">
                  <img src={images[currentIndex]} alt={selectedBreed} className="w-full h-64 object-cover rounded-lg" />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center mt-4">
                  </div>
                </div>
                <p className="text-lg font-semibold text-center mt-4 ">{selectedBreed}</p>
                <br />
                <div className="flex justify-center items-center">
                  <button onClick={handlePrevClick} className="text-white bg-black bg-opacity-30 shadow-md hover:shadow-lg mr-4 px-4 py-2 rounded-lg">
                    Atras
                  </button>
                  <button onClick={handleNextClick} className="text-white bg-black bg-opacity-30 shadow-md hover:shadow-lg px-4 py-2 rounded-lg">
                    Siguiente
                  </button>
                </div>

              </>

            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
