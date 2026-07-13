import { FileSpreadsheet } from 'lucide-react';
import Button from '../common/button';

// Client-side CSV export (no extra backend endpoint needed) — good enough for
// "export to spreadsheet" of an idea's key numeric results.
export default function ExportExcel({ idea, analyses = {} }) {
  const handleExport = () => {
    const rows = [
      ['Field', 'Value'],
      ['Title', idea.title],
      ['Industry', idea.industry],
      ['Viability Score', idea.viabilityScore ?? ''],
      ['Verdict', idea.verdict ?? ''],
      ['Market Size', analyses.market?.marketSize ?? ''],
      ['Growth Rate', analyses.market?.growthRate ?? ''],
      ['Investor Score', analyses.investor?.overallScore ?? ''],
      ['Primary Revenue Model', analyses.revenue?.primaryModel ?? ''],
      ['Est. First-Year Cost', analyses.cost?.estimatedTotalFirstYear ?? ''],
    ];

    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${idea.title.replace(/\s+/g, '-').toLowerCase()}-summary.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="secondary" icon={FileSpreadsheet} onClick={handleExport}>
      Export CSV
    </Button>
  );
}
