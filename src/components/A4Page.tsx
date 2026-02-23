import { NameTag } from './NameTag';
import styles from './A4Page.module.css';

interface A4PageProps {
  names: string[];
  pageIndex: number;
}

export function A4Page({ names, pageIndex }: A4PageProps) {
  return (
    <div className={styles.page} data-page={pageIndex}>
      <div className={styles.grid}>
        {names.map((name, i) => (
          <NameTag key={`${pageIndex}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}
