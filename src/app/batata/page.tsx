// app/page.tsx
'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ADICIONEI
import Image from "next/image";

export default function Home() {
  const router = useRouter(); // ADICIONEI
  const [screen, setScreen] = useState<"game" | "wit">("game");
  const [currentIngredient, setCurrentIngredient] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [fadeAnim, setFadeAnim] = useState(1);
  const [usedIngredients, setUsedIngredients] = useState<string[]>([]);
  const [showReadyButton, setShowReadyButton] = useState(false);
  const [currentTool, setCurrentTool] = useState("frigideira");
  const [showFogao, setShowFogao] = useState(true);
  const [showEscorredor, setShowEscorredor] = useState(false);
  const [showPrato, setShowPrato] = useState(false);

  const correctOrder = ["oleo", "batataCrua", "fritar", "escorrer", "prato", "sal"];

  // MODIFIQUEI: Agora redireciona para a tela inicial do site
  const goToHomeScreen = () => {
    router.push("/telainicial"); // Redireciona para a página inicial do seu site
  };

  const handleAnimation = (callback: () => void) => {
    setFadeAnim(0);
    setTimeout(() => {
      callback();
      setFadeAnim(1);
    }, 300);
  };

  const handleIngredientPress = (item: string) => {
    if (correctOrder[step] === item) {
      const newUsedIngredients = [...usedIngredients, item];
      setUsedIngredients(newUsedIngredients);
      
      handleAnimation(() => {
        if (item === "oleo") {
          setCurrentIngredient("manchaOleo");
        } else {
          setCurrentIngredient(item);
        }
        
        if (item === "sal") {
          setCurrentIngredient("batataPronta");
          setShowPrato(false);
          setTimeout(() => {
            setShowReadyButton(true);
          }, 500);
        }
        
        setStep(step + 1);
      });
    }
  };

  const handleActionPress = (action: string) => {
    if (correctOrder[step] === action) {
      const newUsedIngredients = [...usedIngredients, action];
      setUsedIngredients(newUsedIngredients);
      
      handleAnimation(() => {
        if (action === "fritar") {
          setCurrentIngredient("batataFritando");
          setCurrentTool("frigideira");
          setShowEscorredor(false);
          setShowPrato(false);
        } else if (action === "escorrer") {
          setCurrentIngredient("batataEscorrendo");
          setCurrentTool("escorredor");
          setShowEscorredor(true);
          setShowPrato(false);
          // O fogão some quando vamos escorrer a batata
          setShowFogao(false);
        } else if (action === "prato") {
          setCurrentIngredient("batataNoPrato");
          setCurrentTool("prato");
          setShowEscorredor(false);
          setShowPrato(true);
        }
        
        setStep(step + 1);
      });
    }
  };

  const handleReadyPress = () => {
    setScreen("wit");
  };

  const resetGame = () => {
    setCurrentIngredient(null);
    setStep(0);
    setUsedIngredients([]);
    setShowReadyButton(false);
    setCurrentTool("frigideira");
    setShowFogao(true);
    setShowEscorredor(false);
    setShowPrato(false);
    setFadeAnim(1);
    setScreen("game");
  };

  const allIngredientsUsed = usedIngredients.length === correctOrder.length;

  const styles = {
    safe: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100vh',
      backgroundColor: '#8B4513',
    },
    cookingArea: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative' as const,
      backgroundColor: '#DEB887',
      overflow: 'hidden' as const,
    },
    fogaoContainer: {
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'opacity 0.5s ease',
    },
    fogao: {
      width: '95%',
      height: 'auto',
      maxHeight: '80%',
      objectFit: 'contain' as const,
    },
    toolContainer: {
      position: 'relative' as const,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      height: '80%',
      maxWidth: '400px',
      maxHeight: '400px',
    },
    frigideira: {
      position: 'absolute' as const,
      width: '140%',
      height: '170%',
      objectFit: 'contain' as const,
      zIndex: 1,
    },
    escorredor: {
      position: 'absolute' as const,
      width: '100%',
      height: '120%',
      objectFit: 'contain' as const,
      zIndex: 1,
    },
    prato: {
      position: 'absolute' as const,
      width: '130%',
      height: '130%',
      objectFit: 'contain' as const,
      zIndex: 1,
    },
    ingredientOverlay: {
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      marginTop: '-70px',
      zIndex: 2,
    },
    ingredientOverlayPrato: {
      marginTop: 0,
    },
    ingredientOverlayEscorredor: {
      marginTop: '-10px',
    },
    centeredContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    manchaOleoIngredient: {
      zIndex: 3,
    },
    batataCruaIngredient: {
      zIndex: 3,
    },
    batataFritandoIngredient: {
      zIndex: 3,
    },
    batataEscorrendoIngredient: {
      zIndex: 3,
    },
    batataNoPratoIngredient: {
      zIndex: 3,
    },
    batataProntaIngredient: {
      zIndex: 3,
    },
    readyButtonContainer: {
      position: 'absolute' as const,
      bottom: '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    readyButton: {
      backgroundColor: '#8B4513',
      padding: '15px 40px',
      borderRadius: '25px',
      border: '3px solid #D2691E',
      boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    readyButtonText: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#FFFFFF',
      textAlign: 'center' as const,
    },
    ingredientsBar: {
      display: 'flex',
      flexDirection: 'row' as const,
      justifyContent: 'space-around',
      flexWrap: 'wrap' as const,
      padding: '15px 10px',
      backgroundColor: 'rgba(139, 69, 19, 0.9)',
      margin: '0 10px 10px 10px',
      borderRadius: '15px',
      border: '3px solid #8B4513',
      minHeight: '90px',
    },
    ingredientSlot: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      padding: '8px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    actionSlot: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      padding: '8px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    ingredientContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '8px',
      borderRadius: '10px',
      minWidth: '80px',
      border: '2px solid #D2691E',
    },
    actionContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      backgroundColor: 'rgba(255, 248, 220, 0.9)',
      padding: '8px',
      borderRadius: '10px',
      minWidth: '80px',
      border: '2px solid #DAA520',
    },
    oleoIcon: {
      marginBottom: '4px',
    },
    batataCruaIcon: {
      marginBottom: '4px',
    },
    salIcon: {
      marginBottom: '4px',
    },
    actionImageIcon: {
      marginBottom: '4px',
    },
    ingredientLabel: {
      fontSize: '11px',
      fontWeight: 600,
      color: '#8B4513',
      textAlign: 'center' as const,
    },
    actionLabel: {
      fontSize: '11px',
      fontWeight: 600,
      color: '#DAA520',
      textAlign: 'center' as const,
    },
    resultArea: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#DEB887',
      overflowY: 'auto' as const,
    },
    resultCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '30px',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      border: '3px solid #D2691E',
      boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)',
      maxWidth: '800px',
      width: '100%',
    },
    receitaTitle: {
      fontSize: '36px',
      fontWeight: 600,
      color: '#8B4513',
      marginBottom: '5px',
      marginTop: 0,
      textAlign: 'center' as const,
    },
    concluidaTitle: {
      fontSize: '36px',
      fontWeight: 600,
      color: '#8B4513',
      marginBottom: '20px',
      marginTop: 0,
      textAlign: 'center' as const,
    },
    resultImage: {
      width: '60%',
      maxWidth: '400px',
      height: 'auto',
      marginBottom: '20px',
    },
    resultText: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#8B4513',
      marginTop: '10px',
      marginBottom: '30px',
      textAlign: 'center' as const,
    },
    nutricionalContainer: {
      backgroundColor: '#F5F5DC',
      borderRadius: '15px',
      padding: '25px',
      marginTop: '20px',
      width: '100%',
      maxWidth: '500px',
      border: '2px solid #D2691E',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    nutricionalTitle: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#8B4513',
      marginBottom: '20px',
      textAlign: 'center' as const,
      borderBottom: '2px solid #D2691E',
      paddingBottom: '10px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginTop: '10px',
    },
    tableRow: {
      borderBottom: '1px solid #D2691E',
    },
    tableCellLeft: {
      padding: '12px 15px',
      fontSize: '16px',
      fontWeight: 600,
      color: '#8B4513',
      textAlign: 'left' as const,
      width: '70%',
    },
    tableCellRight: {
      padding: '12px 15px',
      fontSize: '16px',
      fontWeight: 600,
      color: '#8B4513',
      textAlign: 'right' as const,
      width: '30%',
    },
    tableHeader: {
      padding: '15px',
      fontSize: '18px',
      fontWeight: 700,
      color: '#8B4513',
      textAlign: 'center' as const,
      backgroundColor: 'rgba(210, 105, 30, 0.1)',
    },
    buttonsRow: {
      display: 'flex',
      flexDirection: 'row' as const,
      justifyContent: 'space-between',
      padding: '25px 30px',
      backgroundColor: 'rgba(139, 69, 19, 0.9)',
      margin: '0 10px 10px 10px',
      borderRadius: '15px',
      border: '3px solid #8B4513',
    },
    witButton: {
      flex: 1,
      padding: '15px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      border: '2px solid #D2691E',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    secondaryButton: {
      backgroundColor: 'rgba(210, 105, 30, 0.8)',
      color: 'white',
    },
    witButtonText: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#8B4513',
    },
    buttonSpacer: {
      width: '15px',
    },
  };

  if (screen === "game") {
    return (
      <div style={styles.safe}>
        <div style={styles.cookingArea}>
          {showFogao && (
            <div style={{
              ...styles.fogaoContainer,
              opacity: showFogao ? 1 : 0,
            }}>
              <Image 
                src="/fogao.png" 
                alt="Fogão" 
                width={800} 
                height={600}
                style={styles.fogao}
              />
            </div>
          )}
          
          <div style={styles.toolContainer}>
            {currentTool === "frigideira" && (
              <Image 
                src="/panela.png" 
                alt="Frigideira" 
                width={400} 
                height={400}
                style={styles.frigideira}
              />
            )}
            {showEscorredor && (
              <Image 
                src="/escorredor.png" 
                alt="Escorredor" 
                width={300} 
                height={300}
                style={styles.escorredor}
              />
            )}
            {showPrato && (
              <Image 
                src="/prato.png" 
                alt="Prato" 
                width={350} 
                height={350}
                style={styles.prato}
              />
            )}
            
            <div style={{
              ...styles.ingredientOverlay,
              ...(currentTool === "prato" && styles.ingredientOverlayPrato),
              ...(currentTool === "escorredor" && styles.ingredientOverlayEscorredor)
            }}>
              <div 
                style={{
                  ...styles.centeredContent,
                  opacity: fadeAnim,
                  transition: 'opacity 300ms'
                }}
              >
                {currentTool === "frigideira" && (
                  <>
                    {currentIngredient === "manchaOleo" && (
                      <Image 
                        src="/manchaoleo.png" 
                        alt="Mancha de Óleo" 
                        width={120} 
                        height={80}
                        style={styles.manchaOleoIngredient}
                      />
                    )}
                    {currentIngredient === "batataCrua" && (
                      <Image 
                        src="/batatacrua.png" 
                        alt="Batata Crua" 
                        width={180} 
                        height={180}
                        style={styles.batataCruaIngredient}
                      />
                    )}
                    {currentIngredient === "batataFritando" && (
                      <Image 
                        src="/frita.png" 
                        alt="Batata Fritando" 
                        width={200} 
                        height={200}
                        style={styles.batataFritandoIngredient}
                      />
                    )}
                  </>
                )}
                
                {currentTool === "escorredor" && currentIngredient === "batataEscorrendo" && (
                  <Image 
                    src="/escorrendo.png" 
                    alt="Batata Escorrendo" 
                    width={180} 
                    height={180}
                    style={styles.batataEscorrendoIngredient}
                  />
                )}
                
                {currentTool === "prato" && (
                  <>
                    {currentIngredient === "batataNoPrato" && (
                      <Image 
                        src="/bataprato.png" 
                        alt="Batata no Prato" 
                        width={220} 
                        height={220}
                        style={styles.batataNoPratoIngredient}
                      />
                    )}
                    {currentIngredient === "batataPronta" && (
                      <Image 
                        src="/batatapronta.png" 
                        alt="Batata Pronta" 
                        width={220} 
                        height={220}
                        style={styles.batataProntaIngredient}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {showReadyButton && (
            <div 
              style={{
                ...styles.readyButtonContainer,
                opacity: fadeAnim,
                transition: 'opacity 300ms'
              }}
            >
              <button 
                style={styles.readyButton}
                onClick={handleReadyPress}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={styles.readyButtonText}>Pronto</span>
              </button>
            </div>
          )}
        </div>

        {!allIngredientsUsed && (
          <div style={styles.ingredientsBar}>
            {!usedIngredients.includes("oleo") && (
              <button 
                style={styles.ingredientSlot}
                onClick={() => handleIngredientPress("oleo")}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={styles.ingredientContent}>
                  <Image 
                    src="/oleo.png" 
                    alt="Óleo" 
                    width={40} 
                    height={35}
                    style={styles.oleoIcon}
                  />
                  <span style={styles.ingredientLabel}>Óleo</span>
                </div>
              </button>
            )}

            {!usedIngredients.includes("batataCrua") && (
              <button 
                style={styles.ingredientSlot}
                onClick={() => handleIngredientPress("batataCrua")}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={styles.ingredientContent}>
                  <Image 
                    src="/batatacrua.png" 
                    alt="Batata" 
                    width={45} 
                    height={45}
                    style={styles.batataCruaIcon}
                  />
                  <span style={styles.ingredientLabel}>Batata</span>
                </div>
              </button>
            )}

            {usedIngredients.includes("batataCrua") && !usedIngredients.includes("fritar") && (
              <button 
                style={styles.actionSlot}
                onClick={() => handleActionPress("fritar")}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={styles.actionContent}>
                  <Image 
                    src="/panela.png" 
                    alt="Fritar" 
                    width={35} 
                    height={35}
                    style={styles.actionImageIcon}
                  />
                  <span style={styles.actionLabel}>Fritar</span>
                </div>
              </button>
            )}

            {usedIngredients.includes("fritar") && !usedIngredients.includes("escorrer") && (
              <button 
                style={styles.actionSlot}
                onClick={() => handleActionPress("escorrer")}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={styles.actionContent}>
                  <Image 
                    src="/escorredor.png" 
                    alt="Escorrer" 
                    width={35} 
                    height={35}
                    style={styles.actionImageIcon}
                  />
                  <span style={styles.actionLabel}>Escorrer</span>
                </div>
              </button>
            )}

            {usedIngredients.includes("escorrer") && !usedIngredients.includes("prato") && (
              <button 
                style={styles.actionSlot}
                onClick={() => handleActionPress("prato")}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={styles.actionContent}>
                  <Image 
                    src="/prato.png" 
                    alt="Prato" 
                    width={35} 
                    height={35}
                    style={styles.actionImageIcon}
                  />
                  <span style={styles.actionLabel}>Prato</span>
                </div>
              </button>
            )}

            {usedIngredients.includes("prato") && !usedIngredients.includes("sal") && (
              <button 
                style={styles.ingredientSlot}
                onClick={() => handleIngredientPress("sal")}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={styles.ingredientContent}>
                  <Image 
                    src="/sal.png" 
                    alt="Sal" 
                    width={30} 
                    height={30}
                    style={styles.salIcon}
                  />
                  <span style={styles.ingredientLabel}>Sal</span>
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  if (screen === "wit") {
    return (
      <div style={styles.safe}>
        <div style={styles.resultArea}>
          <div style={styles.resultCard}>
            <h1 style={styles.receitaTitle}>Receita</h1>
            <h2 style={styles.concluidaTitle}>concluída</h2>
            
            <Image 
              src="/batatapronta.png"
              alt="Batata Pronta"
              width={400}
              height={400}
              style={styles.resultImage}
            />
            
            <p style={styles.resultText}>Batata Frita Perfeita!</p>
            
            <div style={styles.nutricionalContainer}>
              <h3 style={styles.nutricionalTitle}>Tabela Nutricional</h3>
              
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableRow}>
                    <th style={styles.tableHeader} colSpan={2}>Informação Nutricional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCellLeft}>Calorias (valor energético)</td>
                    <td style={styles.tableCellRight}>173,55 kcal</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCellLeft}>Carboidratos líquidos</td>
                    <td style={styles.tableCellRight}>17,88 g</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCellLeft}>Proteínas</td>
                    <td style={styles.tableCellRight}>3,25 g</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCellLeft}>Gorduras totais</td>
                    <td style={styles.tableCellRight}>8,52 g</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCellLeft}>Gorduras saturadas</td>
                    <td style={styles.tableCellRight}>2,02 g</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCellLeft}>Fibra alimentar</td>
                    <td style={styles.tableCellRight}>5,26 g</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCellLeft}>Sódio</td>
                    <td style={styles.tableCellRight}>0 mg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={styles.buttonsRow}>
          <button 
            style={styles.witButton}
            onClick={resetGame}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={styles.witButtonText}>Jogar de novo</span>
          </button>
          
          <div style={styles.buttonSpacer} />
          
          <button 
            style={{
              ...styles.witButton,
              ...styles.secondaryButton,
            }}
            onClick={goToHomeScreen}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(210, 105, 30, 1)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(210, 105, 30, 0.8)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={{
              ...styles.witButtonText,
              color: 'white'
            }}>Voltar a tela inicial</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}