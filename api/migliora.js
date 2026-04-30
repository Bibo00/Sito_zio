// File: api/migliora.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    // 1. Accetta solo richieste POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metodo non consentito' });
    }

    try {
        const { testoOriginale } = req.body;

        // 2. Inizializza l'AI usando la variabile d'ambiente (che imposteremo su Vercel)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // 3. Prepara il prompt per l'AI
        const prompt = `Sei un assistente editoriale per un prestigioso studio legale. 
        Migliora il seguente testo rendendolo più professionale e autorevole. 
        Formatta il risultato in HTML (usa <p>, <ul>, <strong> se necessario). 
        Restituisci SOLO il codice HTML, senza spiegazioni.
        Ecco il testo:\n\n${testoOriginale}`;

        // 4. Esegui la richiesta all'AI
        const result = await model.generateContent(prompt);
        const testoMigliorato = result.response.text();

        // 5. Restituisci il risultato al tuo frontend
        return res.status(200).json({ success: true, testoMigliorato });

    } catch (error) {
        console.error("Errore API:", error);
        return res.status(500).json({ success: false, error: "Errore durante l'elaborazione" });
    }
}
