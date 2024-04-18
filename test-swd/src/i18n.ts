import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'th',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
          'en' : 'EN',
          'th' : 'TH',
          'back': 'Home',
          'title1':'Test 1',
          'title2':'Test 2',
          'subTitle1': 'Layout & Style',
          'subTitle2': 'Form & Table',
          'moveShape' : 'Move shepe',
          'movePosition' : 'Move position',
        }
      },
      th: {
        translation: {
          'en' : 'อังกฤษ',
          'th' : 'ไทย',
          'back' : 'หน้าหลัก',
          'title1':'แบบทดสอบที่ 1',
          'title2':'แบบทดสอบที่ 2',
          'subTitle1': 'การจัดการหน้าเว็บ',
          'subTitle2': 'การจัดการฟอร์ม',
          'moveShape' : 'เลื่อนรูปแบบ',
          'movePosition' : 'เลื่อนตำแหน่ง',
        }
      }
    }
  });

export default i18n;