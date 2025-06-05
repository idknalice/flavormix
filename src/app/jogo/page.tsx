import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>🍽️ Bem-vindo ao FlavorMix!</h1>
      <Link href="/jogo">
        <button style={{ marginTop: 20 }}>Começar o Experimento</button>
      </Link>
    </div>
  );
}