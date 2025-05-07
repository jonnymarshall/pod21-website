
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: any; // This could be a complex object from Contentful's Rich Text
  publishedDate: string;
  isFeatured: boolean;
}

// Helper functions to work with Contentful content
export const getPlainTextFromContent = (content: any): string => {
  if (!content) return '';
  
  // Handle case where content is already a string
  if (typeof content === 'string') return content;
  
  // Handle case where content is a number or boolean
  if (typeof content === 'number' || typeof content === 'boolean') {
    return String(content);
  }
  
  // Handle case where content is a Contentful rich text object
  if (content.nodeType === 'document' && Array.isArray(content.content)) {
    try {
      // Simple extraction of text from rich text
      return extractTextFromRichText(content);
    } catch (e) {
      console.error('Error extracting text from rich text:', e);
      return '';
    }
  }
  
  // Handle other object types by trying to convert to string
  if (typeof content === 'object') {
    try {
      if (content.toString && content.toString() !== '[object Object]') {
        return content.toString();
      }
      return JSON.stringify(content);
    } catch (e) {
      console.error('Error stringifying content:', e);
      return '';
    }
  }
  
  // Fallback
  return '';
};

// Extract text from Contentful rich text
const extractTextFromRichText = (node: any): string => {
  if (!node) return '';
  
  if (node.nodeType === 'text' && typeof node.value === 'string') {
    return node.value;
  }
  
  if (Array.isArray(node.content)) {
    return node.content.map((contentNode: any) => extractTextFromRichText(contentNode)).join(' ');
  }
  
  return '';
};
