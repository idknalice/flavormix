// src/app/tapioca/page.tsx
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const assets = {
  fecula: "/fecula.png",
  queijo: "/fatiaqueijo.jpg", 
  frigideira: "/frigideira.png",
  tapiocaBase: "/tapioca.png",
  tapiocaVirada: "/vira.png",
  tapiocaQueijo: "/taqueijo.png",
  tapiocaDobrada: "/dobra.png",
  bgMadeira: "/madeira.png",
  fogao: "/fogao.png",
};

export default function JogoTapioca() {
  const router = useRouter();
  const [screen, setScreen] = useState<"game" | "wit">("game");
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(1);
  const [usedIngredients, setUsedIngredients] = useState<string[]>([]);
  const [showFlipButton, setShowFlipButton] = useState(false);
  const [showFoldButton, setShowFoldButton] = useState(false);

  const correctOrder = ["fecula", "virar", "queijo", "dobrar"];

  // MODIFIQUEI: Redireciona para /telainicial igual aos outros jogos
  const goToHomeScreen = () => {
    router.push("/telainicial");
  };

  const handleIngredientPress = (item: string) => {
    if (correctOrder[step] === item) {
      setUsedIngredients([...usedIngredients, item]);
      
      setFade(0);
      
      setTimeout(() => {
        if (item === "fecula") {
          setCurrentStep("tapiocaBase");
          setTimeout(() => {
            setShowFlipButton(true);
          }, 500);
        } else if (item === "queijo") {
          setCurrentStep("tapiocaQueijo");
          setTimeout(() => {
            setShowFoldButton(true);
          }, 500);
        }
        
        setStep(step + 1);
        setFade(1);
      }, 300);
    }
  };

  const handleFlipPress = () => {
    setFade(0);
    
    setTimeout(() => {
      setCurrentStep("tapiocaVirada");
      setShowFlipButton(false);
      setStep(step + 1);
      setFade(1);
    }, 300);
  };

  const handleFoldPress = () => {
    setFade(0);
    
    setTimeout(() => {
      setCurrentStep("tapiocaDobrada");
      setShowFoldButton(false);
      setStep(step + 1);
      
      setTimeout(() => {
        setScreen("wit");
      }, 1000);
      
      setFade(1);
    }, 300);
  };

  const allIngredientsUsed = usedIngredients.length === correctOrder.length;

  // Tela do jogo
  if (screen === "game") {
    return (
      <div 
        className="min-h-screen flex flex-col relative overflow-hidden"
        style={{ 
          backgroundImage: `url(${assets.bgMadeira})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative w-full max-w-xl h-[600px] flex justify-center items-center">
            <Image 
              src={assets.fogao} 
              alt="Fogão" 
              width={550}
              height={450}
              className="absolute w-full max-w-lg h-auto mt-6"
              priority
            />
            
            <div className="absolute w-[360px] h-[500px] flex items-center justify-center mt-12">
              <Image 
                src={assets.frigideira} 
                alt="Frigideira"
                width={360}
                height={500}
                className="absolute w-[380px] h-[520px]"
                priority
              />
              
              <div 
                className="absolute w-full h-full flex justify-center items-center -mt-16"
                style={{ opacity: fade, transition: 'opacity 0.3s' }}
              >
                {currentStep === "tapiocaBase" && (
                  <Image 
                    src={assets.tapiocaBase} 
                    alt="Tapioca base" 
                    width={280}
                    height={280}
                    className="w-64 h-64 object-contain"
                  />
                )}
                {currentStep === "tapiocaVirada" && (
                  <Image 
                    src={assets.tapiocaVirada} 
                    alt="Tapioca virada" 
                    width={280}
                    height={280}
                    className="w-64 h-64 object-contain"
                  />
                )}
                {currentStep === "tapiocaQueijo" && (
                  <Image 
                    src={assets.tapiocaQueijo} 
                    alt="Tapioca com queijo" 
                    width={280}
                    height={280}
                    className="w-64 h-64 object-contain"
                  />
                )}
                {currentStep === "tapiocaDobrada" && (
                  <Image 
                    src={assets.tapiocaDobrada} 
                    alt="Tapioca dobrada" 
                    width={350}
                    height={200}
                    className="w-80 h-44 object-contain"
                  />
                )}
              </div>
            </div>

            {showFlipButton && (
              <div 
                className="absolute bottom-28"
                style={{ opacity: fade, transition: 'opacity 0.3s' }}
              >
                <button 
                  className="bg-[#8B4513] py-3 px-6 rounded-xl border-3 border-[#D2691E] shadow text-white font-semibold text-lg hover:scale-105 transition-transform"
                  onClick={handleFlipPress}
                >
                  Virar Tapioca
                </button>
              </div>
            )}

            {showFoldButton && (
              <div 
                className="absolute bottom-28"
                style={{ opacity: fade, transition: 'opacity 0.3s' }}
              >
                <button 
                  className="bg-[#8B4513] py-3 px-6 rounded-xl border-3 border-[#D2691E] shadow text-white font-semibold text-lg hover:scale-105 transition-transform"
                  onClick={handleFoldPress}
                >
                  Dobrar Tapioca
                </button>
              </div>
            )}
          </div>
        </div>

        {!allIngredientsUsed && (
          <div className="flex justify-around items-center p-4 bg-[#8B4513] bg-opacity-90 mx-4 mb-4 rounded-xl border-3 border-[#8B4513] min-h-32">
            {!usedIngredients.includes("fecula") && (
              <button 
                className="flex flex-col items-center p-3 hover:scale-110 transition-transform"
                onClick={() => handleIngredientPress("fecula")}
              >
                <div className="flex flex-col items-center bg-white bg-opacity-90 p-4 rounded-xl border-2 border-[#D2691E] min-w-28">
                  <Image 
                    src={assets.fecula} 
                    alt="Fécula" 
                    width={60}
                    height={60}
                    className="mb-1"
                  />
                  <span className="text-[#8B4513] text-sm font-semibold">Fécula</span>
                </div>
              </button>
            )}

            {!usedIngredients.includes("queijo") && (
              <button 
                className={`flex flex-col items-center p-3 transition-transform ${
                  step >= 2 ? 'hover:scale-110' : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => step >= 2 && handleIngredientPress("queijo")}
                disabled={step < 2}
              >
                <div className="flex flex-col items-center bg-white bg-opacity-90 p-4 rounded-xl border-2 border-[#D2691E] min-w-28">
                  <Image 
                    src={assets.queijo} 
                    alt="Queijo" 
                    width={60}
                    height={60}
                    className="mb-1"
                  />
                  <span className="text-[#8B4513] text-sm font-semibold">Queijo</span>
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Tela final
  if (screen === "wit") {
    return (
      <div 
        className="min-h-screen flex flex-col"
        style={{ 
          backgroundImage: `url(${assets.bgMadeira})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex-1 flex justify-center items-center p-6 overflow-y-auto">
          <div className="bg-white bg-opacity-95 p-7 rounded-2xl flex flex-col items-center border-3 border-[#D2691E] shadow-xl max-w-3xl w-full">
            <h1 className="text-3xl font-semibold text-[#8B4513] mb-2 text-center">Tapioca</h1>
            <h2 className="text-3xl font-semibold text-[#8B4513] mb-6 text-center">concluída</h2>
            
            <Image 
              src={assets.tapiocaDobrada} 
              alt="Tapioca dobrada" 
              width={380}
              height={380}
              className="w-[380px] h-[380px] object-contain mb-6"
            />
            
            <p className="text-xl font-semibold text-[#8B4513] mb-6 text-center">Tapioca com Queijo Perfeita!</p>
            
            <div className="bg-[#F5F5DC] rounded-lg p-5 mt-4 w-full max-w-md border-2 border-[#D2691E] shadow-sm">
              <h3 className="text-xl font-bold text-[#8B4513] mb-3 text-center border-b border-[#D2691E] pb-2">
                Tabela Nutricional
              </h3>
              
              <table className="w-full border-collapse text-base">
                <thead>
                  <tr>
                    <th className="p-2 text-lg font-bold text-[#8B4513] text-center bg-[#D2691E]/10" colSpan={2}>
                      Informação Nutricional
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#D2691E]">
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-left">Calorias (valor energético)</td>
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-right">516,64 kcal</td>
                  </tr>
                  <tr className="border-b border-[#D2691E]">
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-left">Carboidratos líquidos</td>
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-right">69,40 g</td>
                  </tr>
                  <tr className="border-b border-[#D2691E]">
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-left">Proteínas</td>
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-right">9,10 g</td>
                  </tr>
                  <tr className="border-b border-[#D2691E]">
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-left">Gorduras totais</td>
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-right">22,73 g</td>
                  </tr>
                  <tr className="border-b border-[#D2691E]">
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-left">Gorduras saturadas</td>
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-right">18,89 g</td>
                  </tr>
                  <tr className="border-b border-[#D2691E]">
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-left">Fibra alimentar</td>
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-right">5,24 g</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-left">Sódio</td>
                    <td className="p-2 text-sm font-semibold text-[#8B4513] text-right">326,76 mg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-5 bg-[#8B4513] bg-opacity-90 mx-4 mb-4 rounded-xl border-3 border-[#8B4513] gap-3">
          <button 
            className="flex-1 py-3 bg-white rounded-lg border-2 border-[#D2691E] hover:scale-105 transition-transform font-semibold text-[#8B4513] text-sm"
            onClick={() => {
              setCurrentStep(null);
              setStep(0);
              setUsedIngredients([]);
              setShowFlipButton(false);
              setShowFoldButton(false);
              setFade(1);
              setScreen("game");
            }}
          >
            Jogar de novo
          </button>
          
          <div className="w-3"></div>
          
          <button 
            className="flex-1 py-3 bg-[#D2691E] bg-opacity-80 rounded-lg border-2 border-[#D2691E] hover:scale-105 transition-transform font-semibold text-white text-sm"
            onClick={goToHomeScreen}
          >
            Voltar a tela inicial
          </button>
        </div>
      </div>
    );
  }
}