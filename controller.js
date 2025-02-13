import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const computeAdvanced = async (req, res) => {
  try {
    const userExpression = req.body.expression; // e.g. "sin(45) + 2^3"

    // Construct a prompt telling the model to compute or evaluate the expression
    const prompt = `Compute the value of the expression accurately: ${userExpression}.
    Return ONLY the numeric result.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful calculator" },
          { role: "user", content: prompt },
        ],
        max_tokens: 100,
        temperature: 0,
      }),
    });

    const data = await response.json();

    if (!data || data.error) {
      console.error("OpenAI error:", data?.error?.message || data);
      return res.status(400).json({ error: "OpenAI request failed" });
    }

    console.log("BACKEND: ", data.choices[0]?.message);
    // Now data.choices is guaranteed to exist
    const result = data.choices[0]?.message?.content?.trim() ?? "No result";
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
