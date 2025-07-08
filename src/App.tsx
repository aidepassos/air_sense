import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState(''); // Estado inicial vazio ou nulo

  useEffect(() => {
    // Este código é executado APENAS uma vez após a renderização inicial
    // por causa do array de dependências vazio `[]`.
    setNome('Air Sense');
  }, []); // <--- Array de dependências vazio!
  
  return (
    <>
      <div>
        <h1>Olá {nome}!</h1>
      </div>
    </>
  )
}

export default App
