import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import id from './locales/id.json';
import jp from './locales/jp.json';
import kr from './locales/kr.json';
import zh from './locales/zh.json';
import es from './locales/es.json';

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('user_lang') || 'en',
    fallbackLocale: 'en',
    messages: {
        en, id, jp, kr, zh, es
    }
});

export default i18n;