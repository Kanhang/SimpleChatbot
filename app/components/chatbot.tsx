'use server'
import { headers } from 'next/headers'
import Client from './client';
// import { neon } from '@neondatabase/serverless';
// import OpenAI from "openai";
// import createAction from './action';
// import { BASEURL } from '../constants/bots'
// import { cache } from 'react'


export default async function Chatbot () {

  const header = await headers();
  const host = header.get('host');
     return (
     <>
     <Client host= {host} />
     </>)
}
