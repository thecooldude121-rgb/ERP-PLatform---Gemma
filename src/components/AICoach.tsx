import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Loader2, AlertCircle, ChevronRight, MessageSquare, Target, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

interface AICoachProps {
  context: any;
  type: 'lead' | 'deal';
}

interface CoachingSuggestion {
  nextBestAction: string;
  communicationStrategy: string;
  potentialObjections: string[];
}

export const AICoach: React.FC<AICoachProps> = ({ context, type }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<CoachingSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCoaching = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const prompt = `You are an expert Sales Coach for SDRs and AEs. 
      Provide real-time coaching for the following ${type}:
      ${JSON.stringify(context, null, 2)}
      
      Focus on:
      1. Next best action to move the ${type} forward.
      2. Communication strategy (tone, key points to mention).
      3. Potential objections the client might have and how to address them.
      
      Return the response in JSON format.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              nextBestAction: { type: Type.STRING },
              communicationStrategy: { type: Type.STRING },
              potentialObjections: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["nextBestAction", "communicationStrategy", "potentialObjections"]
          }
        }
      });

      if (response.text) {
        setSuggestion(JSON.parse(response.text));
      }
    } catch (err) {
      console.error("AI Coaching Error:", err);
      setError("Failed to generate AI coaching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaching();
  }, [context.id]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-3xl border border-indigo-100 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24 text-indigo-600" />
      </div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-xl">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-bold text-slate-900">AI Sales Coach</h3>
        </div>
        <button 
          onClick={fetchCoaching}
          disabled={loading}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-50 flex items-center gap-1"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Refresh"}
        </button>
      </div>

      {loading && !suggestion && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-sm text-slate-500 font-medium animate-pulse">Analyzing ${type} data...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100 mb-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {suggestion && (
        <div className={cn("space-y-6 relative z-10 transition-all duration-500", loading ? "opacity-50 grayscale" : "opacity-100")}>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-700">
              <Target className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Next Best Action</span>
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed bg-white/50 p-3 rounded-xl border border-indigo-50">
              {suggestion.nextBestAction}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-700">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Communication Strategy</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {suggestion.communicationStrategy}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-700">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Potential Objections</span>
            </div>
            <div className="grid gap-2">
              {suggestion.potentialObjections.map((objection, idx) => (
                <div key={idx} className="flex items-start gap-2 group">
                  <ChevronRight className="w-3 h-3 text-indigo-400 mt-1 group-hover:translate-x-1 transition-transform" />
                  <p className="text-xs text-slate-600">{objection}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
