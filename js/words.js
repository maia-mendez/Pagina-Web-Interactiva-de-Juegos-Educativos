// Base de datos de palabras en guaraní por niveles
const guaraniWords = {
    nivel1: [
        { guarani: "che", español: "yo" },
        { guarani: "nde", español: "tú" },
        { guarani: "ha'e", español: "él/ella" },
        { guarani: "sy", español: "madre" },
        { guarani: "ru", español: "padre" },
        { guarani: "jagua", español: "perro" },
        { guarani: "mbarakaja", español: "gato" },
        { guarani: "ko'ẽ", español: "mañana" },
        { guarani: "ka'aru", español: "tarde" },
        { guarani: "pyhare", español: "noche" },
        { guarani: "y", español: "agua" },
        { guarani: "mba'e", español: "cosa" },
        { guarani: "porã", español: "lindo/bueno" },
        { guarani: "tuicha", español: "grande" },
        { guarani: "michĩ", español: "pequeño" },
        { guarani: "heta", español: "mucho" },
        { guarani: "mbovy", español: "poco" },
        { guarani: "avatí", español: "maíz" },
        { guarani: "jety", español: "batata" },
        { guarani: "ao", español: "ropa" }
    ],
    nivel2: [
        { guarani: "mbo'ehára", español: "profesor" },
        { guarani: "tembi'u", español: "comida" },
        { guarani: "tembiporu", español: "herramienta" },
        { guarani: "yvyra", español: "árbol" },
        { guarani: "ka'aguy", español: "bosque" },
        { guarani: "ysyry", español: "río" },
        { guarani: "jeroky", español: "baile" },
        { guarani: "purahéi", español: "canción" },
        { guarani: "ñe'ẽ", español: "palabra/hablar" },
        { guarani: "vy'a", español: "felicidad" },
        { guarani: "mba'epora", español: "historia" },
        { guarani: "tembiapo", español: "trabajo" },
        { guarani: "ñemity", español: "cultivo" },
        { guarani: "pyhareve", español: "madrugada" },
        { guarani: "aranduka", español: "libro" },
        { guarani: "pohã", español: "medicina" },
        { guarani: "jepovera", español: "relámpago" },
        { guarani: "araí", español: "nube" },
        { guarani: "yvytu", español: "viento" },
        { guarani: "kuarahy", español: "sol" }
    ],
    nivel3: [
        { guarani: "ñembo'e", español: "estudio/rezo" },
        { guarani: "tembikuaa", español: "conocimiento" },
        { guarani: "ñeñangareko", español: "cuidado" },
        { guarani: "tekojoja", español: "justicia" },
        { guarani: "tekoporã", español: "bienestar" },
        { guarani: "ñomoirũ", español: "compañía" },
        { guarani: "pytyvõ", español: "ayuda" },
        { guarani: "ñembosarái", español: "juego/diversión" },
        { guarani: "tekoha", español: "lugar de vida" },
        { guarani: "ñemomirĩ", español: "humildad" },
        { guarani: "ñembokatupyry", español: "habilidad" },
        { guarani: "terakuã", español: "fama/reputación" },
        { guarani: "ñemombarete", español: "fortalecimiento" },
        { guarani: "ñembopyahu", español: "renovación" },
        { guarani: "tekotevẽ", español: "necesidad" },
        { guarani: "ñemuha", español: "alojamiento" },
        { guarani: "ñemboja'o", español: "división/reparto" },
        { guarani: "ñeñanduka", español: "sentimiento" },
        { guarani: "tekoañete", español: "sinceridad" },
        { guarani: "ñemohenda", español: "organización" }
    ]
};

// Función para obtener palabras aleatorias de un nivel específico
function getRandomWords(level, count = 1) {
    const words = guaraniWords[`nivel${level}`];
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Función para obtener una palabra específica
function getWord(level, index) {
    return guaraniWords[`nivel${level}`][index];
}
