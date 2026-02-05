import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import ChatBot from './components/chatbot';
import React from 'react';
import Error from './error';
export default function ServerSide() {


  return (
    <ErrorBoundary fallback={Error}>
      <ChatBot/>
      </ErrorBoundary>
  );
}
