export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { return res.status(405).json({ error: 'Method Not Allowed' }); }
  const { userPrompt, systemPrompt } = req.body;
  if (!userPrompt) { return res.status(400).json({ error: 'Missing userPrompt' }); }
  try {
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) { return res.status(500).json({ error: 'API key not configured' }); }
    const modelName = "gemini-2.0-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }]
      })
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Google API error: ${response.status} - ${JSON.stringify(errData)}`);
    }
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
    return res.status(200).json({ reply: text });
  } catch (error) {
    console.error("API Route Error:", error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
