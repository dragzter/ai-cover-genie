import { NextRequest } from "next/server";
import OpenAI from "openai";
import { tools } from "@/utils/ai-tool-functions";
import { optimizeResume } from "@/utils/optimize-resume";

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
            You are an expert resume parser and formatter. Based on the resume, job description, and user instructions, extract and return the resume content as structured data using the optimizeResume function.  Rewrite the summary, skills, experience, and education sections of the resume to better match the job description. Do not add any skills or experiences not present in the original resume.
            
            Only use the content from the original resume. Do not fabricate skills or experiences not mentioned.
            
            Highlight the items of the original resume that more closely align with the job description by making them more prominent like placing them higher on the list for that particular job.
            
            Job Description:
            ${jobDescription}
            
            Instructions to the AI:
            ${instructions}
            
            Original Resume:
            ${resume}
      `.trim(),
        },
      ],
      // @ts-ignore
      tools,
      tool_choice: { type: "function", function: { name: "optimizeResume" } },
    });

    if (
      completion &&
      completion?.choices[0]?.message?.tool_calls[0]?.function?.arguments
    ) {
      return Response.json({
        status: 200,
        message:
          completion.choices[0]?.message?.tool_calls[0]?.function.arguments,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return Response.json({
        error: "Failed to optimize resume",
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
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
