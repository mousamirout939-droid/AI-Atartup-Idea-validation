const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const REPORTS_DIR = path.join(__dirname, '..', 'uploads', 'reports');
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

function addSection(doc, title, body) {
  doc.moveDown(0.6);
  doc.fontSize(14).fillColor('#4f46e5').font('Helvetica-Bold').text(title);
  doc.moveDown(0.2);
  doc.fontSize(10.5).fillColor('#1f2937').font('Helvetica').text(body || 'No data available.', {
    align: 'left',
  });
}

function addList(doc, title, items = []) {
  doc.moveDown(0.6);
  doc.fontSize(14).fillColor('#4f46e5').font('Helvetica-Bold').text(title);
  doc.moveDown(0.2);
  doc.fontSize(10.5).fillColor('#1f2937').font('Helvetica');
  if (!items.length) {
    doc.text('No data available.');
    return;
  }
  items.forEach((item) => doc.text(`•  ${item}`));
}

/**
 * Builds a full validation-report PDF from an idea + all of its analysis
 * documents (any of which may be null if that module hasn't run yet).
 */
async function generateIdeaReportPDF(idea, analyses = {}) {
  const { swot, market, competitor, investor, revenue, cost, techstack, businessplan } = analyses;

  const fileName = `report-${idea._id}-${uuidv4().slice(0, 8)}.pdf`;
  const filePath = path.join(REPORTS_DIR, fileName);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(22).fillColor('#111827').font('Helvetica-Bold').text('Startup Validation Report');
    doc.fontSize(11).fillColor('#6b7280').font('Helvetica').text(new Date().toDateString());
    doc.moveDown();
    doc.fontSize(18).fillColor('#111827').font('Helvetica-Bold').text(idea.title);
    doc.fontSize(11).fillColor('#374151').font('Helvetica').text(idea.description);
    doc.fontSize(10).fillColor('#6b7280').text(`Industry: ${idea.industry}  |  Stage: ${idea.stage}`);

    if (idea.viabilityScore != null) {
      doc.moveDown(0.4);
      doc
        .fontSize(12)
        .fillColor('#059669')
        .font('Helvetica-Bold')
        .text(`Viability Score: ${idea.viabilityScore}/100  —  ${idea.verdict || ''}`);
    }

    if (swot) {
      addList(doc, 'Strengths', swot.strengths);
      addList(doc, 'Weaknesses', swot.weaknesses);
      addList(doc, 'Opportunities', swot.opportunities);
      addList(doc, 'Threats', swot.threats);
    }

    if (market) {
      addSection(
        doc,
        'Market Analysis',
        `Market Size: ${market.marketSize}\nGrowth Rate: ${market.growthRate}\n${market.summary}`
      );
    }

    if (competitor) {
      addSection(doc, 'Competitive Landscape', competitor.summary);
      (competitor.competitors || []).forEach((c) => {
        doc.moveDown(0.2);
        doc.fontSize(10.5).font('Helvetica-Bold').text(c.name);
        doc.font('Helvetica').text(c.description);
      });
    }

    if (investor) {
      addSection(
        doc,
        'Investor Score',
        `Overall Score: ${investor.overallScore}/100 (${investor.investmentReadiness})\n${investor.recommendation}`
      );
    }

    if (revenue) {
      addSection(doc, 'Revenue Model', `Primary Model: ${revenue.primaryModel}\n${revenue.summary}`);
    }

    if (cost) {
      addSection(
        doc,
        'Cost Estimate',
        `Estimated First-Year Cost: $${cost.estimatedTotalFirstYear}\n${cost.summary}`
      );
    }

    if (techstack) {
      addSection(
        doc,
        'Recommended Tech Stack',
        `Frontend: ${(techstack.frontend || []).join(', ')}\nBackend: ${(techstack.backend || []).join(', ')}\nDatabase: ${(techstack.database || []).join(', ')}`
      );
    }

    if (businessplan) {
      addSection(doc, 'Executive Summary', businessplan.executiveSummary);
    }

    doc.end();

    stream.on('finish', () => resolve({ fileName, filePath, url: `/uploads/reports/${fileName}` }));
    stream.on('error', reject);
  });
}

module.exports = { generateIdeaReportPDF };
