import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  setNome('Air Sense')
  return (
    <>
      <div>
        <h1>Olá ${nome}!</h1>
      </div>
    </>
  )
}

export default App
