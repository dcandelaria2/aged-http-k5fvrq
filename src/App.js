import React, { useState, useMemo } from "react";
import {
  Shield,
  DollarSign,
  Stethoscope,
  Baby,
  FileText,
  Scale,
  Info,
  ChevronRight,
  AlertCircle,
  Phone,
  CheckCircle2,
  BookOpen,
  MapPin,
  Clock,
  Briefcase,
  Search,
  Hammer,
  GraduationCap,
  Bell,
  Heart,
  ChevronDown,
  ArrowRight,
  Calculator,
  UserCheck,
  HelpCircle,
  X,
  ExternalLink,
  Link as LinkIcon,
  Lightbulb,
  Monitor,
  Brain,
  Users,
  TrendingUp,
  Gavel,
  Library,
} from "lucide-react";

const App = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [salaryConfig, setSalaryConfig] = useState({
    category: "BSN",
    exp: "yes",
    sector: "privado",
  });
  const [benefitHours, setBenefitHours] = useState(130);
  const [defenseStep, setDefenseStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [faqCategory, setFaqCategory] = useState("Todos");

  // --- Data ---
  const nursingCategories = {
    LPN: {
      title: "Enfermera(o) Práctica(o) (LPN)",
      base: 1750,
      exp: 2000,
      scope:
        "Cuidados selectivos bajo dirección. La venopunción o flebotomía requiere supervisión directa de un RN o médico.",
      warning:
        "Realizar tareas sin supervisión te expone a cargos de práctica ilegal.",
    },
    ADN: {
      title: "Enfermera(o) Asociada(o) (ADN)",
      base: 2250,
      exp: 2500,
      scope:
        "Colabora en cuidado directo. Prohibido asignarles funciones de alta jerarquía administrativa o supervisión compleja.",
      warning:
        "No aceptes cargos de supervisora de unidad si solo posees Grado Asociado.",
    },
    BSN: {
      title: "Enfermera(o) Generalista (BSN)",
      base: 2750,
      exp: 3000,
      scope:
        "Pilar de la unidad. Responsable de planificar, ejecutar, delegar y evaluar. Derecho por ley a la práctica privada.",
      warning: "Eres responsable legal de lo que delegas a LPNs y ADNs.",
    },
    MSN: {
      title: "Enfermera(o) Especialista (MSN)",
      base: 3500,
      exp: 4000,
      scope:
        "Consultor y líder en áreas críticas. Requiere maestría y licencia de especialista específica.",
      warning:
        "Tu peritaje aumenta tu responsabilidad civil en casos de impericia.",
    },
    APRN: {
      title: "Práctica Avanzada (APRN)",
      base: 4500,
      exp: 5500,
      scope:
        "Práctica colaborativa con médicos. Prescribe, ordena laboratorios y realiza diagnósticos clínicos.",
      warning:
        "Debes tener contrato de colaboración vigente para ejercer tus facultades de prescripción.",
    },
  };

  const lawsCompendium = [
    {
      id: "254",
      title: "Ley Núm. 254-2015",
      subtitle: "Ley para Regular la Práctica de Enfermería",
      desc: "La 'Constitución' de la profesión. Define quiénes somos, qué podemos hacer y establece las categorías de licencia.",
      impact:
        "Sin esta ley, no tendrías autonomía jurídica. Establece que la práctica sin licencia es un delito.",
    },
    {
      id: "82",
      title: "Ley Núm. 82-1973",
      subtitle: "Ley del Colegio de Profesionales de Enfermería",
      desc: "Establece la colegiación compulsoria. El Colegio es tu brazo defensor ante el gobierno y patronos.",
      impact:
        "Garantiza que la profesión tenga una voz política y legal unificada en la Isla.",
    },
    {
      id: "137",
      title: "Ley Núm. 137-2020",
      subtitle: "Salario Mínimo para Enfermería (Privado)",
      desc: "Establece las escalas salariales mínimas que todo hospital o centro privado debe pagar según tu grado y experiencia.",
      impact:
        "Evita que el mercado devalúe tu conocimiento profesional con sueldos de pobreza.",
    },
    {
      id: "115",
      title: "Ley Núm. 115-1991",
      subtitle: "Ley contra Represalias (El Chaleco Antibalas)",
      desc: "Protege al empleado que denuncia actos ilegales o violaciones de seguridad en el empleo.",
      impact:
        "Si denuncias ratios peligrosos o maltrato y te despiden, tienes derecho a daños dobles y restitución.",
    },
    {
      id: "87",
      title: "Ley Núm. 87-2025",
      subtitle: "Nuevo Código de Lactancia de PR",
      desc: "Elimina el requisito de certificado médico recurrente y garantiza 1 hora paga de lactancia por 12 meses.",
      impact:
        "Protege la salud de la madre enfermera y su derecho a la maternidad sin penalidades laborales.",
    },
    {
      id: "80",
      title: "Ley Núm. 80-1976",
      subtitle: "Despido Injustificado",
      desc: "Establece que el patrono debe pagar una indemnización (mesada) si te despide sin una causa justificada por ley.",
      impact:
        "Garantiza estabilidad laboral y castiga el despido caprichoso del supervisor.",
    },
    {
      id: "60",
      title: "Ley Núm. 60-2018",
      subtitle: "Uso de Enfermedad para Familiares",
      desc: "Permite que uses hasta 5 días de tu balance de enfermedad para cuidar a hijos, padres o cónyuge.",
      impact:
        "Reconoce que la enfermera también tiene responsabilidades de cuidado en su hogar.",
    },
    {
      id: "139",
      title: "Ley Núm. 139-1976",
      subtitle: "Ley del Buen Samaritano",
      desc: "Te otorga inmunidad civil si prestas ayuda voluntaria en una emergencia fuera de tu lugar de trabajo.",
      impact:
        "Te permite ejercer tu vocación de auxilio en la calle sin miedo a demandas por impericia.",
    },
  ];

  const coachRecommendations = [
    {
      id: 1,
      title: "Vigilancia al PS 687 (Ratios)",
      icon: TrendingUp,
      color: "amber",
      text: "El tema más caliente del 2026. La lucha ahora es por la carga de trabajo.",
      recommendation:
        "Mantente activo en las asambleas del Colegio (CPEPR). El PS 687 está 'a punto de caramelo'. Si se aprueba, tu derecho a una asignación segura (ej. 1:2 en intensivo) será exigible bajo pena de multa de $10,000 para el hospital.",
    },
    {
      id: 2,
      title: "Nicho: Telesalud (Reg. 9518)",
      icon: Monitor,
      color: "blue",
      text: "El Reglamento 9518 abre una puerta gigante para trabajar desde casa.",
      recommendation:
        "Obtén la certificación oficial de la Junta. Requiere solo 4 horas de educación continua específica. Esto te permite diversificar tus ingresos con menos agotamiento físico.",
    },
    {
      id: 3,
      title: "Modo Empresa (Ley 254)",
      icon: Briefcase,
      color: "teal",
      text: "Si eres BSN o superior, la Ley 254 te permite tener tu propia oficina o agencia.",
      recommendation:
        "Crea tu propia marca profesional. Si optas por esto, abre un Plan Keogh para tu retiro; es deducible de impuestos y permite aportaciones mucho más altas que una IRA.",
    },
    {
      id: 4,
      title: "Colegio vs Unión",
      icon: Users,
      color: "indigo",
      text: "El Colegio es tu representante legal institucional. La Unión negocia tu convenio específico.",
      recommendation:
        "Dirígete al Colegio por violaciones a la Ley 254 (alcance). Acude a la Unión para temas de turnos y escalas salariales por convenio colectivo.",
    },
    {
      id: 5,
      title: "Bitácora Profesional",
      icon: Brain,
      color: "pink",
      text: "La ley ahora prohíbe que usen tus ausencias justificadas para evaluarte mal (Ley 60-2018).",
      recommendation:
        "Lleva siempre una bitácora personal de incidencias. Si un supervisor pide algo que viola el Canon 13, anótalo con fecha y hora. Es oro para tu defensa legal.",
    },
  ];

  const faqData = [
    // --- BLOQUE A: LICENCIA Y TRÁMITES ---
    {
      q: "¿Qué leyes rigen mi práctica de enfermería en Puerto Rico?",
      a: "Principalmente la Ley 254 de 2015 (Regulación), la Ley 82 de 1973 (Colegiación) y leyes laborales como la Ley 379 (Jornada) y la Ley 80 (Despido).",
      cat: "Licencia",
    },
    {
      q: "¿Es obligatorio el curso de Dengue para renovar?",
      a: "Sí. Según la Resolución 2024-159, es requisito obligatorio desde 2025 hasta 2028 debido a la emergencia de salud pública.",
      cat: "Licencia",
    },
    {
      q: "¿Cuántas horas de educación continua necesito cada tres años?",
      a: "LPN: 21 horas. ADN y BSN: 30 horas. APRN: 50 horas (con 20 específicas en su área).",
      cat: "Licencia",
    },
    {
      q: "¿Límite de créditos online?",
      a: "No hay límite bajo el nuevo Reglamento 9651.",
      cat: "Licencia",
    },
    {
      q: "¿Qué es la Ley 300?",
      a: "Verificación de historial delictivo para trabajar con niños o adultos mayores. Costo: $70.00.",
      cat: "Licencia",
    },

    // --- BLOQUE B: PRÁCTICA Y LEGAL ---
    {
      q: "¿Qué es la Ley del Buen Samaritano?",
      a: "Ley 139-1976. Te protege de demandas civiles si prestas ayuda en una emergencia fuera del trabajo sin cobrar.",
      cat: "Práctica",
    },
    {
      q: "¿Quién regula la seguridad de los infantes en hospitales?",
      a: "La Ley 133 de 1999 establece protocolos estrictos de protección para infantes.",
      cat: "Práctica",
    },
    {
      q: "¿Tengo que cumplir con HIPAA en PR?",
      a: "Sí. Es ley federal y aplica para proteger la privacidad de la información de salud.",
      cat: "Práctica",
    },

    // --- BLOQUE C: SALARIOS Y COMPENSACIÓN ---
    {
      q: "¿Salario mínimo de BSN con experiencia en hospital privado?",
      a: "$3,000.00 mensuales bajo la Ley 137-2020.",
      cat: "Salarios",
    },
    {
      q: "¿Mi patrono puede pagarme menos si soy 1099?",
      a: "La escala define el valor de la profesión, pero muchos patronos alegan que el contratista no es 'empleado' bajo la ley.",
      cat: "Salarios",
    },
    {
      q: "¿Qué ocurre si hay un convenio colectivo?",
      a: "Si el convenio es mejor, se queda. Si es inferior, la ley prevalece.",
      cat: "Salarios",
    },

    // --- BLOQUE D: ESTABILIDAD Y DESPIDO ---
    {
      q: "¿Me pueden despedir sin causa en PR?",
      a: "Sí, pero si no hay justa causa (Ley 80), el patrono debe pagarte la 'mesada'.",
      cat: "Despido",
    },
    {
      q: "¿Qué es el 'despido constructivo'?",
      a: "Cuando el patrono crea condiciones intolerables (reducción sueldo, vejámenes) obligándote a renunciar.",
      cat: "Despido",
    },
    {
      q: "¿Cómo se calcula la mesada para contratos de 2020?",
      a: "Tres meses de sueldo más dos semanas por año trabajado (Tope 9 meses).",
      cat: "Despido",
    },

    // --- BLOQUE E: MATERNIDAD Y LACTANCIA ---
    {
      q: "¿Puedo ceder semanas de mi licencia de maternidad al padre?",
      a: "Sí. La Ley 54-2023 permite que la madre ceda hasta 4 de sus 8 semanas de licencia paga al otro progenitor si ambos son empleados.",
      cat: "Maternidad",
    },
    {
      q: "¿Me protege la ley si sufro un aborto?",
      a: "Sí. En Puerto Rico se reconoce una licencia especial de hasta 4 semanas paga para recuperación física y emocional tras un aborto o pérdida gestacional.",
      cat: "Maternidad",
    },
    {
      q: "¿Es legal que me cambien de unidad o turno al regresar?",
      a: "El patrono debe garantizar la reserva del puesto original. Cambios onerosos o punitivos tras el regreso pueden ser base para una demanda por discrimen.",
      cat: "Maternidad",
    },
    {
      q: "¿Tengo derecho a la hora de lactancia si mi hijo está hospitalizado?",
      a: "Sí. El derecho a la extracción de leche humana es para la salud de la madre y el infante, independientemente de si el bebé está con ella o en el hospital.",
      cat: "Maternidad",
    },
    {
      q: "¿Qué pasa si el patrono no tiene una sala de lactancia adecuada?",
      a: "Incurre en violación a la Ley 87-2025. Se expone a multas mínimas de $3,000 por incidente y penalidades del Departamento del Trabajo.",
      cat: "Maternidad",
    },

    // --- BLOQUE F: GREMIO Y COLEGIO ---
    {
      q: "¿Qué beneficios incluye mi cuota anual del Colegio?",
      a: "Incluye seguro de impericia básico, seguro de vida, representación legal en vistas ante la Junta y acceso a educación continua gratuita.",
      cat: "Gremio",
    },
    {
      q: "¿Puedo ejercer sin pagar la cuota del Colegio?",
      a: "No. La Ley 82 establece la colegiación compulsoria. Ejercer con cuota vencida se considera práctica ilegal de la enfermería.",
      cat: "Gremio",
    },
    {
      q: "¿Cómo solicito ayuda legal al Colegio ante un abuso patronal?",
      a: "Debes estar al día en tus cuotas y someter una solicitud por escrito a la oficina de servicios legales del CPEPR con evidencia del abuso.",
      cat: "Gremio",
    },
    {
      q: "¿El Colegio me defiende ante una demanda civil de un paciente?",
      a: "El Colegio provee representación legal inicial y el seguro de impericia básico incluido en la cuota cubre hasta los límites de la póliza contratada.",
      cat: "Gremio",
    },
    {
      q: "¿Qué es la Asamblea General y por qué asistir?",
      a: "Es la máxima autoridad del gremio donde se votan presupuestos, cuotas y reglamentos que afectan directamente tu licencia.",
      cat: "Gremio",
    },

    // --- BLOQUE G: FUTURO Y TENDENCIAS 2026+ ---
    {
      q: "¿Cómo impactará la Inteligencia Artificial mi trabajo?",
      a: "Se proyecta un aumento en sistemas de soporte de decisiones y telemetría avanzada que reducirán tareas administrativas, exigiendo más destrezas digitales del enfermero.",
      cat: "Futuro",
    },
    {
      q: "¿Habrá nuevos incentivos para evitar la migración de enfermeros?",
      a: "La Ley 60 se está enmendando para incluir créditos contributivos adicionales y programas de perdón de préstamos estudiantiles para enfermeros en áreas críticas.",
      cat: "Futuro",
    },
    {
      q: "¿Qué especialidades tendrán mayor crecimiento salarial?",
      a: "Geriatría (por el envejecimiento poblacional), Salud Mental y Anestesia son los nichos con proyecciones de bonos de retención más altos en 2026-2030.",
      cat: "Futuro",
    },
    {
      q: "¿Se estandarizarán los ratios de pacientes por ley?",
      a: "El PS 687 busca convertir a PR en la segunda jurisdicción (tras California) en tener ratios fijos obligatorios por ley bajo pena de cierre de unidades.",
      cat: "Futuro",
    },

    // --- BLOQUE H: CONTRATOS (NUEVAS) ---
    {
      q: "¿Qué es un contrato de 'At-Will' en Puerto Rico?",
      a: "Es una relación donde el patrono puede terminar el empleo en cualquier momento, pero en PR está sujeta a la Ley 80, por lo que si no hay justa causa, deben pagarte mesada.",
      cat: "Contratos",
    },
    {
      q: "¿Pueden obligarme a firmar una cláusula de no competencia?",
      a: "En enfermería asistencial estas cláusulas suelen ser nulas si limitan injustamente tu derecho a trabajar en otros hospitales, a menos que manejes secretos de negocio reales.",
      cat: "Contratos",
    },
    {
      q: "¿Qué diferencia hay entre un contrato W-2 y un 1099?",
      a: "W-2 implica subordinación, beneficios y retenciones de ley. 1099 es para contratistas independientes con autonomía total, retención del 10% y el enfermero paga su propio Seguro Social.",
      cat: "Contratos",
    },
    {
      q: "¿Qué validez tiene un contrato verbal sobre mi salario?",
      a: "Es legalmente válido pero difícil de probar. La Ley 137 exige cumplir las escalas mínimas independientemente de si el acuerdo fue verbal o escrito.",
      cat: "Contratos",
    },
    {
      q: "¿Puedo renegociar si me asignan más tareas de las acordadas?",
      a: "Sí. Un cambio sustancial en las funciones sin aumento salarial puede considerarse un despido constructivo, permitiéndote reclamar bajo la Ley 80.",
      cat: "Contratos",
    },

    // --- BLOQUE I: HOGARES Y REGLAMENTO 9720 ---
    {
      q: "¿Qué exige el Reglamento 9720 en hogares?",
      a: "Aprobado en enero 2026, exige credenciales al día, el Certificado de Capacitación para Adultos Mayores y ratios de personal específicos.",
      cat: "Hogares",
    },
    {
      q: "¿Se aceptan certificaciones online de CPR en hogares?",
      a: "No. El Reglamento 9720 exige cursos de CPR y CPI presenciales para ser válidos ante el Dept. de la Familia.",
      cat: "Hogares",
    },
    {
      q: "¿Qué protección tengo si un paciente me agrede en su hogar?",
      a: "Debes activar el protocolo de seguridad de la agencia y documentar. El patrono es responsable de evaluar la seguridad del entorno antes de asignarte al caso.",
      cat: "Hogares",
    },
    {
      q: "¿Soy responsable del equipo médico que deja la agencia en el hogar?",
      a: "Eres responsable de su manejo seguro, pero el mantenimiento y calibración técnica es responsabilidad de la agencia proveedora según el Reglamento 9720.",
      cat: "Hogares",
    },
    {
      q: "¿Puedo rehusarme a entrar a un hogar en condiciones insalubres?",
      a: "Sí. Bajo el Canon de Ética y leyes de seguridad ocupacional, si el entorno pone en riesgo tu salud o integridad, debes notificar inmediatamente a supervisión.",
      cat: "Hogares",
    },
  ];

  const linksData = [
    {
      category: "Leyes de Práctica y Junta",
      links: [
        {
          name: "Ley 254-2015 (Ley de Enfermería)",
          url: "https://www.lexjuris.com/lexlex/leyes2015/lexl2015254.htm",
        },
        {
          name: "Reglamento 9104 (Práctica JEEPR)",
          url: "http://app.estado.gobierno.pr/ReglamentosOnLine/Reglamentos/9104.pdf",
        },
        {
          name: "Reglamento 9720 (Hogares Adultos Mayores)",
          url: "http://app.estado.gobierno.pr/ReglamentosOnLine/Reglamentos/9720.pdf",
        },
        {
          name: "Resolución 2024-159 (Dengue e Impericia)",
          url: "https://www.salud.pr.gov/CMS/DOWNLOAD/9188",
        },
        {
          name: "Reglamento 9651 (Educación Continua)",
          url: "https://www.salud.pr.gov/CMS/DOWNLOAD/9645",
        },
      ],
    },
    {
      category: "Referencias Rápidas Extra",
      links: [
        {
          name: "Proyecto del Senado 687 (Estatus Ratios)",
          url: "https://senado.pr.gov/ps687",
        },
        {
          name: "Clínica de Derecho Laboral UPR",
          url: "https://derecho.uprrp.edu/clinica-asistencia-legal/",
        },
        {
          name: "Guía 1040-PR (Seguro Social 1099)",
          url: "https://www.irs.gov/es/1040pr",
        },
      ],
    },
    {
      category: "Salarios y Beneficios",
      links: [
        {
          name: "Ley 137-2020 (Sector Privado)",
          url: "https://bvirtualogp.pr.gov/ogp/Bvirtual/leyesreferencia/PDF/27-2005.pdf",
        },
        {
          name: "Ley 136-2020 (Sector Público)",
          url: "https://www.lexjuris.com/lexlex/leyes2020/lexl2020136.htm",
        },
        {
          name: "Reglamento 9425 (Escalas Sector Público)",
          url: "https://www.salud.pr.gov/CMS/DOWNLOAD/6516",
        },
      ],
    },
  ];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesSearch =
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        faqCategory === "Todos" || item.cat === faqCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, faqCategory]);

  const defenseSteps = [
    {
      title: "Fase 1: Silent Mode (Recopilación)",
      icon: Search,
      desc: "Guarda tus evidencias fuera de la red del hospital.",
      list: [
        "Copia de Roster",
        "Talonarios de pago",
        "Evaluaciones",
        "Mensajes guardados",
      ],
    },
    {
      title: "Fase 2: Paper Trail (Comunicación)",
      icon: FileText,
      desc: "Envía email formal citando leyes.",
      list: [
        "Cita Ley 254 (Alcance)",
        "Cita Reg. 9650 (Ética)",
        "Usa: 'Riesgo a seguridad de paciente'",
      ],
    },
    {
      title: "Fase 3: Chaleco Antibalas (Ley 115)",
      icon: Shield,
      desc: "Radica querella formal.",
      list: ["DTRH o PR OSHA", "Notifica al patrono", "Derecho a daños dobles"],
    },
  ];

  // --- Components ---
  const SectionHeader = ({ icon: Icon, title, subtitle }) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 text-teal-600 mb-2">
        <Icon size={32} strokeWidth={2.5} />
        <h2 className="text-3xl font-black tracking-tight text-slate-800">
          {title}
        </h2>
      </div>
      <p className="text-slate-500 font-medium ml-11">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 pb-20 lg:pb-0 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 bg-slate-900 text-white flex-col p-6 shadow-2xl shrink-0">
          <div
            className="flex items-center gap-3 mb-10 px-2 cursor-pointer"
            onClick={() => setActiveSection("dashboard")}
          >
            <div className="bg-teal-500 p-2 rounded-xl shadow-lg shadow-teal-500/20">
              <Scale className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-black text-xl leading-none tracking-tighter text-white">
                Nurse Legal Coach
              </h1>
              <span className="text-[10px] text-teal-400 font-bold tracking-widest uppercase">
                Puerto Rico 2026
              </span>
            </div>
          </div>

          <nav className="space-y-1 overflow-y-auto custom-scrollbar text-white">
            {[
              { id: "dashboard", icon: Info, label: "Resumen 2026" },
              { id: "leyes", icon: Library, label: "Compendio Legal" },
              { id: "search", icon: Search, label: "Centro de Respuestas" },
              { id: "coach", icon: Lightbulb, label: "Tips del Coach" },
              { id: "alcance", icon: Stethoscope, label: "Alcance Legal" },
              {
                id: "economia",
                icon: DollarSign,
                label: "Salario / Beneficios",
              },
              { id: "maternidad", icon: Baby, label: "Maternidad / Lactancia" },
              { id: "junta", icon: FileText, label: "Junta y Colegio" },
              { id: "estrategia", icon: Hammer, label: "Estrategia Defensa" },
              { id: "biblioteca", icon: BookOpen, label: "Biblioteca / Links" },
              { id: "recursos", icon: Phone, label: "Asistencia Legal" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                  activeSection === item.id
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
          {activeSection === "dashboard" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-br from-teal-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block text-white">
                    Edición 2026
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 text-white">
                    Manual de Poder <br />
                    para la Enfermería
                  </h1>
                  <p className="text-teal-50 text-lg md:text-xl max-w-2xl font-medium leading-relaxed opacity-90 text-white">
                    Herramienta Legal para Enfermeros en PR
                  </p>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <button
                      onClick={() => setActiveSection("leyes")}
                      className="bg-white text-teal-700 font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform shadow-xl"
                    >
                      <Library size={20} /> Ver Compendio Legal
                    </button>
                    <button
                      onClick={() => setActiveSection("search")}
                      className="bg-teal-500/20 backdrop-blur-md text-white border border-white/30 font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all shadow-xl"
                    >
                      <Search size={20} /> Centro de Respuestas
                    </button>
                  </div>
                </div>
                <div className="absolute top-[-10%] right-[-10%] opacity-10 shadow-inner text-white">
                  <Shield size={400} />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-slate-800">
                <div
                  onClick={() => setActiveSection("leyes")}
                  className="cursor-pointer bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:border-teal-500 transition-all group"
                >
                  <div className="bg-teal-50 text-teal-600 w-12 h-12 rounded-2xl flex items-center justify-center font-black group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    LEY
                  </div>
                  <h4 className="font-bold">Compendio Legal</h4>
                  <p className="text-sm text-slate-500">
                    Explicación de leyes clave.
                  </p>
                </div>
                <div
                  onClick={() => setActiveSection("search")}
                  className="cursor-pointer bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:border-amber-500 transition-all group"
                >
                  <div className="bg-amber-50 text-amber-600 w-12 h-12 rounded-2xl flex items-center justify-center font-black group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    FAQ
                  </div>
                  <h4 className="font-bold">Preguntas</h4>
                  <p className="text-sm text-slate-500">
                    Base de datos legal completa.
                  </p>
                </div>
                <div
                  onClick={() => setActiveSection("economia")}
                  className="cursor-pointer bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:border-indigo-500 transition-all group"
                >
                  <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center font-black group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    $$
                  </div>
                  <h4 className="font-bold">Sueldos</h4>
                  <p className="text-sm text-slate-500">
                    Calcula tu sueldo mínimo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "leyes" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
              <SectionHeader
                icon={Library}
                title="Compendio de Leyes Relevantes"
                subtitle="El marco jurídico que protege tu carrera y tu bienestar"
              />
              <div className="grid gap-6">
                {lawsCompendium.map((law) => (
                  <div
                    key={law.id}
                    className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 group hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-black text-slate-800">
                          {law.title}
                        </h3>
                        <p className="text-teal-600 font-bold uppercase text-xs tracking-widest">
                          {law.subtitle}
                        </p>
                      </div>
                      <div className="bg-slate-900 text-teal-400 px-4 py-2 rounded-xl text-xs font-black self-start">
                        ID #{law.id}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-slate-600 font-medium leading-relaxed">
                        {law.desc}
                      </p>
                      <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-900">
                        <p className="text-slate-500 text-[10px] font-black uppercase mb-1 tracking-widest italic text-slate-500">
                          Impacto para el Enfermero:
                        </p>
                        <p className="text-slate-800 font-bold text-sm leading-relaxed">
                          {law.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "search" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
              <SectionHeader
                icon={HelpCircle}
                title="Centro de Respuestas"
                subtitle="Localiza información entre la base de datos legal de enfermería en PR"
              />

              <div className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md pb-4 space-y-4 text-slate-800">
                <div className="relative">
                  <Search
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"
                    size={24}
                  />
                  <input
                    type="text"
                    placeholder="Busca por 'maternidad', 'gremio', 'futuro', 'contratos'..."
                    className="w-full bg-white border-2 border-slate-100 rounded-[2rem] pl-16 pr-8 py-5 text-lg font-bold shadow-sm focus:border-teal-500 focus:ring-0 transition-all text-slate-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-100 p-1 rounded-full hover:bg-slate-200"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {[
                    "Todos",
                    "Licencia",
                    "Práctica",
                    "Salarios",
                    "Beneficios",
                    "Maternidad",
                    "Despido",
                    "Contratos",
                    "Hogares",
                    "Gremio",
                    "Futuro",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFaqCategory(cat)}
                      className={`px-6 py-2 rounded-full text-xs font-black uppercase border-2 transition-all ${
                        faqCategory === cat
                          ? "bg-teal-600 border-teal-600 text-white shadow-lg"
                          : "bg-white border-slate-100 text-slate-500"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase px-3 py-1 rounded-full text-slate-500">
                          {faq.cat}
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-slate-800 mb-3">
                        {faq.q}
                      </h4>
                      <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-teal-500">
                        <p className="text-slate-700 font-bold leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 opacity-50">
                    <Search size={48} className="mx-auto mb-4 text-slate-400" />
                    <p className="font-bold text-slate-400">
                      No encontramos resultados para tu búsqueda.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "coach" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
              <SectionHeader
                icon={Lightbulb}
                title="Tips del Coach"
                subtitle="Recomendaciones estratégicas para 2026"
              />
              <div className="grid gap-8">
                {coachRecommendations.map((tip) => (
                  <div
                    key={tip.id}
                    className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative group overflow-hidden"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`p-3 rounded-2xl bg-${tip.color}-50 text-${tip.color}-600 shadow-sm`}
                      >
                        <tip.icon size={24} />
                      </div>
                      <h3 className="text-xl font-black text-slate-800">
                        {tip.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                      {tip.text}
                    </p>
                    <div
                      className={`p-6 rounded-2xl bg-${tip.color}-50 border-l-4 border-${tip.color}-500 flex gap-4 shadow-sm`}
                    >
                      <ArrowRight
                        className={`text-${tip.color}-600 shrink-0 mt-1`}
                        size={20}
                      />
                      <div>
                        <p
                          className={`text-${tip.color}-900 font-black text-xs uppercase mb-1 tracking-tighter text-slate-800`}
                        >
                          Recomendación Coach:
                        </p>
                        <p className="text-slate-700 text-sm font-bold leading-relaxed">
                          {tip.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "biblioteca" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
              <SectionHeader
                icon={BookOpen}
                title="Biblioteca Legal"
                subtitle="Lista Maestra de Referencias"
              />
              <div className="grid gap-8">
                {linksData.map((section, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm"
                  >
                    <div className="bg-slate-900 text-white px-8 py-4 font-black uppercase text-sm tracking-widest text-white">
                      {section.category}
                    </div>
                    <div className="divide-y divide-slate-50">
                      {section.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group text-slate-800"
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-teal-50 p-2 rounded-lg text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                              <LinkIcon size={18} />
                            </div>
                            <span className="font-bold">{link.name}</span>
                          </div>
                          <ExternalLink
                            size={18}
                            className="text-slate-300 group-hover:text-teal-500"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "alcance" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
              <SectionHeader
                icon={Stethoscope}
                title="Scopes of Practice"
                subtitle="Ley Núm. 254 de 2015"
              />
              <div className="grid gap-4">
                {Object.entries(nursingCategories).map(([key, cat]) => (
                  <div
                    key={key}
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-slate-800"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-slate-900 text-teal-400 font-black px-4 py-2 rounded-xl text-sm">
                        {key}
                      </span>
                      <h3 className="text-xl font-black">{cat.title}</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-2xl flex gap-3 shadow-sm">
                        <UserCheck
                          className="text-teal-600 shrink-0"
                          size={20}
                        />
                        <p className="text-slate-600 text-sm font-bold leading-relaxed">
                          {cat.scope}
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-2xl border-l-4 border-red-500 flex gap-3 shadow-sm">
                        <AlertCircle
                          className="text-red-500 shrink-0"
                          size={20}
                        />
                        <p className="text-red-800 text-xs font-black uppercase tracking-wide">
                          {cat.warning}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "economia" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
              <SectionHeader
                icon={DollarSign}
                title="Economía Profesional"
                subtitle="Justicia salarial 2026"
              />
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                <Calculator
                  className="absolute top-8 right-8 text-slate-50"
                  size={120}
                />
                <h3 className="text-2xl font-black text-slate-800 mb-6">
                  Calculadora Salarial
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8 text-slate-800">
                  <div className="space-y-4">
                    <label className="block text-sm font-black text-slate-500 uppercase tracking-widest text-slate-500">
                      Categoría
                    </label>
                    <select
                      value={salaryConfig.category}
                      onChange={(e) =>
                        setSalaryConfig({
                          ...salaryConfig,
                          category: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold focus:ring-2 focus:ring-teal-500 text-slate-800"
                    >
                      {Object.entries(nursingCategories).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-black text-slate-500 uppercase tracking-widest text-slate-500">
                      Experiencia 1 año+
                    </label>
                    <div className="flex gap-2">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() =>
                            setSalaryConfig({ ...salaryConfig, exp: opt })
                          }
                          className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                            salaryConfig.exp === opt
                              ? "bg-teal-600 text-white shadow-md"
                              : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                          }`}
                        >
                          {opt === "yes" ? "Sí" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-[2rem] p-8 text-center text-white shadow-xl">
                  <span className="text-teal-400 text-xs font-black uppercase tracking-[0.2em]">
                    Sueldo Mínimo de Ley
                  </span>
                  <div className="text-5xl md:text-7xl font-black mt-2 tracking-tighter text-white">
                    $
                    {(salaryConfig.exp === "yes"
                      ? nursingCategories[salaryConfig.category].exp
                      : nursingCategories[salaryConfig.category].base
                    ).toLocaleString()}
                    .00
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 italic font-bold text-slate-400">
                    Basado en escala Ley 137 (Privado) y Reg. 9425 (Público)
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "maternidad" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
              <SectionHeader
                icon={Baby}
                title="Maternidad y Lactancia"
                subtitle="Protección Ley 87-2025"
              />
              <div className="bg-white p-8 rounded-[2.5rem] border border-pink-100 shadow-sm relative overflow-hidden group text-slate-800">
                <Heart
                  className="absolute -right-10 -bottom-10 text-pink-50 opacity-20 group-hover:scale-125 transition-transform text-pink-100"
                  size={300}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="text-pink-500" size={32} />
                    <h3 className="text-2xl font-black">1 Hora Diaria Paga</h3>
                  </div>
                  <p className="text-slate-600 font-bold leading-relaxed mb-6">
                    Garantizado por 12 meses desde el regreso. Sin necesidad de
                    certificado médico recurrente según la nueva Ley 87-2025.
                  </p>
                  <div className="p-6 rounded-3xl bg-red-50 border-l-4 border-red-500 text-red-900 font-bold italic shadow-sm">
                    Penalidad al patrono: Mínimo $3,000 por infracción + Daños
                    Dobles por despido injustificado.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "estrategia" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 text-slate-800">
              <SectionHeader
                icon={Hammer}
                title="Estrategia de Defensa"
                subtitle="Autodefensa de Licencia Profesional"
              />
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-12">
                  {defenseSteps.map((_, i) => (
                    <React.Fragment key={i}>
                      <button
                        onClick={() => setDefenseStep(i)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all ${
                          defenseStep >= i
                            ? "bg-indigo-600 text-white shadow-xl"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {i + 1}
                      </button>
                      {i < 2 && (
                        <div
                          className={`flex-1 h-1 mx-4 rounded-full ${
                            defenseStep > i ? "bg-indigo-600" : "bg-slate-100"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <h3 className="text-2xl font-black mb-4">
                    {defenseSteps[defenseStep].title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-8 font-medium italic">
                    "{defenseSteps[defenseStep].desc}"
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {defenseSteps[defenseStep].list.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl font-bold text-sm shadow-sm border border-slate-100 transition-all hover:bg-indigo-50 text-slate-800"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-green-500 shrink-0"
                        />{" "}
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-red-900 text-white rounded-3xl flex items-center gap-4 shadow-xl">
                <Gavel size={32} className="text-white" />
                <p className="text-sm font-black uppercase tracking-widest text-white">
                  Ley 115: El chaleco antibalas contra represalias patronales.
                </p>
              </div>
            </div>
          )}

          {activeSection === "recursos" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 text-slate-800">
              <SectionHeader
                icon={Phone}
                title="Ayuda Legal"
                subtitle="Directorio Pro-Bono PR"
              />
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Servicios Legales PR",
                    phone: "787-728-5070",
                    area: "Toda la Isla",
                  },
                  {
                    name: "Pro-Bono, Inc.",
                    phone: "787-721-3398",
                    area: "Empleo y Discrimen",
                  },
                  {
                    name: "Clínica UPR Laboral",
                    phone: "787-999-9570",
                    area: "Salarios y Madres",
                  },
                ].map((contact, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-teal-500 transition-all shadow-sm"
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-slate-400">
                      {contact.area}
                    </p>
                    <h4 className="text-xl font-black mb-4">{contact.name}</h4>
                    <a
                      href={`tel:${contact.phone.replace(/-/g, "")}`}
                      className="inline-flex items-center gap-2 font-black text-lg text-teal-600"
                    >
                      <Phone size={18} /> {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "junta" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 text-slate-800">
              <SectionHeader
                icon={FileText}
                title="Regulación"
                subtitle="JEEPR vs CPEPR"
              />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border-t-8 border-indigo-600 shadow-sm transition-all hover:scale-105">
                  <h3 className="text-xl font-black mb-2">La Junta (JEEPR)</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-slate-400">
                    Regulador del Estado
                  </p>
                  <p className="text-slate-600 font-bold text-sm leading-relaxed mb-4">
                    Administra licencias y reválidas. Protege al paciente
                    fiscalizando tu cumplimiento ético.
                  </p>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-black text-slate-500">
                    FISCALIZA AL PROFESIONAL
                  </span>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border-t-8 border-teal-600 shadow-sm transition-all hover:scale-105">
                  <h3 className="text-xl font-black mb-2">
                    El Colegio (CPEPR)
                  </h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-slate-400">
                    Gremio Profesional
                  </p>
                  <p className="text-slate-600 font-bold text-sm leading-relaxed mb-4">
                    Defiende tus derechos económicos y gremiales. La colegiación
                    es compulsoria por Ley 82.
                  </p>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-black text-slate-500">
                    DEFIENDE AL PROFESIONAL
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 z-50 px-2 py-3 flex justify-around items-center shadow-2xl">
        {[
          { id: "dashboard", icon: Info, label: "Legal" },
          { id: "search", icon: Search, label: "Respuestas" },
          { id: "coach", icon: Lightbulb, label: "Coach" },
          { id: "biblioteca", icon: BookOpen, label: "Links" },
          { id: "leyes", icon: Library, label: "Leyes" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center gap-1 transition-all px-2 ${
              activeSection === item.id
                ? "text-teal-600 scale-110"
                : "text-slate-400"
            }`}
          >
            <item.icon
              size={22}
              strokeWidth={activeSection === item.id ? 2.5 : 2}
            />
            <span className="text-[10px] font-black uppercase tracking-tighter">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
