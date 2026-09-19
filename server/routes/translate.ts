import { RequestHandler } from "express";

export const handleTranslate: RequestHandler = async (req, res) => {
  const { text, lang } = req.body;

  if (!text || !lang) {
    res.status(400).json({ error: "Missing text or lang" });
    return;
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data[0]) {
      const result = data[0].map((s: any) => s[0]).join('');
      res.json({ translatedText: result });
    } else {
      res.status(500).json({ error: "Failed to parse translation" });
    }
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
};
