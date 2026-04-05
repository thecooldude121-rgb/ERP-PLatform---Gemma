import { GoogleGenAI } from "@google/genai";
import { Lead, Deal } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const geminiService = {
  scoreLead: async (lead: Partial<Lead>) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Score this lead from 0-100 based on fit and potential value. Return only the number.
      Lead: ${JSON.stringify(lead)}`,
    });
    return parseInt(response.text || "0", 10);
  },

  generateMeetingNotes: async (transcript: string) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize this meeting transcript into key takeaways, action items, and sentiment.
      Transcript: ${transcript}`,
    });
    return response.text;
  },

  getSalesAdvice: async (deal: Deal, accountName: string) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 3 strategic recommendations to close this deal.
      Deal: ${JSON.stringify(deal)}
      Account: ${accountName}`,
    });
    return response.text;
  }
};
