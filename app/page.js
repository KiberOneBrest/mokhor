import FloatingLines from '../components/FloatingLines';
import Form from '../components/Form';

export default function Home() {
  return (
    <main style={{ position: 'relative', width: '100%', height: '600px' }}>
      {/* Фон с анимированными линиями */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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

      {/* Текст по центру */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(0,0,0,0.5)',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none', // чтобы текст не мешал взаимодействию с линиями
        }}
      >
        Меллстрой
      </div>
        <Form></Form>

    </main>
  );
}