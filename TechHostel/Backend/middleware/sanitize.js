const sanitizeHtml = require('sanitize-html');

const xssSanitize = (req, res, next) => {
  if (req.body) {
    const sanitizeConfig = {
      allowedTags: [],        // NO HTML TAGS ALLOWED
      allowedAttributes: {},  // NO ATTRIBUTES ALLOWED
      disallowedTagsMode: 'escape'
    };
    
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key], sanitizeConfig);
      }
    });
  }
  next();
};

module.exports = xssSanitize;