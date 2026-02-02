
import { 
  $createParagraphNode, 
  $createTextNode, 
  $getRoot,
  $createLineBreakNode,
  FORMAT_TEXT_COMMAND 
} from 'lexical';

export const parseAndInsertText = (text, selection) => {
  const paragraphs = text.split('\n\n');
  
  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim()) {
      const paragraphNode = $createParagraphNode();
      
      // Parse inline formatting
      const formattedText = parseInlineFormatting(paragraph);
      paragraphNode.append(formattedText);
      
      selection.insertNodes([paragraphNode]);
      
      if (index < paragraphs.length - 1) {
        // Add paragraph spacing
        selection.insertNodes([$createParagraphNode()]);
      }
    }
  });
  console.log(selection,'select');
}

function parseInlineFormatting(text) {
  const nodes = [];
  let currentText = '';
  let bold = false;
  let italic = false;
  let code = false;
  
  for (let i = 0; i < text.length; i++) {
    if (text.substring(i, i + 3) === '**') {
      if (currentText) {
        nodes.push($createTextNode(currentText).toggleFormat(bold ? 'bold' : '').toggleFormat(italic ? 'italic' : ''));
        currentText = '';
      }
      bold = !bold;
      i += 1;
    } else if (text[i] === '*') {
      if (currentText) {
        nodes.push($createTextNode(currentText).toggleFormat(bold ? 'bold' : '').toggleFormat(italic ? 'italic' : ''));
        currentText = '';
      }
      italic = !italic;
    } else if (text[i] === '`') {
      if (currentText) {
        nodes.push($createTextNode(currentText).toggleFormat(code ? 'code' : ''));
        currentText = '';
      }
      code = !code;
    } else {
      currentText += text[i];
    }
  }
  
  if (currentText) {
    const node = $createTextNode(currentText);
    if (bold) node.toggleFormat('bold');
    if (italic) node.toggleFormat('italic');
    if (code) node.toggleFormat('code');
    nodes.push(node);
  }
  
  return nodes;
}

export default parseAndInsertText;