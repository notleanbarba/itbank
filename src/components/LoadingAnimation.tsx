"use client";
import { useEffect, useState } from "react";

export default function LoadingAnimation() {
  const [visible, setVisible] = useState(false);

  // Controla la visibilidad con una transición suave
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 100); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out', 
        zIndex: 9999, 
      }}
    >

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '60px',
        }}
      >
        <div
          style={{
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#fff', 
            animation: 'bounce 1.5s infinite ease-in-out',
            animationDelay: '0s',
          }}
        ></div>
        <div
          style={{
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            animation: 'bounce 1.5s infinite ease-in-out',
            animationDelay: '0.3s',
          }}
        ></div>
        <div
          style={{
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            animation: 'bounce 1.5s infinite ease-in-out',
            animationDelay: '0.6s',
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: scale(0.0); // Los puntos desaparecen
          } 
          50% {
            transform: scale(1.0); // Los puntos crecen a tamaño normal
          }
        }
      `}</style>
    </div>
  );
}
