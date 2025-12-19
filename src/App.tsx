import { useState } from 'react'
import './App.css'

// 1. Função Utilitária para determinar o nível de qualidade do ar (AQI)
/**
 * Determina o nível de qualidade com base no valor do AQI (Índice de Qualidade do Ar).
 * @param aqi O valor do Índice de Qualidade do Ar.
 * @returns Uma string indicando o nível de qualidade ('Bom', 'Moderado', 'Ruim', 'Muito Insalubre').
 */
function obterNivelQualidade(aqi: number): string {
  if (aqi <= 40) {
    return "Bom";
  } else if (aqi <= 80) {
    return "Moderado";
  } else if (aqi <= 120) {
    return "Ruim";
  } else {
    return "Muito Insalubre";
  }
}

// 2. Objeto com explicações sobre os poluentes e seus impactos na saúde
const explicacoesPoluentes: { [key: string]: string } = {
  'CO': 'O Monóxido de Carbono é um gás incolor e inodoro que, em altas concentrações, pode reduzir a capacidade do sangue de transportar oxigênio, afetando o coração e o cérebro.',
  'PM25': 'O Material Particulado Fino (com diâmetro menor que 2.5 micrômetros) é um dos poluentes mais perigosos. Devido ao seu tamanho minúsculo, ele pode penetrar profundamente nos pulmões e até na corrente sanguínea, causando doenças cardíacas e respiratórias graves.',
  'PM10': 'Material Particulado (com diâmetro menor que 10 micrômetros) pode penetrar nos pulmões, causando problemas respiratórios e cardiovasculares. O PM10 é geralmente poeira, pólen e mofo.',
  'SO2': 'O Dióxido de Enxofre é um gás que pode causar irritação nas vias respiratórias, agravando a asma e a bronquite. É um grande contribuinte para a chuva ácida.',
  'NO2': 'O Dióxido de Nitrogênio pode inflamar o revestimento dos pulmões, o que é especialmente preocupante para crianças e pessoas com asma, levando a problemas respiratórios.',
  'O3': 'O Ozônio (aqui o ozônio troposférico ou "mau" ozônio) é um poluente que pode irritar o sistema respiratório, causando tosse, dores no peito e danos pulmonares.'
};

// 3. Componente DadosQualidadeAr para exibir os dados de um poluente específico
interface DadosPoluenteProps {
    nome: 'CO' | 'PM10' | 'SO2' | 'NO2' | 'O3' | 'PM25'; 
    dados: { concentration: number; aqi: number } | null;
}

function DadosQualidadeAr({ nome, dados }: DadosPoluenteProps) {
    if (!dados) return null; // Não renderiza se os dados estiverem vazios

    const nivel = obterNivelQualidade(dados.aqi);
    const explicacao = explicacoesPoluentes[nome];

    let classeCor = 'text-gray-700';
    if (nivel === 'Bom') {
        classeCor = 'text-green-600 font-semibold';
    } else if (nivel === 'Moderado') {
        classeCor = 'text-yellow-600 font-semibold';
    } else if (nivel === 'Ruim') {
        classeCor = 'text-orange-600 font-semibold';
    } else if (nivel === 'Muito Insalubre') {
        classeCor = 'text-red-700 font-semibold';
    }
    
    return (
        <div className='mb-4 p-3 border-b border-gray-200'>
            <p className='text-lg mb-1'>
                <span className='font-bold'>{nome}:</span> {dados.concentration.toFixed(2)} µg/m³ (AQI: {dados.aqi})
                <span className={`ml-2 ${classeCor}`}>— {nivel}</span>
            </p>
            <blockquote className='text-sm text-gray-500 mt-1 italic'>
                {explicacao}
            </blockquote>
        </div>
    );
}


function App() {
  // Variáveis de estado 
  const [nomeCidade, setNomeCidade] = useState('');
  const [aqiGeral, setAqiGeral] = useState<number | null>(null);
  
  // Estados para os poluentes
  const [co, setCo] = useState<{ concentration: number; aqi: number } | null>(null);
  const [pm25, setPm25] = useState<{ concentration: number; aqi: number } | null>(null); 
  const [pm10, setPm10] = useState<{ concentration: number; aqi: number } | null>(null);
  const [so2, setSo2] = useState<{ concentration: number; aqi: number } | null>(null);
  const [no2, setNo2] = useState<{ concentration: number; aqi: number } | null>(null);
  const [o3, setO3] = useState<{ concentration: number; aqi: number } | null>(null);

  // Função para buscar dados
  async function buscarDados() {
    try {
      const resp = await fetch(`https://api.api-ninjas.com/v1/airquality?city=${nomeCidade}`, {
        headers: {
          "X-Api-Key": "C7zOlyrc9d7EtcG/74ixmA==7RikrryzkgEb0FBT"
        }
      });
      const resultadoJson = await resp.json();

      if (resultadoJson['error']) {
         alert(`Erro ao buscar dados: ${resultadoJson['error']}`);
         setAqiGeral(null); 
         return; 
      }
      
      setAqiGeral(resultadoJson['overall_aqi']);
      setCo(resultadoJson['CO']);
      setPm25(resultadoJson['PM2.5']); 
      setPm10(resultadoJson['PM10']);
      setSo2(resultadoJson['SO2']);
      setNo2(resultadoJson['NO2']);
      setO3(resultadoJson['O3']);

    } catch (error) {
      console.error('Erro ao buscar dados da qualidade do ar:', error);
      alert('Ocorreu um erro de rede ou de servidor.');
    }
  }

  // Verificar se todos os dados essenciais foram carregados
  const dadosCarregados = aqiGeral !== null && co !== null && pm25 !== null && pm10 !== null && so2 !== null && no2 !== null && o3 !== null;

  return (
    <div id='aplicacao' className='flex flex-col min-h-screen min-w-screen items-center justify-center'>
        {/* Note que a classe 'bg-gray-50' foi removida aqui para mostrar o gradiente! */}
      <div id='container' className='bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center gap-6'>
        
        {/* Cabeçalho e Busca */}
        <div id='cabecalho' className='flex flex-col items-center justify-center gap-4 w-full'>
          <header className='flex flex-col gap-2 items-center justify-center'>
            {/* O h1 agora usa a cor definida no CSS global (#3fb4a5) */}
            <h1 className='text-3xl font-extrabold'>Air Sense</h1> 
            <p className='text-md text-gray-500'>seu controlador de qualidade do ar.</p>
          </header>
          <input
            value={nomeCidade}
            onChange={(e) => setNomeCidade(e.target.value)}
            type='text'
            placeholder='Buscar por cidade...'
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150'
          />
          <button 
            onClick={buscarDados}
            className='w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-md transform transition-all duration-300 hover:scale-103 hover:from-green-600 hover:to-blue-700'>
            Buscar Qualidade do Ar
          </button>
        </div>
        
        {/* Bloco de Resultados */}
        {dadosCarregados && (
          <div id='resultado' className='flex flex-col items-center justify-center gap-2 mt-4 w-full border-t pt-4'>
            {/* O h2 agora usa a cor definida no CSS global (#3fb4a5) */}
            <h2 className='text-xl font-bold mb-3'> 
                Qualidade do ar atual em <span className='uppercase'>{nomeCidade}</span>
            </h2>
            <div className='w-full text-left'>
                <p className='text-lg font-semibold mb-3'>
                    AQI Geral: <span className={`font-extrabold ${obterNivelQualidade(aqiGeral!) === 'Bom' ? 'text-green-600' : obterNivelQualidade(aqiGeral!) === 'Moderado' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {aqiGeral}
                    </span> ({obterNivelQualidade(aqiGeral!)})
                </p>

                {/* Utilizando o novo componente para cada poluente */}
                <DadosQualidadeAr nome='CO' dados={co} />
                <DadosQualidadeAr nome='PM25' dados={pm25} />
                <DadosQualidadeAr nome='PM10' dados={pm10} />
                <DadosQualidadeAr nome='SO2' dados={so2} />
                <DadosQualidadeAr nome='NO2' dados={no2} />
                <DadosQualidadeAr nome='O3' dados={o3} />
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default App