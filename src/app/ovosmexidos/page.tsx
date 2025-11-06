'use client';
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const assets = {
  fecula: "/fecula.png",
  queijo: "/queijo.png",
  frigideira: "/frigideira.png",
  tapiocaPronta: "/tapioca.png",
  tapiocaBase: "/tapioca.png", // mesma imagem para base
  tapiocaVirando: "/tapioca.png", // mesma imagem com efeito visual
  tapiocaComQueijo: "/tapioca.png", // mesma imagem com queijo
  tapiocaDobrada: "/tapioca.png", // mesma imagem dobrada
  bgMadeira: "/madeira.png",
  fogao: "/fogao.png",
  prato: "/prato.png",
};

export default function JogoTapioca() {
  const router = useRouter();
  const [screen, setScreen] = useState<"game" | "result">("game");
  const [currentIngredient, setCurrentIngredient] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [usedIngredients, setUsedIngredients] = useState<string[]>([]);
  const [showReadyButton, setShowReadyButton] = useState(false);
  const [fade, setFade] = useState(1);
  const [tapiocaNoPrato, setTapiocaNoPrato] = useState(false);
  const fadeTimeoutRef = useRef<number | null>(null);

  const correctOrder = ["fecula", "virar", "queijo", "dobrar", "prato"];

  const handleIngredientPress = (item: string) => {
    if (correctOrder[step] === item) {
      setUsedIngredients([...usedIngredients, item]);
      
      // Animação de fade
      setFade(0);
      
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      
      fadeTimeoutRef.current = window.setTimeout(() => {
        switch (item) {
          case "fecula":
            setCurrentIngredient("tapiocaBase");
            break;
          case "virar":
            setCurrentIngredient("tapiocaVirando");
            break;
          case "queijo":
            setCurrentIngredient("tapiocaComQueijo");
            break;
          case "dobrar":
            setCurrentIngredient("tapiocaDobrada");
            break;
          case "prato":
            setTapiocaNoPrato(true);
            setCurrentIngredient(null);
            setTimeout(() => {
              setShowReadyButton(true);
            }, 500);
            break;
          default:
            setCurrentIngredient(item);
        }
        setStep(step + 1);
        setFade(1);
      }, 300);
    }
  };

  const handleReadyPress = () => {
    setScreen("result");
  };

  const resetGame = () => {
    setCurrentIngredient(null);
    setStep(0);
    setUsedIngredients([]);
    setShowReadyButton(false);
    setTapiocaNoPrato(false);
    setFade(1);
    setScreen("game");
  };

  const goToHomeScreen = () => {
    router.push("/telainicial");
  };

  const allIngredientsUsed = usedIngredients.length === correctOrder.length;

  // Tela do jogo
  if (screen === "game") {
    return (
      <div className="min-h-screen bg-cover bg-center flex flex-col relative overflow-hidden"
        style={{ backgroundImage: "url('/madeira.png')" }}>
        
        {/* Área de cozimento */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative w-full max-w-2xl h-96 flex justify-center items-center">
            {/* Fogão */}
            <Image 
              src={assets.fogao} 
              alt="Fogão" 
              width={600}
              height={500}
              className="absolute w-full max-w-xl h-auto"
              priority
            />
            
            {/* Container da frigideira */}
            <div className="absolute w-64 h-64 flex items-center justify-center">
              {/* Frigideira */}
              <Image 
                src={assets.frigideira} 
                alt="Frigideira"
                width={280}
                height={240}
                className="absolute w-80 h-72"
                priority
              />
              
              {/* Ingredientes na frigideira */}
              <div className="absolute w-full h-full flex justify-center items-center -mt-16">
                <div className="flex justify-center items-center w-full h-full transition-opacity duration-300"
                  style={{ opacity: fade }}>
                  {currentIngredient === "tapiocaBase" && (
                    <Image 
                      src={assets.tapiocaBase} 
                      alt="Tapioca na frigideira" 
                      width={120}
                      height={120}
                      className="w-32 h-32 object-contain"
                    />
                  )}
                  {currentIngredient === "tapiocaVirando" && (
                    <div className="relative">
                      <Image 
                        src={assets.tapiocaVirando} 
                        alt="Virando tapioca" 
                        width={120}
                        height={120}
                        className="w-32 h-32 object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        🔄
                      </div>
                    </div>
                  )}
                  {currentIngredient === "tapiocaComQueijo" && (
                    <div className="relative">
                      <Image 
                        src={assets.tapiocaComQueijo} 
                        alt="Tapioca com queijo" 
                        width={120}
                        height={120}
                        className="w-32 h-32 object-contain"
                      />
                      <Image 
                        src={assets.queijo} 
                        alt="Queijo" 
                        width={60}
                        height={60}
                        className="absolute w-16 h-16 object-contain top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      />
                    </div>
                  )}
                  {currentIngredient === "tapiocaDobrada" && (
                    <div className="relative">
                      <Image 
                        src={assets.tapiocaDobrada} 
                        alt="Tapioca dobrada" 
                        width={120}
                        height={120}
                        className="w-32 h-32 object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-3xl">
                        📄
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bancada com prato */}
            <div className="absolute bottom-4 w-full flex justify-center">
              <div className="relative">
                {/* Bancada simulada */}
                <div className="w-80 h-20 bg-[#D2691E] rounded-lg border-4 border-[#8B4513] opacity-80"></div>
                
                {/* Prato */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <Image 
                    src={assets.prato} 
                    alt="Prato"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                  
                  {/* Tapioca no prato */}
                  {tapiocaNoPrato && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
                      style={{ opacity: fade }}>
                      <Image 
                        src={assets.tapiocaPronta} 
                        alt="Tapioca pronta"
                        width={60}
                        height={60}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botão Pronto */}
            {showReadyButton && (
              <div className="absolute bottom-24 transition-opacity duration-300"
                style={{ opacity: fade }}>
                <button 
                  className="bg-[#8B4513] py-3 px-8 rounded-2xl border-4 border-[#D2691E] shadow-lg hover:scale-105 transition-transform text-white font-bold text-lg"
                  onClick={handleReadyPress}>
                  Pronto
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Barra de ingredientes */}
        {!allIngredientsUsed && (
          <div className="flex justify-around items-center p-4 bg-[#8B4513] bg-opacity-90 mx-4 mb-4 rounded-xl border-4 border-[#8B4513] min-h-24">
            {!usedIngredients.includes("fecula") && (
              <button 
                className="flex flex-col items-center p-3 hover:scale-110 transition-transform"
                onClick={() => handleIngredientPress("fecula")}>
                <div className="flex flex-col items-center bg-white bg-opacity-90 p-3 rounded-xl border-2 border-[#D2691E] min-w-24">
                  <Image 
                    src={assets.fecula} 
                    alt="Fécula" 
                    width={40}
                    height={40}
                    className="mb-2"
                  />
                  <span className="text-[#8B4513] text-sm font-semibold">Fécula</span>
                </div>
              </button>
            )}

            {!usedIngredients.includes("virar") && usedIngredients.includes("fecula") && (
              <button 
                className="flex flex-col items-center p-3 hover:scale-110 transition-transform"
                onClick={() => handleIngredientPress("virar")}>
                <div className="flex flex-col items-center bg-white bg-opacity-90 p-3 rounded-xl border-2 border-[#D2691E] min-w-24">
                  <div className="text-2xl mb-2">🔄</div>
                  <span className="text-[#8B4513] text-sm font-semibold">Virar</span>
                </div>
              </button>
            )}

            {!usedIngredients.includes("queijo") && usedIngredients.includes("virar") && (
              <button 
                className="flex flex-col items-center p-3 hover:scale-110 transition-transform"
                onClick={() => handleIngredientPress("queijo")}>
                <div className="flex flex-col items-center bg-white bg-opacity-90 p-3 rounded-xl border-2 border-[#D2691E] min-w-24">
                  <Image 
                    src={assets.queijo} 
                    alt="Queijo" 
                    width={40}
                    height={30}
                    className="mb-2"
                  />
                  <span className="text-[#8B4513] text-sm font-semibold">Queijo</span>
                </div>
              </button>
            )}

            {!usedIngredients.includes("dobrar") && usedIngredients.includes("queijo") && (
              <button 
                className="flex flex-col items-center p-3 hover:scale-110 transition-transform"
                onClick={() => handleIngredientPress("dobrar")}>
                <div className="flex flex-col items-center bg-white bg-opacity-90 p-3 rounded-xl border-2 border-[#D2691E] min-w-24">
                  <div className="text-2xl mb-2">📄</div>
                  <span className="text-[#8B4513] text-sm font-semibold">Dobrar</span>
                </div>
              </button>
            )}

            {!usedIngredients.includes("prato") && usedIngredients.includes("dobrar") && (
              <button 
                className="flex flex-col items-center p-3 hover:scale-110 transition-transform"
                onClick={() => handleIngredientPress("prato")}>
                <div className="flex flex-col items-center bg-white bg-opacity-90 p-3 rounded-xl border-2 border-[#D2691E] min-w-24">
                  <Image 
                    src={assets.prato} 
                    alt="Prato" 
                    width={40}
                    height={40}
                    className="mb-2"
                  />
                  <span className="text-[#8B4513] text-sm font-semibold">Servir</span>
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Tela de resultado
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/madeira.png')" }}>
      
      {/* Conteúdo central */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="bg-white bg-opacity-95 p-8 rounded-3xl flex flex-col items-center border-4 border-[#D2691E] shadow-2xl">
          <h1 className="text-4xl font-bold text-[#8B4513] mb-2">Receita</h1>
          <h2 className="text-4xl font-bold text-[#8B4513] mb-8">concluída</h2>
          
          <Image 
            src={assets.tapiocaPronta} 
            alt="Tapioca pronta" 
            width={300}
            height={300}
            className="w-64 h-64 object-contain"
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between p-6 bg-[#8B4513] bg-opacity-90 mx-4 mb-4 rounded-xl border-4 border-[#8B4513] gap-4">
        <button 
          className="flex-1 py-4 bg-white rounded-xl border-3 border-[#D2691E] hover:scale-105 transition-transform font-bold text-[#8B4513] text-lg"
          onClick={resetGame}>
          Jogar de novo
        </button>
        
        <button 
          className="flex-1 py-4 bg-[#D2691E] rounded-xl border-3 border-[#D2691E] hover:scale-105 transition-transform font-bold text-white text-lg"
          onClick={goToHomeScreen}>
          Voltar ao início
        </button>
      </div>
    </div>
  );
}