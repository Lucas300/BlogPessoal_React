import { useEffect, useState } from "react";

interface ProgressBarMensagemProps {
  mensagem: string;
  tempo?: number; // em ms
  onClose?: () => void;
}

export default function ProgressBarMensagem({ mensagem, tempo = 3000, onClose }: ProgressBarMensagemProps) {
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisivel(false);
      if (onClose) onClose();
    }, tempo);
    return () => clearTimeout(timer);
  }, [tempo, onClose]);

  if (!visivel) return null;

  return (
    <div
      className="flex items-center justify-center w-full mt-10"
      style={{ minHeight: "56px" }}
    >
      <div className="relative flex items-center gap-4 max-w-xl w-full bg-yellow-50 border border-yellow-300 px-4 py-4 rounded-lg shadow-md">
        {/* Ícone SVG de alerta */}
        <div className="flex-shrink-0">
          <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
          </svg>
        </div>
        <div className="flex-1 text-sm md:text-base text-yellow-900">
          {mensagem.split('\n').map((linha, index) => (
            <div key={index}>{linha}</div>
          ))}
          <span className="font-bold text-yellow-800">Obrigado pela sua paciência e aproveite a experiência!</span>
        </div>
        {/* Barra de progresso */}
        <div
          className="absolute left-0 bottom-0 h-[3px] bg-yellow-400 rounded-b"
          style={{
            width: "100%",
            animation: `progressBarAnim ${tempo}ms linear forwards`
          }}
        />
        <style>
          {`
            @keyframes progressBarAnim {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}
        </style>
      </div>
    </div>
  );
}