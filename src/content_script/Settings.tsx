import * as React from 'react';
import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks/useApp';
import {
  selectDensity, selectInboxType, selectIsVisibleGmailSettings,
  selectIsVisibleSidebar, selectReadingPaneType,
} from '../store/slices/settings/selectors';
import { setSettingsState } from '../store/slices/settings/slice';
import {
  getDensitySettingsSelector, getGmailSettingsParentContainerSelector, getInboxTypeSettingsSelector,
  getReadingPaneSettingsSelector, getSettingsButtonSelector, getSettingsDivSelector,
} from '../utils/helpers';
import useDraggable from '../utils/hooks/useDraggable';
import CurrentGmailLayout from './components/CurrentGmailLayout';

import type { TImage } from '../store/slices/settings/interfaces/ISettings';

import SettingsImage from '../assets/settings.png';

import styles from './sass/Settings.module.scss';

function Settings() {
  const dispatch = useAppDispatch();
  const { style, onMouseDown } = useDraggable();

  const densityType = useAppSelector(selectDensity);
  const inboxType = useAppSelector(selectInboxType);
  const readingPaneType = useAppSelector(selectReadingPaneType);
  const isVisibleSidebar = useAppSelector(selectIsVisibleSidebar);
  const isVisibleGmailSettings = useAppSelector(selectIsVisibleGmailSettings);

  const googleSettingsButton = document.querySelector<HTMLElement>(getSettingsButtonSelector());
  const gmailSettingsParentContainer = document.querySelector<HTMLElement>(getGmailSettingsParentContainerSelector());

  const densityTypeElement = document
    .querySelectorAll<HTMLInputElement>(getDensitySettingsSelector());
  const inboxTypeElement = document
    .querySelectorAll<HTMLInputElement>(getInboxTypeSettingsSelector());
  const readingPaneTypeElement = document
    .querySelectorAll<HTMLInputElement>(getReadingPaneSettingsSelector());

  useEffect(() => {
    googleSettingsButton?.click();
  }, [googleSettingsButton]);

  const getSettingsImage = useCallback((settingsDiv: HTMLElement): TImage | undefined => {
    const image = settingsDiv?.parentElement?.querySelector<HTMLImageElement>('img');
    if (image) {
      return {
        srcset: image?.srcset,
        src: image?.src,
      };
    }
    return undefined;
  }, []);

  const getSettingsValueName = useCallback((settingsDiv: HTMLElement): string => (
    settingsDiv?.parentElement?.querySelector<HTMLElement>('div.Q2')?.innerText || ''
  ), []);

  // Get and set in store current gmail settings
  const getSettingsData = useCallback((settingsDiv: HTMLElement) => {
    if (settingsDiv) {
      const activeDensityType = settingsDiv
        .querySelector<HTMLElement>(`${getDensitySettingsSelector()}:checked`);
      const activeInboxType = settingsDiv
        .querySelector<HTMLElement>(`${getInboxTypeSettingsSelector()}:checked`);
      const activeReadingPaneType = settingsDiv
        .querySelector<HTMLElement>(`${getReadingPaneSettingsSelector()}:checked`);

      if (activeDensityType && activeInboxType && activeReadingPaneType) {
        dispatch(setSettingsState(
          {
            densityType: {
              name: getSettingsValueName(activeDensityType),
              image: getSettingsImage(activeDensityType),
            },
            inboxType: {
              name: getSettingsValueName(activeInboxType),
              image: getSettingsImage(activeInboxType),
            },
            readingPaneType: {
              name: getSettingsValueName(activeReadingPaneType),
              image: getSettingsImage(activeReadingPaneType),
            },
          },
        ));
      }
    }
  }, [dispatch, getSettingsImage, getSettingsValueName]);

  useEffect(() => {
    const config = { childList: true, subtree: true };
    const handleMutation = (mutationsList: MutationRecord[]) => {
      mutationsList.forEach(() => {
        const settingsDiv = document.querySelector<HTMLElement>(getSettingsDivSelector());

        // first render (set default data)
        if ((!densityType?.image && !inboxType?.image && !readingPaneType?.image) && settingsDiv) {
          settingsDiv.style.display = 'none';
          getSettingsData(settingsDiv);
          googleSettingsButton?.click();
        }

        dispatch(setSettingsState({ isVisibleGmailSettings: !!settingsDiv })); // get visibility gmail settings
      });
    };
    const observer = new MutationObserver(handleMutation);
    if (gmailSettingsParentContainer) {
      observer.observe(gmailSettingsParentContainer, config);
    }
    return () => {
      observer.disconnect();
    };
  }, [
    gmailSettingsParentContainer, densityType, googleSettingsButton,
    getSettingsData, inboxType, readingPaneType, dispatch,
  ]);

  useEffect(() => {
    const handleClick = () => {
      const settingsDiv = document.querySelector<HTMLElement>(getSettingsDivSelector());
      if (settingsDiv) {
        getSettingsData(settingsDiv);
      }
    };

    const listenersInput = [
      densityTypeElement, inboxTypeElement, readingPaneTypeElement,
    ];

    listenersInput.forEach((element) => {
      element.forEach((input) => input.addEventListener('click', handleClick));
    });

    return () => {
      listenersInput.forEach((element) => {
        element.forEach((input) => input.removeEventListener('click', handleClick));
      });
    };
  }, [densityTypeElement, inboxTypeElement, readingPaneTypeElement, getSettingsData]);

  const onToggleSidebar = useCallback(() => {
    dispatch(setSettingsState({ isVisibleSidebar: !isVisibleSidebar }));
  }, [isVisibleSidebar, dispatch]);

  const onClickCloseSettings = useCallback(() => {
    if (googleSettingsButton) {
      googleSettingsButton.click();
    }
  }, [googleSettingsButton]);

  return (
    <div className={`${styles.settings} ${!isVisibleSidebar ? styles.containerClosed : ''}`} style={style}>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <button type="button" onClick={onToggleSidebar}>
            <img className={styles.settingsImage} src={SettingsImage} alt="settings" />
          </button>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.header} onMouseDown={onMouseDown} role="presentation" />
          <div className={styles.content}>
            <CurrentGmailLayout densityType={densityType} inboxType={inboxType} readingPaneType={readingPaneType} />
            <button className={styles.closeSettings} type="button" onClick={onClickCloseSettings}>
              {isVisibleGmailSettings ? 'Close Settings' : 'Open Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
