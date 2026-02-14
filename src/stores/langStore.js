import { defineStore } from 'pinia';

// Impor file JSON (Pastikan file ini ada di folder src/locales/)
import en from '../locales/en.json';
import id from '../locales/id.json';
import jp from '../locales/jp.json';
import kr from '../locales/kr.json';
import es from '../locales/es.json';
import zh from '../locales/zh.json';

export const useLangStore = defineStore('language', {
    state: () => ({
        currentLang: localStorage.getItem('user_lang') || 'EN',
        messages: {
            EN: en,
            ID: id,
            JP: jp,
            KR: kr,
            ES: es,
            ZH: zh
        }
    }),
    getters: {
        t: (state) => state.messages[state.currentLang]
    },
    actions: {
        setLanguage(lang) {
            this.currentLang = lang;
            localStorage.setItem('user_lang', lang);
        }
    }
});