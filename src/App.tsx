import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [teste, setTeste] = useState('');
  const [cidade, setCidade] = useState('');
  const [resultado, setResultado] = useState('');

  function buscar(){
    alert('botão clicado');
    alert(teste);
    setResultado(Math.random().toString(36).substring(7)); // Simula uma busca com um resultado aleatório
  }

  // Exemplo de uso do useEffect para exibir o resultado atual em um alert
  useEffect(() => {
    if (resultado) {
      alert(`Resultado atual: ${resultado}`);
    }
  }, [resultado]);

  return (
    <div id='app' className='flex flex-col min-h-screen min-w-screen flex items-center justify-center'>
      <div id='container' className='bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center gap-6'>
        <div id='header' className='flex flex-col items-center justify-center gap-4'>
          <header className='flex flex-col gap-4 items-center justify-center rounded-b-lg'>
            <h1 className='text-2xl font-bold'>Air Sense</h1>
            <p className='text-lg text-gray-600 ml-2'>...seu controlador de qualidade do ar.</p>
          </header>
          <input
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            type='text'
            placeholder='Buscar por cidade...'
            className='w-full p-2 border border-gray-300 rounded mt-4 mb-4'
          />
          <input
            value={teste}
            onChange={(e) => setTeste(e.target.value)}
            type='text'
            placeholder='Teste de input...'
            className='w-full p-2 border border-gray-300 rounded mb-4'
          />
          <button 
            onClick={buscar}
            className='bg-gradient-to-r from-green-600 to-blue-800 text-white px-4 py-2 max-w-md transform transition-all duration-300 hover:scale-103'>
            Buscar
          </button>
        </div>
        {resultado && (
          <div id='resultado' className='flex flex-col items-center justify-center gap-4'>
            <h2 className='text-xl text-violet-00 font-bold mb-4'>Qualidade atual do ar em {cidade}: {resultado}</h2>
            <p className='text-lg text-gray-600 mb-4'>Poluentes atuais: NO2, O3...</p>
            <p className='text-lg text-gray-600 mb-4'>Nível de qualidade do ar: Excelente, razoável, ruim...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
