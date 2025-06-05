const { handlePDF } = require('../services/pdfProcessorService');
const { handleImage } = require('../services/imageProcessorService');
const { handleTextFile } = require('../services/textProcessorService');
const { handleDocFile } = require('../services/docProcessorService');
const { downloadAttachment } = require('../utils/downloadUtils');
const path = require('path');

const processAttachments = async (attachments) => {
  const extractedTexts = [];

  for (const attachment of attachments) {
    const fileName = decodeURIComponent(attachment.name);
    const filePath = await downloadAttachment(attachment.attachment_url, fileName);
    const ext = path.extname(fileName).toLowerCase();

    try {
      if (ext === '.pdf') {
        const text = await handlePDF(filePath);
        extractedTexts.push(text);
      } else if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const text = await handleImage(filePath);
        extractedTexts.push(text);
      } else if (['.txt', '.log'].includes(ext)) {
        const text = await handleTextFile(filePath);
        extractedTexts.push(text);
      } else if (['.doc', '.docx'].includes(ext)) {
        const text = await handleDocFile(filePath);
        extractedTexts.push(text);
      } else {
        console.log('Unsupported file type:', fileName);
      }
    } catch (err) {
      console.error(`Error processing ${fileName}:`, err);
    }
  }

  return extractedTexts.join('\n');
};

module.exports = { processAttachments };

