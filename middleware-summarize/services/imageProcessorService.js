const Tesseract = require('tesseract.js');

const handleImage = async (filePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
    console.log('Extracted text from image:', text);
    return text;
  } catch (err) {
    console.error('Error processing image:', err);
    throw err;
  }
};

module.exports = { handleImage };
