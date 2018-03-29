import { config, translates } from './config';

interface IObj {
  [key: string]: string;
}

export const Translator = {
  // set config
  /*config(options: any) {
    if (options != null && Object.keys(options).length > 0) {
      Object.keys(options).map((key) => {
        // eslint-disable-line
        if (config[key] !== null) {
          config[key] = options[key];
        } else {
          return new Error(`Key "${key}" does not exists in "config" object`);
        }
      });
    }
  },*/

  // get current language
  current() {
    return config.current;
  },

  // get all languages
  languages() {
    return config.languages;
  },

  // get defaul language
  main() {
    return config.main;
  },

  // Set language (change current language)
  set(locale: string) {
    // check if lang exists in available languages array
    if (config.languages.indexOf(locale) !== -1) {
      config.current = locale;
      sessionStorage.lang = locale;
    } else {
      // Check if is set "lang" session (if yes - use it, else - set defaul lang)
      if (sessionStorage.lang != null && config.languages.indexOf(sessionStorage.lang) !== -1) {
        config.current = sessionStorage.lang;
      } else {
        sessionStorage.setItem('lang', config.defaultLang);
        config.current = config.defaultLang;
      }
    }
  },
};

// Find recursive object e.g. {a: {b: 'some text'}}
const recursive = (obj: IObj, key: string) => {
  return obj && obj[key] ? obj[key] : '';
};

// Translate function
export const t = (key: string, params: IObj = {}) => {
  const obj = translates[Translator.current()];
  const array = key.split('.');
  let newObj: any = obj;

  if (array.length > 0) {
    array.map((value: string) => {
      newObj = recursive(newObj, value);
    });
  }

  // check if exists 'params' and 'newObj' is a String
  if (newObj !== null && Object.keys(params).length > 0 && typeof newObj === 'string') {
    Object.keys(params).map((i: any) => {
      newObj = newObj.replace(':' + i, params[i]).replace(':#' + i, params[i]);
    });
  }

  // Remove param if it`s not required (:#)
  if (newObj !== null && newObj !== undefined) {
    return newObj.replace(/:#(\w+)/g, '').trim();
  }

  return key;
};
