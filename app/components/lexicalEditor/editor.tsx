'use client'
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
//import { LexicalErrorBoundary } from './lexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {$getRoot, $getSelection, $createParagraphNode, $createTextNode,} from 'lexical';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import parseAndInsertText  from './editorUtility'



const editorConfig = {
  namespace: 'AIResponseRenderer',
  editable: false,
  nodes: [],
  onError(error :any) {
    console.error(error);
  },
};



const EditorPlugin = ({content} : any) => {
   const [editor] = useLexicalComposerContext();
 
  useEffect(() => {
    if (content) {
      editor.update(() => {
        const root = $getRoot();
        const selection = root.select();
          // Parse markdown-like formatting
          parseAndInsertText(content, selection);
      });
    }
  }, [editor, content]);
  
  return null;
}

const EditorWrapper = ({content} : any) => {

  return (<>
            <EditorPlugin content={content}/>
            <RichTextPlugin
              contentEditable={<ContentEditable placeholder={null} />}
              ErrorBoundary={LexicalErrorBoundary}/>
              <HistoryPlugin />
            <AutoFocusPlugin />
          </>
      )
}


export const LexicalRenderer = ({content} : any) => {
  console.log(content)

   // this is to parse string content to JSON string
const convertPlainTextToEditorState = (text:any) => {
  // This function returns a function that Lexical will call to initialize
  return (editor:any) => {
    editor.update(() => {
      const root = $getRoot();
      
      if (text.trim() === '') {
        // Empty editor - just add a paragraph
        const paragraph = $createParagraphNode();
        root.append(paragraph);
      } else {
        // Split text by lines and create paragraphs
        const lines = text.split('\n');
        lines.forEach((line:any) => {
          const paragraph = $createParagraphNode();
          if (line.trim()) {
            paragraph.append($createTextNode(line));
          }
          root.append(paragraph);
        });
      }
    });
  };
};

  const initialConfig = {
    ...editorConfig,
    editorState: convertPlainTextToEditorState(content),
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorWrapper content ={content}/>
    </LexicalComposer>
  );
}
export default LexicalRenderer;