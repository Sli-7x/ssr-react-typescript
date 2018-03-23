interface IConfig {
  languages: string[];
  main: string;
  current: string;
  defaultLang: string;
}
export let config: IConfig = {
  languages: ['lt'],
  main: 'lt',
  current: 'lt',
  defaultLang: 'lt',
};

// Load all translations files
export const translates: any = {
  lt: require('../../../locales/lt/index').default,
  // en: require('./lang/lt/index.js').default
};
