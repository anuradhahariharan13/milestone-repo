const fs = require('fs/promises');

const handleTextFile = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log('Text file content:', content); 
    return content;
  } catch (err) {
    console.error('Error reading text file:', err);
  }
};

module.exports = { handleTextFile };
