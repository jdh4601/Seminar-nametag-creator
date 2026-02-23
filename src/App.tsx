import { useState } from 'react';

import { FileUpload } from './components/FileUpload';
import { A4Page } from './components/A4Page';
import { chunkEntries, distributeThemes, type NameEntry } from './utils/parseExcel';
import { exportToPdf } from './utils/exportPdf';
import styles from './App.module.css';

function App() {
  const [pages, setPages] = useState<NameEntry[][] | null>(null);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState('');

  const handleNames = (names: string[], themeCount: number) => {
    const assigned = distributeThemes(names, themeCount);
    setPages(chunkEntries(assigned, 9));
  };

  const handleExport = async () => {
    setExporting(true);
    setProgress('PDF 생성 중...');

    try {
      await exportToPdf((page, total) => {
        setProgress(`페이지 ${page}/${total} 렌더링 중...`);
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'PDF 생성 실패');
    } finally {
      setExporting(false);
      setProgress('');
    }
  };

  const handleReset = () => {
    setPages(null);
  };

  if (!pages) {
    return <FileUpload onNames={handleNames} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <span className={styles.info}>
          총 {pages.reduce((s, p) => s + p.length, 0)}명 / {pages.length}페이지
        </span>

        {progress && <span className={styles.progress}>{progress}</span>}

        <div className={styles.actions}>
          <button
            className={styles.resetBtn}
            onClick={handleReset}
            disabled={exporting}
          >
            다시 선택
          </button>
          <button
            className={styles.printBtn}
            onClick={() => window.print()}
            disabled={exporting}
          >
            🖨️ 인쇄
          </button>
          <button
            className={styles.exportBtn}
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? '생성 중...' : '📄 PDF 다운로드'}
          </button>
        </div>
      </div>

      <div className={styles.preview}>
        {pages.map((names, i) => (
          <A4Page key={i} names={names} pageIndex={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
