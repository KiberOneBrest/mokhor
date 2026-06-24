import FloatingLines from '../components/FloatingLines';
import Form from '../components/Form';

export default function Home() {
  return (
    <main style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Фон с анимированными линиями – растягивается на всю высоту */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          lineCount={8}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax={true}
          animationSpeed={1}
          gradientStart="#e945f5"
          gradientMid="#6f6f6f"
          gradientEnd="#6a6a6a"
        />
      </div>

      {/* Контент поверх фона – flex-контейнер с вертикальным центрированием */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem 1rem', // отступы для мобильных
        boxSizing: 'border-box',
        textAlign: 'center',
        color: 'white',
        gap: '2rem', // расстояние между текстом и формой
      }}>
        {/* Заголовок с адаптивным размером */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 10vw, 4rem)',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(0,0,0,0.5)',
          margin: 0,
          pointerEvents: 'none', // чтобы не мешать взаимодействию с линиями
        }}>
          Меллстрой
        </h1>

        {/* Форма */}
        <Form />
      </div>
    </main>
  );
}