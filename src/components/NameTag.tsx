import styles from './NameTag.module.css';

function getFontSize(name: string): number {
  const len = name.trim().length;
  if (len <= 2) return 40;
  if (len <= 4) return 34;
  if (len <= 7) return 24;
  return 19;
}

interface NameTagProps {
  name: string;
}

export function NameTag({ name, theme = 0 }: NameTagProps & { theme?: number }) {
  const fontSize = getFontSize(name);
  const themeClass = (styles as Record<string, string>)[`theme${theme}`] ?? '';

  return (
    <div className={`${styles.tag} ${themeClass}`}>
      <div className={styles.nameBox}>
        <span className={styles.name} style={{ fontSize }}>
          {name}
        </span>
      </div>
    </div>
  );
}
