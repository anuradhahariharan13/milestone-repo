const fs = require('fs/promises');
const pdfParse = require('pdf-parse');

const handlePDF = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    console.log('Extracted text from PDF:', data.text);
    return data.text;
  } catch (err) {
    console.error('Error processing PDF:', err);
    throw err;
  }
};

module.exports = { handlePDF };
