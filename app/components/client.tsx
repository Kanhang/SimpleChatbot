'use client'
import React, { useState, useEffect, useRef, useTransition} from 'react';
import styles  from "./client.module.css";
import { startChat } from './action';
import Image from 'next/image';

const Client =  ({ host } : any) => {
     //callBot();
    const [messages, setMessages] = useState<any[]>([]);
    const [cur, setCur] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollContainerRef = useRef<any>(null);
    const [isPending, startTransition] = useTransition();

  const handleChat = () => {
    if (loading) return;
    setLoading(true);
    startTransition(async () => {

      const newMessages = await startChat(host,messages);
      if (newMessages) {
        setMessages(newMessages);
            setLoading(false);
      }
    });
  };

    useEffect(() => {}, [cur]);

    useEffect(()=> {
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
        setMessages( [...messages, {role: 'user', content: cur}]);
        setCur('');
    }


    return (<div className={styles.container}>
            <div ref={scrollContainerRef} className={styles.chat}> 
              {messages.map((msg, index) => {
                return <div key={index} className={msg && msg.role === 'user'? styles.userBox: styles.botBox}>{msg.content}</div>
              })}
             
          {loading ?
              <Image src='/loading.webp'  alt="Dynamic Image" width="100" height="100" />: <></>}
            </div>
            <div  className={styles.inputBox}>
              <textarea value={cur} onChange={type} placeholder='Enter your message' ></textarea>
              <button className={styles.sendBut} onClick={send} disabled= {cur.length === 0 || loading}> Send </button>
            </div>
    
        </div>)
};



export default Client;