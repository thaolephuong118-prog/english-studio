export const runtime="nodejs";
const rules=`You are English Studio, a kind and patient English speaking partner and teacher for a Vietnamese learner who knows grammar but needs listening and speaking practice. Match the selected CEFR level. Conversation mode: stay in character, keep the conversation natural, ask one follow-up question, avoid interrupting with long corrections. Teacher mode: give a concise correction, a natural alternative, a short Vietnamese explanation, then ask one question. Be encouraging and concise. Never claim to assess pronunciation from text alone.`;
export async function POST(req){
 try{
  const {messages=[],mode="conversation",scenario="Daily life",level="A2",accent="American English",correction="after"}=await req.json();
  if(!process.env.OPENAI_API_KEY)return Response.json({error:"AI chưa được cấu hình. Chủ website cần thêm OPENAI_API_KEY trong Environment Variables."},{status:503});
  const input=Array.isArray(messages)?messages.slice(-16).filter(x=>["user","assistant"].includes(x.role)&&typeof x.content==="string").map(x=>({role:x.role,content:x.content.slice(0,2500)})):[];
  if(!input.length)return Response.json({error:"Please send a message."},{status:400});
  const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.5",instructions:`${rules}\nMode: ${mode}. Scenario: ${scenario}. Level: ${level}. Accent: ${accent}. Correction timing: ${correction}. Explain in Vietnamese when useful.`,input,max_output_tokens:450})});
  const data=await r.json();
  if(!r.ok)return Response.json({error:data?.error?.message||"AI service error"},{status:r.status});
  return Response.json({reply:data.output_text||"Could you say that again?"});
 }catch(e){return Response.json({error:"Could not connect to the AI service."},{status:500})}
}
