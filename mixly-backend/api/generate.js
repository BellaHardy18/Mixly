export default async function handler(req, res) {
    // 🛡️ CORS HEADERS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: "Only POST requests allowed" });
        return;
    }

    const { drinkName, newingredients } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer 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`,  // <-- your real API key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{
                    role: "system",
                    content: `Suggest one creative and fun variations of a cocktail called "${drinkName}". Keep the ingredients as similar to "${newingredients}" as possible.

                                use the following simple format:

                                Cocktail Name: (Title with emoji, no hashtags, no stars)
                                Ingredients: (Comma-separated list, no dashes, no bullets)
                                Description: (Playful and short paragraph, no stars)

                                Please keep it clean, readable, and no extra symbols like "#" or "*" — just plain text.
                                Separate each cocktail with two line breaks. ONLY DO ONE COCKTAIL SUGGESTION.`,

                }],
                max_tokens: 150,
            })
        });

        const data = await response.json();

        // Handle OpenAI errors properly
        if (!response.ok) {
            console.error('OpenAI API error:', data);
            return res.status(500).json({ error: data.error?.message || 'Failed to generate cocktail variations.' });
        }

        if (!data.choices || !data.choices[0]) {
            console.error('Unexpected OpenAI response format:', data);
            return res.status(500).json({ error: 'Unexpected AI response format.' });
        }

        // If everything is fine, return the AI text
        res.status(200).json({ aiText: data.choices[0].message.content });

    } catch (error) {
        console.error('OpenAI API call failed:', JSON.stringify(error, null, 2));
        res.status(500).json({ error: error.message || 'Something went wrong with the AI request.' });
    }
    
}
