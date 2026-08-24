type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

type AskPayload = {
  message?: unknown;
  history?: unknown;
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are Samarth Chawla's portfolio assistant. Answer visitor questions about Samarth in first person where natural, but never invent facts. Be friendly, concise (2-4 sentences unless asked for detail), and professional. If asked something unrelated to Samarth, politely steer back. If you don't know something, say so and suggest the contact form.

ABOUT SAMARTH:
- Full Stack Developer from New Delhi, India.
- Email: mr.samarthchawla@gmail.com | Phone: +91 9971445751
- Languages: English, Hindi. Focus: Web Development + DSA.
- Portfolio: https://www.samarthworks.in | GitHub: https://github.com/samarth-chawla | LinkedIn: https://www.linkedin.com/in/samarth-chawla-51a403337/ | X: https://x.com/_samarth_chawla

SKILLS:
- Frontend: HTML, CSS, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS, Material UI.
- Backend & Databases: Node.js, Express.js, REST APIs, Authentication, Middleware, MongoDB, PostgreSQL, SQLite.
- UI: Responsive Design, Framer Motion, GSAP, Modern UI/UX, Animations.
- Tools: Git, GitHub, Clean Code, Code Optimization, DSA, daily LeetCode practice.

EXPERIENCE:
- Frontend Development Intern, Ministry of Ayush (Apr 2025 - May 2025, New Delhi, on-site): revamped the official web portal with Angular 19 and Bootstrap 5, improving responsiveness, accessibility, and UX; built reusable modular UI components.
- Full Stack Developer Intern, Airport Authority of India (Jun 2025 - Aug 2025, New Delhi, on-site): built TaskFlow-Multilevel, a PERN-stack task platform with RBAC for admin/manager/team roles, real-time task status updates, interactive dashboards; deployed on Render.

PROJECTS:
- DSA Intelligence (2026): full-stack DSA prep platform analyzing LeetCode submission history via GraphQL to compute recency-weighted topic weakness scores and generate personalized daily 3-problem plans, with an AI Mentor grounded in real performance data. Next.js, TypeScript, Prisma, PostgreSQL, Tailwind. Live: https://leetcode-analyzer.samarthworks.in/ | Code: https://github.com/samarth-chawla/dsa-intelligence
- SafeRoute (2025): safety-focused navigation web app with interactive maps (React Leaflet), dynamic route plotting, heatmap overlays, and route safety scoring using crime stats, lighting, and traffic signals. React, Leaflet, Tailwind, Node.js, Express. Live: https://safe-route-119-frontend.onrender.com/ | Code: https://github.com/samarth-chawla/SafeRoute
- TaskFlow Multilevel (2025): full-stack task platform for multi-level teams with role-aware actions, approvals, and a dashboard-first workflow. PERN stack. Live: https://taskflow-multilevel-1.onrender.com/ | Code: https://github.com/samarth-chawla/TaskFlow-MultiLevel

RESUME: https://drive.google.com/file/d/1UpcCv0KjWrcWXjHYm6KJbOfqj2HYQsBT/view?usp=sharing`;

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 12;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 5 * 60 * 1000;

const rateBuckets = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const timestamps = (rateBuckets.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT) {
    rateBuckets.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateBuckets.set(ip, timestamps);
  return false;
};

const asHistory = (value: unknown): ChatMessage[] => {
  if (!Array.isArray(value)) return [];

  const messages: ChatMessage[] = [];

  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;

    const role = (entry as ChatMessage).role;
    if (role !== "user" && role !== "model") continue;

    const text = String(
      (entry as ChatMessage).parts?.[0]?.text ?? "",
    ).slice(0, MAX_MESSAGE_LENGTH);

    if (text) messages.push({ role, parts: [{ text }] });
  }

  return messages.slice(-MAX_HISTORY);
};

export async function POST(request: Request) {
  if (!GEMINI_API_KEY) {
    return Response.json(
      { error: "AI service is not configured." },
      { status: 500 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many questions. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let payload: AskPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message =
    typeof payload.message === "string"
      ? payload.message.trim().slice(0, MAX_MESSAGE_LENGTH)
      : "";

  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  const contents: ChatMessage[] = [
    ...asHistory(payload.history),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 400,
          thinkingConfig: { thinkingBudget: 0 },
        },
        safetySettings: [],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      console.error("Gemini API error:", response.status, await response.text());

      return Response.json(
        { error: "The assistant is unavailable right now. Try again shortly." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };

    const reply = data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      return Response.json(
        { error: "The assistant could not answer that. Try rephrasing." },
        { status: 502 },
      );
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Ask route error:", error);

    return Response.json(
      { error: "The assistant is unavailable right now. Try again shortly." },
      { status: 502 },
    );
  }
}
