import React from 'react';
import DOMPurify from 'dompurify';

const SafeRender = ({ html, tag = 'span', ...props }) => {
  if (!html) return null;
  
  const cleanHtml = DOMPurify.sanitize(html.toString(), {
    ALLOWED_TAGS: [], // Allow no HTML tags by default
    ALLOWED_ATTR: [], // Allow no attributes by default
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'style']
  });
  
  const Tag = tag;
  
  return <Tag {...props} dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export const SafeText = ({ text, ...props }) => {
  if (!text) return null;
  
  const cleanText = DOMPurify.sanitize(text.toString(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
  
  return <span {...props}>{cleanText}</span>;
};

export default SafeRender;