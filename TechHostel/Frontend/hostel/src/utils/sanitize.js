// Client-side sanitization utility
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove/escape dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/&/g, '&amp;');
};

export const safeRender = (text) => {
  return { __html: sanitizeInput(text) };
};