const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Route pour servir le fichier HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes (pour futures fonctionnalités)
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'LegalReflex API is running',
        timestamp: new Date().toISOString()
    });
});

// Route pour simuler l'inscription
app.post('/api/signup', (req, res) => {
    const { email, userType, needs } = req.body;
    
    // Simulation de sauvegarde
    console.log('Nouvelle inscription:', { email, userType, needs });
    
    res.json({
        success: true,
        message: 'Inscription réussie !',
        user: {
            email,
            userType,
            registeredAt: new Date().toISOString()
        }
    });
});

// Route pour simuler les consultations IA
app.post('/api/ai/consultation', (req, res) => {
    const { question, userType } = req.body;
    
    // Simulation de réponse IA
    const responses = {
        divorce: "En France, il existe 4 types de divorce : par consentement mutuel, pour acceptation du principe de la rupture, pour faute, et pour altération définitive du lien conjugal. Le divorce par consentement mutuel est le plus rapide et économique.",
        contrat: "Pour rédiger un contrat valide, vous devez respecter 4 conditions : le consentement des parties, leur capacité juridique, un objet certain et une cause licite. Je recommande de faire réviser tout contrat important par un avocat.",
        entreprise: "Pour créer une entreprise, vous devez choisir un statut juridique (SARL, SAS, SASU, etc.), rédiger les statuts, déposer le capital, publier une annonce légale et immatriculer au RCS.",
        default: "Je peux vous aider avec de nombreuses questions juridiques. Pouvez-vous préciser votre domaine d'intérêt : droit de la famille, droit des affaires, droit immobilier, etc. ?"
    };
    
    let response = responses.default;
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes('divorce')) response = responses.divorce;
    else if (questionLower.includes('contrat')) response = responses.contrat;
    else if (questionLower.includes('entreprise') || questionLower.includes('société')) response = responses.entreprise;
    
    res.json({
        success: true,
        response: response,
        confidence: 0.85,
        sources: ['Code civil', 'Code de commerce'],
        followUp: ['Voulez-vous plus de détails ?', 'Souhaitez-vous consulter un avocat ?']
    });
});

// Route 404
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 LegalReflex server running on http://localhost:${PORT}`);
    console.log(`📂 Serving files from: ${__dirname}`);
    console.log(`⚖️  LegalReflex Platform is ready!`);
});