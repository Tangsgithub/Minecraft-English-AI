const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const oldGeminiBranch = `        const requestModel = config?.model || 'gemini-3.6-flash';
        const candidateModels = Array.from(new Set([requestModel, 'gemini-3.6-flash', 'gemini-3.1-pro-preview']));`;

const newGeminiBranch = `        let requestModel = config?.model || 'gemini-3.6-flash';
        if (requestModel.includes('deepseek') || requestModel.includes('openai') || requestModel.includes('llama')) {
          requestModel = 'gemini-3.6-flash';
        }
        const candidateModels = Array.from(new Set([requestModel, 'gemini-3.6-flash', 'gemini-3.1-pro-preview']));`;

content = content.replace(oldGeminiBranch, newGeminiBranch);
fs.writeFileSync('server.ts', content);
