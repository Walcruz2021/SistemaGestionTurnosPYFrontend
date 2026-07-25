import {
  useConversationControls,
  useConversationStatus,
  useConversationMode,
} from "@elevenlabs/react";

interface ElevenLabsChatProps {
  idCompany: string;
}
const agentId = process.env.REACT_APP_ELEVENLABS_AGENT_ID;




export const ElevenLabsChat = ({
  idCompany,
}: ElevenLabsChatProps) => {
  const { startSession, endSession } =
    useConversationControls();

  const { status } = useConversationStatus();
  const { isSpeaking } = useConversationMode();

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
      throw new Error("No se encontró el idCompany");
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

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

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

      <p>Estado: {status}</p>

      {isConnected && (
        <p>
          {isSpeaking
            ? "El asistente está hablando"
            : "El asistente está escuchando"}
        </p>
      )}

      {!isConnected ? (
        <button
          type="button"
          onClick={startConversation}
          disabled={isConnecting}
        >
          {isConnecting
            ? "Conectando..."
            : "Iniciar asistente"}
        </button>
      ) : (
        <button
          type="button"
          onClick={stopConversation}
        >
          Finalizar conversación
        </button>
      )}
    </div>
  );
};