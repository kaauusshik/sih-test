import { RequestHandler } from "express";
import translate from "google-translate-api-x";

export const handleTranslate: RequestHandler = async (req, res) => {
  const { text, lang } = req.body;

  if (!text || !lang) {
    res.status(400).json({ error: "Missing text or lang" });
    return;
  }

  try {
    const result = await translate(text, { to: lang }) as any;
    res.json({ translatedText: result.text });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
};
