import * as XLSX from 'xlsx';

export function parseNames(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // 모든 시트를 순서대로 탐색해서 이름 데이터를 찾음
        for (const sheetName of workbook.SheetNames) {
          const sheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

          // Case 1: "이름" 컬럼이 직접 있는 경우
          const direct = rows
            .map((row) => String(row['이름'] ?? '').trim())
            .filter((name) => name.length > 0 && name !== '이름');

          if (direct.length > 0) {
            resolve(direct);
            return;
          }

          // Case 2: 헤더가 여러 행에 걸쳐있어 __EMPTY_N 형태로 파싱된 경우
          // "이름" 값이 있는 행을 찾아 해당 키를 확인
          const headerRow = rows.find((row) =>
            Object.values(row).some((v) => String(v).trim() === '이름')
          );

          if (headerRow) {
            const nameKey = Object.entries(headerRow).find(
              ([, v]) => String(v).trim() === '이름'
            )?.[0];

            if (nameKey) {
              const names = rows
                .map((row) => String(row[nameKey] ?? '').trim())
                .filter((name) => name.length > 0 && name !== '이름');

              if (names.length > 0) {
                resolve(names);
                return;
              }
            }
          }
        }

        reject(new Error('"이름" 컬럼을 찾을 수 없거나 데이터가 없습니다.'));
      } catch {
        reject(new Error('Excel 파일을 읽는 중 오류가 발생했습니다.'));
      }
    };

    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsArrayBuffer(file);
  });
}

export function chunkNames(names: string[], size = 9): string[][] {
  const pages: string[][] = [];
  for (let i = 0; i < names.length; i += size) {
    pages.push(names.slice(i, i + size));
  }
  return pages;
}

export function getFontSize(name: string): number {
  const len = name.length;
  if (len <= 4) return 32;
  if (len <= 7) return 24;
  return 18;
}
