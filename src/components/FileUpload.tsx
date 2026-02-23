import { useRef, useState } from 'react';

import { parseNames } from '../utils/parseExcel';
import styles from './FileUpload.module.css';

interface FileUploadProps {
  onNames: (names: string[]) => void;
}

export function FileUpload({ onNames }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('xlsx 또는 xls 파일만 지원합니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const names = await parseNames(file);
      onNames(names);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>D.ONE SEMINAR</h1>
      <p className={styles.subtitle}>이름표 자동 생성기</p>

      <div
        className={`${styles.dropZone} ${dragOver ? styles.dragOver : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <span className={styles.dropIcon}>📋</span>
        <p className={styles.dropText}>
          {loading ? '파싱 중...' : '참가자 리스트 xlsx 파일을 여기에 드롭하거나 클릭하세요'}
        </p>
        <p className={styles.dropHint}>필수 컬럼: "이름"</p>
      </div>

      {error && <p className={styles.error}>⚠️ {error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        className={styles.hiddenInput}
        onChange={handleChange}
      />
    </div>
  );
}
