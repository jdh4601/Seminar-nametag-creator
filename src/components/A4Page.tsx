import { NameTag } from './NameTag';
import type { NameEntry } from '../utils/parseExcel';
import styles from './A4Page.module.css';

interface A4PageProps {
  names: NameEntry[];
  pageIndex: number;
}

export function A4Page({ names, pageIndex }: A4PageProps) {
  return (
    <div className={styles.page} data-page={pageIndex}>
      <div className={styles.grid}>
        {names.map((entry, i) => (
          <NameTag key={`${pageIndex}-${i}`} name={entry.name} theme={entry.theme} />
        ))}
      </div>
    </div>
  );
}
