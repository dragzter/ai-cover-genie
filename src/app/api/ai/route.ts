import { NextRequest } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
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
            You are an expert resume writer and HTML formatting specialist. Your job is to rewrite the user's resume based on their existing resume, job description, and instructions, and return it in plain text, use spaces and newlines for layout.
            
            🚫 DO NOT add skills that are not on the resume, do not add experience that is not on the original resume.
            
            ❌ DO NOT use Markdown or triple backticks (\`\`\`html) in your output, your only output should be the resume.
           
            ✅ You may:
            - Rephrase, reorder, and emphasize existing content
            - Highlight experience that matches the job description
            
            ✅ Requirements:
            1. Resume must be ATS-optimized:
               - Headers must be in all caps
               - Use standard headers: "Summary", "Skills", "Experience", "Education"
               - Skills should be inlines, not bulleted
               - Job title and date range should be on the same line
               
            In the "Experience" section, for every job entry
            - Add an extra newline between sections.  
            - They MUST be styled like this:
            
            Job Title (uppercase) - Date Range 
            Job Description (bulleted list)
            
            Job Title 2 (uppercase) - Date Range 
            Job Description 2 (bulleted list)
           
            ...

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
