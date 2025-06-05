const textract = require('textract');

const handleDocFile = (filePath) => {
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(filePath, (error, text) => {
      if (error) {
        console.error('Error extracting text from doc:', error);
        return reject(error);
      }
      console.log('Doc file content:', text);
      resolve(text); // You can return or process the text here
    });
  });
};

module.exports = { handleDocFile };
