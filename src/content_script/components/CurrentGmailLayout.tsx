import * as React from 'react';

import type ICurrentGmailLayout from '../interfaces/ICurrentGmailLayout';

import styles from '../sass/CurrentGmailLayout.module.scss';

function CurrentGmailLayout({ densityType, inboxType, readingPaneType }: ICurrentGmailLayout) {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <span className={styles.label}>Density</span>
        <img
          className={styles.image}
          src={densityType?.image?.src}
          srcSet={densityType?.image?.srcset}
          alt={densityType?.name}
        />
        <span className={styles.name}>{densityType?.name}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Inbox type</span>
        <img
          className={styles.image}
          src={inboxType?.image?.src}
          srcSet={inboxType?.image?.srcset}
          alt={inboxType?.name}
        />
        <span className={styles.name}>{inboxType?.name}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Reading pane</span>
        <img
          className={styles.image}
          src={readingPaneType?.image?.src}
          srcSet={readingPaneType?.image?.srcset}
          alt={readingPaneType?.name}
        />
        <span className={styles.name}>{readingPaneType?.name}</span>
      </div>
    </div>
  );
}

export default CurrentGmailLayout;
