'use client';

import styles from './NavigationMobile.module.css';

type Section = 'application' | 'relationship' | 'settings' | 'support';

export default function NavigationMobile({
  currentSection,
  setSection,
}: {
  currentSection: Section;
  setSection: (s: Section) => void;
}) {
  return (
    <nav className={styles.bar} aria-label="Нижняя навигация">
      <button
        className={`${styles.item} ${currentSection === 'application' ? styles.active : ''}`}
        onClick={() => setSection('application')}
      >
        Анкета
      </button>

      <button
        className={`${styles.item} ${currentSection === 'relationship' ? styles.active : ''}`}
        onClick={() => setSection('relationship')}
      >
        Отношения
      </button>

      <button
        className={`${styles.item} ${currentSection === 'settings' ? styles.active : ''}`}
        onClick={() => setSection('settings')}
      >
        Настройки
      </button>

      <button
        className={`${styles.item} ${currentSection === 'support' ? styles.active : ''}`}
        onClick={() => setSection('support')}
      >
        Поддержка
      </button>
    </nav>
  );
}
