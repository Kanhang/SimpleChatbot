'use client'
import React, { useState, useEffect, useRef, useTransition } from 'react';
import type { JSXElement } from "@fluentui/react-components";
import { Select, useId } from "@fluentui/react-components";
import type { SelectProps } from "@fluentui/react-components";
import LexicalRenderer from './lexicalEditor/editor';
import styles from "./client.module.css";
import { startChat } from './action';

import Image from 'next/image';
import '../index.css';

interface AgentProps {
  agent: string;
  setMessages: Function;
  setAgent: Function;
}
const AgentSelections = (props: AgentProps): JSXElement => {
  const selectId = useId();
  const { agent, setAgent, setMessages } = props;
  const setVal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAgent(event.target.value);
    setMessages([]);
  }
  return (
    <>
      <div className="m-10 font-bold text-lg">Front End AI Chating Bot</div>
      <div className='w-2 flex flex-row m-5'>
        <label className="m-2" htmlFor={selectId}>Agent</label>
        <Select id={selectId} value={agent} onChange={setVal}>
          <option value="CG">Code generation</option>
          <option value="CE">Concept explaining</option>
          <option value="IQ">Interview questions</option>
        </Select>
      </div>
    </>
  );
};



interface ModelProps {
  model: string;
  setMessages: Function;
  setModel: Function;
}
const ModelSelections = (props: ModelProps): JSXElement => {
  const selectId = useId();
  const { model, setModel, setMessages } = props;
  const setVal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(event.target.value);
    setMessages([]);
  }
  return (
    <>
      <div className="m-10 font-bold text-lg">Choose your model</div>
      <div className="m-10 font-bold text-lg">(if one is down, pick another)</div>
      <div className='w-2 flex flex-row m-5'>
        <label className="m-2" htmlFor={selectId}>Model</label>
        <Select id={selectId} value={model} onChange={setVal}>
          <option value="arcee">Arcee</option>
          <option value="deepseek">Deepseek</option>
           <option value="nous">Nous</option>
          <option value="venice">Venice</option>
        </Select>
      </div>
    </>
  );
};
const Client = ({ host }: any) => {
  //callBot();
  const [messages, setMessages] = useState<any[]>([]);
  const [cur, setCur] = useState('');
  const [agent, setAgent] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<any>(null);
  const [isPending, startTransition] = useTransition();

  const handleChat = () => {
    if (loading) return;
    setLoading(true);

    // useTransition is a React Hook that allows you to update the 
    // state without blocking the UI. It lets you mark certain state updates as "non-urgent,"
    //  so they can be interrupted by more urgent updates
    //   (like typing in an input or clicking a button). 
    //   This is a key tool for improving the perceived performance of your application.
    startTransition(async () => {
      const newMessages = await startChat(host, messages, agent, model);
      if (newMessages) {
        setMessages(newMessages);
        setLoading(false);
      }
    });
  };

  useEffect(() => { }, [cur]);

  useEffect(() => {
    callBot();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages.length, loading]);

  const type = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCur(e.target.value);
  }

  const callBot = async () => {
    if (messages.length % 2 === 0 || loading) {
      return;
    }
    handleChat();

  }

  const send = (e: React.MouseEvent) => {
    setMessages([...messages, { role: 'user', content: cur }]);
    setCur('');
  }


  // <LexicalRenderer content={'MY'}> </LexicalRenderer>
  return (
    <>
      <AgentSelections agent={agent} setAgent={setAgent} setMessages={setMessages} />
      <ModelSelections model={model} setModel={setModel} setMessages={setMessages} />
      <div className={styles.container}>
        <div ref={scrollContainerRef} className="h-[400px] border border-black border-solid overflow-auto">
          {messages.map((msg, index) => {
            if (index !== 0)
              return <div key={index} className={msg && msg.role === 'user' ?
                "mt-[10px] ml-auto mr-[10px] rounded-[5px] text-black bg-green-200 p-[10px] block max-w-3/5" :
                "m-[10px] rounded-[5px] text-black bg-gray-100 p-[10px] block max-w-3/5"

              }>

                <LexicalRenderer content={msg.content}> </LexicalRenderer>

              </div>
          })}

          {loading ?
            <Image src='/loading.webp' alt="Dynamic Image" width="100" height="100" /> : <></>}
        </div>
        <div className="w-[800px] h-[200px] flex flex-row">
          <textarea className="p-[10px] min-w-9/10 h-full" value={cur} onChange={type} placeholder='Enter your message' ></textarea>
          <button className="bg-green-200 w-full text-xl font-bold" onClick={send} disabled={cur.length === 0 || loading}> Send </button>
        </div>

      </div>
    </>)
};



export default Client;