const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadAttachment = async (url, fileName) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const tempDir = path.resolve(__dirname, '../temp');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const filePath = path.resolve(tempDir, fileName);
  fs.writeFileSync(filePath, response.data);
  return filePath;
};

module.exports = { downloadAttachment };

