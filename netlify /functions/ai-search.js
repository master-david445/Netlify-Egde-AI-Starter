export const handler = async (event) => {
  try {
    const { query } = JSON.parse(event.body);

    if (!process.env.OPENAI_API_KEY) {
      return { statusCode: 500, body: "Missing OPENAI_API_KEY" };
    }

    const embeddingRes = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: query,
        model: "text-embedding-ada-002",
      }),
    });

    const embeddingData = await embeddingRes.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ embedding: embeddingData.data[0].embedding }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
