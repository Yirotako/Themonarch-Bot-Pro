import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m) => {
    // Aquí puedes manejar otros tipos de mensajes además de los de Simsimi
    if (!m.text) return; // Si el mensaje no tiene texto, no hacemos nada

    const chat = global.db.data.chats[m.chat];

    // Verificar si Simsimi está activado para este chat
    if (chat.simi && shouldUseSimsimi(m.text)) {
        try {
            const ressimi = await simitalk(m.text);
            await m.reply(ressimi.resultado.simsimi);
        } catch (error) {
            throw '*[❗] La API de Simsimi presenta errores.*';
        }
    } else {
        // Manejar otros tipos de mensajes aquí
        // Por ejemplo, simplemente responder al mensaje recibido
        await m.reply('Entiendo tu mensaje pero no estoy configurado para responder a esto.');
    }
};

handler.before = async (m) => {
    // Aquí puedes realizar operaciones previas al manejo del mensaje
    // Por ejemplo, verificar permisos, realizar ajustes, etc.
    return true; // Devolver true para indicar que el mensaje debe ser manejado por `handler`
};

export default handler;

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "es") {
    if (!ask) return { status: false, resultado: { msg: "Debes ingresar un texto para hablar con simsimi." }};
    try {
        const response1 = await axios.get(`https://delirios-api-delta.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
        const trad1 = await translate(`${response1.data.data.message}`, { to: language, autoCorrect: true });
        return { status: true, resultado: { simsimi: trad1.text }};
    } catch {
        try {
            const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
            return { status: true, resultado: { simsimi: response2.data.message }};
        } catch (error2) {
            return { status: false, resultado: { msg: "Todas las API's fallaron. Inténtalo de nuevo más tarde.", error: error2.message }};
        }
    }
}

function shouldUseSimsimi(text) {
    // Función de ejemplo para determinar si se debe usar Simsimi
    // Puedes implementar tu lógica específica aquí
    return /simsimi|simi|chatbot/i.test(text);
}
