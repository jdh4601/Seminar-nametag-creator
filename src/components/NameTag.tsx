import styles from './NameTag.module.css';

function getFontSize(name: string): number {
  const len = name.trim().length;
  if (len <= 2) return 36;
  if (len <= 4) return 30;
  if (len <= 7) return 22;
  return 18;
}

interface NameTagProps {
  name: string;
}

export function NameTag({ name }: NameTagProps) {
  const fontSize = getFontSize(name);

  return (
    <div className={styles.tag}>
      <div className={styles.nameBox}>
        <span className={styles.name} style={{ fontSize }}>
          {name}
        </span>
      </div>
    </div>
  );
}
