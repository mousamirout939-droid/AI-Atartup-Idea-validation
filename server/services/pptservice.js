const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const REPORTS_DIR = path.join(__dirname, '..', 'uploads', 'reports');
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

const BRAND_COLOR = '4F46E5';

/**
 * Turns a PitchDeck document's slides array into a downloadable .pptx file.
 */
async function generatePitchDeckPPT(idea, pitchDeck) {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 });
  pptx.layout = 'WIDE';

  (pitchDeck.slides || []).forEach((slide, index) => {
    const s = pptx.addSlide();
    s.background = { color: index === 0 ? BRAND_COLOR : 'FFFFFF' };

    if (index === 0) {
      s.addText(idea.title, {
        x: 0.6,
        y: 2.6,
        w: 12,
        h: 1.2,
        fontSize: 40,
        bold: true,
        color: 'FFFFFF',
        fontFace: 'Helvetica',
      });
      s.addText(slide.content || '', {
        x: 0.6,
        y: 3.9,
        w: 11,
        h: 1.5,
        fontSize: 16,
        color: 'E0E7FF',
      });
    } else {
      s.addText(slide.title, {
        x: 0.6,
        y: 0.5,
        w: 12,
        h: 0.8,
        fontSize: 28,
        bold: true,
        color: BRAND_COLOR,
      });
      s.addShape('rect', { x: 0.6, y: 1.3, w: 2.2, h: 0.06, fill: { color: BRAND_COLOR } });
      s.addText(slide.content || '', {
        x: 0.6,
        y: 1.7,
        w: 12,
        h: 5,
        fontSize: 16,
        color: '374151',
        valign: 'top',
      });
    }
  });

  const fileName = `pitchdeck-${idea._id}-${uuidv4().slice(0, 8)}.pptx`;
  const filePath = path.join(REPORTS_DIR, fileName);
  await pptx.writeFile({ fileName: filePath });

  return { fileName, filePath, url: `/uploads/reports/${fileName}` };
}

module.exports = { generatePitchDeckPPT };
