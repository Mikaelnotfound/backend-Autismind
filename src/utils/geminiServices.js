const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

async function generateGeminiResponse(userMessage, conversationHistory, characterPersona) {
    if (!GEMINI_API_KEY) {
        console.error("ERRO: Chave de API do Gemini não configurada no serviço Gemini.");
        throw new Error("API Key para Gemini não encontrada.");
    }
    const contents = [];
    if (characterPersona) {
        contents.push({
            role: 'user',
            parts: [{ text: `Assuma a seguinte personalidade para esta conversa: ${characterPersona}` }],
        });
        contents.push({
            role: 'model',
            parts: [{ text: "Compreendido. Vamos começar." }],
        });
    }
    if (conversationHistory && conversationHistory.length > 0) {
        conversationHistory.forEach(msg => {
            contents.push({
                role: msg.sent_by === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            });
        });
    }
    contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
    });
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            { contents: contents },
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            return response.data.candidates[0].content.parts[0].text;
        } else {
            console.warn("Resposta da API Gemini não contém candidatos válidos:", response.data);
            return "Não consegui gerar uma resposta. Tente novamente.";
        }
    } catch (error) {
        console.error("Erro ao chamar a API Gemini:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        throw new Error("Falha na comunicação com a API Gemini.");
    }
}

function analyzeMessage(message) {
    const analysisResult = { sentiment: 'neutro', emotion: 'desconhecida' };
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('triste') || lowerMessage.includes('chateado') || lowerMessage.includes('mal')) {
        analysisResult.sentiment = 'negativo';
        analysisResult.emotion = 'tristeza';
    } else if (lowerMessage.includes('feliz') || lowerMessage.includes('alegre') || lowerMessage.includes('bom')) {
        analysisResult.sentiment = 'positivo';
        analysisResult.emotion = 'alegria';
    }
    return analysisResult;
}

module.exports = {
    generateGeminiResponse,
    analyzeMessage
};