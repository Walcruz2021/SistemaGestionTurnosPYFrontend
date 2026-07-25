import VoiceAssistant from "./VoiceAssistant.tsx";

import {
  useConversationControls,
  useConversationStatus,
  useConversationMode,
} from "@elevenlabs/react";

interface DemoAsistenteProps {
  idCompany: string;
}

export default function DemoAsistente({
  idCompany,
}: DemoAsistenteProps) {
  // Los hooks deben estar aquí, en el nivel superior
  const { startSession, endSession } =
    useConversationControls();

  const { status } = useConversationStatus();

  const { isSpeaking } = useConversationMode();

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  const startConversation = async () => {
    try {
      const agentId =
        process.env.REACT_APP_ELEVENLABS_AGENT_ID;

      if (!agentId) {
        throw new Error(
          "No se configuró REACT_APP_ELEVENLABS_AGENT_ID",
        );
      }

      if (!idCompany) {
        throw new Error(
          "No se encontró el idCompany",
        );
      }

      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      await startSession({
        agentId,
        dynamicVariables: {
          idCompany,
        },
      });
    } catch (error) {
      console.error(
        "Error al iniciar ElevenLabs:",
        error,
      );
    }
  };

  const stopConversation = async () => {
    try {
      await endSession();
    } catch (error) {
      console.error(
        "No se pudo finalizar la conversación:",
        error,
      );
    }
  };

  const assistantStatus = isConnecting
    ? "Conectando"
    : isConnected
      ? isSpeaking
        ? "Hablando"
        : "Escuchando"
      : "Inactivo";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center">
        <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-1">
          Vista previa
        </p>

        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Asistente de Voz
        </h1>
      </div>

      <VoiceAssistant
        status={assistantStatus}
        isConnected={isConnected}
        isConnecting={isConnecting}
        isSpeaking={isSpeaking}
        startConversation={startConversation}
        stopConversation={stopConversation}
      />
    </div>
  );
}