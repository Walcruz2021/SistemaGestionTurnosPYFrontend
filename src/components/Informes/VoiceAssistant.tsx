import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Phone,
  PhoneOff,
  Loader2,
  Mic,
  Volume2,
} from "lucide-react";

interface VoiceAssistantProps {
  status?: string;
  isConnected?: boolean;
  isConnecting?: boolean;
  isSpeaking?: boolean;
  startConversation: () => Promise<void>;
  stopConversation: () => Promise<void>;
}

export default function VoiceAssistant({
  status = "",
  isConnected = false,
  isConnecting = false,
  isSpeaking = false,
  startConversation,
  stopConversation,
}: VoiceAssistantProps) {
  return (
    <section className="w-full max-w-md mx-auto">
      <div className="relative bg-card border-1 border-gray-500 overflow-hidden">
        <AnimatePresence>
          {isConnected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-50 h-50 rounded-full bg-white/[0.07] blur-3xl" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 px-8 py-5 flex flex-col items-center text-center">
          <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-8">
            Asistente Virtual
          </p>

          <div className="relative mb-5">
            <motion.div
              animate={
                isConnected
                  ? isSpeaking
                    ? { scale: [1, 1.12, 1] }
                    : { scale: [1, 1.04, 1] }
                  : { scale: 1 }
              }
              transition={{
                duration: isSpeaking ? 0.8 : 2,
                repeat: isConnected ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="relative w-15 h-15 rounded-full flex items-center justify-center"
            >
              {isConnected && (
                <>
                  {[0, 1, 2].map((index) => (
                    <motion.span
                      key={index}
                      className="absolute inset-0 rounded-full border border-foreground/30"
                      animate={{
                        scale: [1, 1.6],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: index * 0.8,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}

              <div
                className={`relative w-15 h-15 rounded-full flex items-center justify-center transition-colors duration-500 ${isConnected
                  ? isSpeaking
                    ? "bg-foreground text-background"
                    : "bg-foreground/10 text-foreground"
                  : "bg-muted text-muted-foreground"
                  }`}
              >
                {isConnecting ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : isConnected ? (
                  isSpeaking ? (
                    <Volume2 className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )
                ) : (

                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="h-16 flex flex-col items-center justify-center gap-1.5 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  isConnecting
                    ? "connecting"
                    : isConnected
                      ? isSpeaking
                        ? "speaking"
                        : "listening"
                      : "idle"
                }
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-1.5"
              >
                <p className="text-sm font-medium text-foreground">
                  {isConnecting
                    ? "Conectando…"
                    : isConnected
                      ? isSpeaking
                        ? "El asistente está hablando"
                        : "El asistente está escuchando"
                      : "Listo para conversar"}
                </p>

                {status && (
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                    {status}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {!isConnected ? (
            <motion.button
              type="button"
     
              onClick={startConversation}
              disabled={isConnecting}
              whileHover={
                isConnecting
                  ? undefined
                  : { scale: 1.02 }
              }
              whileTap={
                isConnecting
                  ? undefined
                  : { scale: 0.98 }
              }
              className="bg-black group inline-flex items-center gap-2.5 bg-foreground text-background text-xs text-white font-bold tracking-[0.2em] uppercase px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
            >
              {isConnecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (


                <Phone className="w-4 h-4" />

              )}

              {isConnecting
                ? "Conectando"
                : "Iniciar asistente"}
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={stopConversation}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2.5 bg-transparent border border-border text-foreground text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-destructive hover:border-destructive hover:text-destructive-foreground transition-colors duration-200"
            >
              <PhoneOff className="w-4 h-4" />
              Finalizar conversación
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}