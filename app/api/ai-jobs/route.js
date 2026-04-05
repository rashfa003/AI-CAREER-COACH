import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateFallbackQueries = (industry, role) => {
  const normalizedRole = role.trim().toLowerCase();
  const normalizedIndustry = industry.trim().toLowerCase();

  return [
    `${normalizedRole} jobs linkedin`,
    `${normalizedRole} ${normalizedIndustry} remote jobs`,
    `junior ${normalizedRole} hiring`,
    `${normalizedIndustry} ${normalizedRole} positions`,
    `${normalizedRole} opportunities`,
  ].map((q) => q.trim());
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { industry, role } = body || {};

    if (!industry || !role) {
      return new Response(
        JSON.stringify({ error: "Industry and role required" }),
        { status: 400 },
      );
    }

    const prompt = `Generate 5 job search queries for LinkedIn based on:\nIndustry: ${industry}\nRole: ${role}\n\nReturn only a JSON array of strings.`;

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const text = completion?.choices?.[0]?.message?.content?.trim();
    let suggestions = [];

    if (text) {
      try {
        suggestions = JSON.parse(text);
        if (!Array.isArray(suggestions)) {
          throw new Error("Parsed result not an array");
        }
      } catch {
        // fallback: simple generator
        suggestions = generateFallbackQueries(industry, role);
      }
    } else {
      suggestions = generateFallbackQueries(industry, role);
    }

    return new Response(JSON.stringify({ suggestions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("/api/ai-jobs error", error);
    return new Response(
      JSON.stringify({
        suggestions: generateFallbackQueries("technology", "developer"),
        error: "Could not generate AI suggestions",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
