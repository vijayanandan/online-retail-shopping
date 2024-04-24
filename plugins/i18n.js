import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  const getSelectedLang = 'en'
  app.i18n = new VueI18n({
    locale: getSelectedLang,
    fallbackLocale: getSelectedLang,
    messages: {
      en: require('~/locales/en.json')
    }
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
