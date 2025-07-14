import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [resultado, setResultado] = useState('');

  function buscar(){
    alert('botão clicado');
    const numerosAleatorios = Math.floor(Math.random() * 100) + 1;
    setResultado(`Numero: ${numerosAleatorios}`);
  }

  useEffect(() => {
    if (resultado) {
      alert(`Resultado atual: ${resultado}`);
    }
  }, [resultado]);

  return (
    <div className='flex flex-col min-h-screen min-w-screen flex items-center justify-center'>
      <div className='bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center'>
        <header className='flex flex-col gap-4 items-center justify-center rounded-b-lg'>
          <h1 className='text-2xl font-bold'>Air Sense</h1>
          <p className='text-lg text-gray-600 ml-2'>...seu controlador de qualidade do ar.</p>
        </header>
        <input
          type='text'
          placeholder='Buscar por cidade...'
          className='w-full p-2 border border-gray-300 rounded mt-4 mb-4'
        />
        <button 
        onClick={buscar}
        className='bg-gradient-to-r from-green-600 to-blue-800 text-white px-4 py-2 max-w-md transform transition-all duration-300 hover:scale-103'>
          Buscar
        </button>
      </div>
      <div className='bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center'>
        <h2 className='text-xl font-bold mb-4'>Resultados</h2>
      </div>
    </div>
  )
}

export default App
