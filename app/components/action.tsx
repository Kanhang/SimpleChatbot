
import { MODEL } from '../constants/bots';
import OpenAI from "openai";
import { cache } from 'react';
import { BASEURL, getModel} from '../constants/bots';
import { base_prompt_fn } from '../constants/prompt';

export async function startChat(host: string, messages: any, mode: string, model:string) {
    const getScrets =  cache(getAuthCode);
    const secret = await getScrets(host);
    const client = new OpenAI({
        baseURL: BASEURL,
        apiKey: secret,
        dangerouslyAllowBrowser: true
        });
    if (!client) { 
      return ;
    }
    
    if (messages.length === 1) {
      const instructions = {
        role: 'system',
        content: base_prompt_fn(mode)
      }
      messages.unshift(instructions);
    }

    const completion = await client.chat.completions.create({
                messages: messages,
                model: getModel(model)
              });
      
          return [...messages, completion.choices[0].message];
      }
      

async function getAuthCode(host : string) {
    let prefix = host.startsWith('localhost') ? 'http' : 'https';
    const resp = await fetch(`${prefix}://${host}/api`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const data = await resp?.json();
    const secret = data?.message[0].token;
    return secret;
    
}