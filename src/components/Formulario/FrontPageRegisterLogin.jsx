import { motion } from "framer-motion";
import { Dog, Users, Clock, BarChart2, DollarSign, MessageCircle } from "lucide-react";

export default function FrontPageRegisterLogin({ onContact }) {
    const FEATURES = [
        {
            icon: Dog,
            title: "Administrar tus Turnos",
            desc: "Organizá y gestioná todos tus turnos desde un solo lugar.",
        },
        {
            icon: Users,
            title: "Administrar tus Clientes",
            desc: "Base de datos de clientes centralizada y accesible.",
        },
        {
            icon: Clock,
            title: "Ahorrar Tiempo",
            desc: "Automatizá procesos y reducí tareas repetitivas.",
        },
        {
            icon: BarChart2,
            title: "Ingresos y Gastos",
            desc: "Detalle claro de tu actividad financiera en tiempo real.",
        },
        {
            icon: DollarSign,
            title: "Completamente Gratuito",
            desc: "Sin costos ocultos. Empezá hoy sin tarjeta de crédito.",
        },
    ];

    const container = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.12, delayChildren: 0.2 },
        },
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="relative h-full min-h-screen bg-black flex flex-col justify-start px-10 py-11 overflow-hidden">

            {/* Background */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 max-w-md">


                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-4xl font-black text-white mb-2">
                        Gestión de <span className="text-gray-400 italic font-light">Turnos</span>
                    </h1>

                    <p className="text-gray-500 text-sm">
                        Optimizá tu negocio de forma simple, rápida y sin costo.
                    </p>
                </motion.div>

                {/* Features */}
                <motion.ul variants={container} initial="hidden" animate="show" className="flex flex-col gap-4">
                    {FEATURES.map(({ icon: Icon, title, desc }) => (
                        <motion.li key={title} variants={item} className="flex gap-4">
                            <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg">
                                <Icon className="w-4 h-4 text-gray-400" />
                            </div>

                            <div>
                                <p className="text-white text-sm font-semibold mb-0">{title}</p>
                                <p className="text-gray-600 text-xs mt-1">{desc}</p>
                            </div>
                        </motion.li>
                    ))}

                </motion.ul>



                {/* Status */}
                <div className="mt-8 text-gray-600 text-xs pt-5">
                    ● Sistema activo · Sin costo
            
                    {/* Botón soporte */}
                    <motion.button
                        onClick={onContact}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute bottom-0 right-0 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
                    >
                        <MessageCircle className="w-5 h-5" />
                    </motion.button>
                </div>


            </div>


        </div>
    );
}