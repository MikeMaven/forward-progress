const { ContentText, Language, Content } = require('../db/models');

exports.fetchAppByLanguage = async req => {
  try {
    const languages = await Language.findAll({});

    const language =
      languages.find(({ locale }) => locale === req.cookies.lang) ||
      languages.find(({ locale }) => locale === 'en-US');

    const contentTexts = await ContentText.findAll({
      include: [{ model: Content }],
      where: { languageid: language.id }
    });

    const content = {};

    contentTexts.map(el => {
      content[el.Content.key] = el.text;
    });

    const cultures = languages.map(lang => ({
      value: lang.locale,
      text: `${lang.description} - (${lang.locale})`,
      current: req.cookies.lang === lang.locale || 'en-US' === lang.locale
    }));

    return { cultures, content };
  } catch (err) {
    Promise.reject(err);
  }
};

exports.getApp = async (req, res) => {
  const appData = await fetchAppByLanguage(req);
  res.json(appData);
};

exports.setLanguage = (req, res) => {
  if (req.body.culture) {
    res.cookie('lang', req.body.culture);
  }
  res.redirect('/');
};
