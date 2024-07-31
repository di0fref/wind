import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../locales/en.json';
import se from '../locales/se.json';


i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: {
                translation: en
            },
            se: {
                translation: se
            }
        },
        lng: "se",
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false
        }
    });
export default i18n;
