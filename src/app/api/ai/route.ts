// app/api/ai/route.ts

import { NextRequest } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY, // <-- use process.env here, not $VAR
  //baseURL: "https://api.x.ai/v1",
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log("Got form data");

    const instructions = formData.get("instructions") as string;
    const jobDescription = formData.get("jobDescription") as string;
    const resume = formData.get("resume") as File;

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `
You are an expert resume writer and HTML formatting specialist. Your job is to rewrite the user's resume based on their existing resume, job description, and instructions, and return it ONLY in valid HTML rich text.

🚫 DO NOT invent or fabricate anything.

✅ You may:
- Rephrase, reorder, and emphasize existing content
- Highlight experience that matches the job description

✅ Requirements:
1. Resume must be ATS-optimized:
   - Use standard headers: "Summary", "Experience", "Education"
   - NO tables, columns, or images
   - Use simple semantic HTML only

2. DO NOT wrap output in <html>, <head>, or <body>. Just provide inner content starting from <h1>.  

❌ DO NOT use Markdown or triple backticks (\`\`\`html).
---

💡 VERY IMPORTANT FORMATTING RULE:

In the "Experience" section, for every job entry:

- Job **title** and **date range** MUST appear on the **same line**
- They MUST be styled like this:

<div style="display: flex; justify-content: space-between;">
  <strong>Job Title</strong>
  <span>Date Range</span>
</div>

- Place the company name below that, and follow it with a bullet list of responsibilities.

---

📄 Your output must follow this structure:

1. <h1>[Full Name]</h1>
2. Contact info
3. <h2>Summary</h2>
   <p>...</p>
4. <h2>Experience</h2>
   <div style="display: flex; justify-content: space-between;">
     <strong>Job Title</strong>
     <span>Start – End</span>
   </div>
   <p><em>Company Name</em></p>
   <ul>
     <li>Responsibility or achievement</li>
     ...
   </ul>
5. <h2>Education</h2>
   ...

---

REPEAT: You MUST use the exact formatting and HTML structure described above.

DO NOT use <p> tags for job title and date — use the <div> with flex style as shown.

---

### 📄 USER INPUTS

**Job Description:**  
${jobDescription}

**Instructions to the AI:**  
${instructions}

**Original Resume:**  
${resume}
`.trim(),
        },
      ],
    });

    return Response.json({
      status: 200,
      message: completion.choices[0].message.content,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("OpenAI error:", err);
    return Response.json({
      error: err.message || "Unknown error",
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
