const DB = require('../../db/models');
const { content_text, language } = DB;

/**
 * For site display purpose
 */
const getContent = async req => {
  const languages = await language.findAll({});
  const currentLanguage = languages.find(
    l => l.locale === (req.cookies.lang || 'en-US')
  );
  return content_text
    .findAll({
      include: [
        {
          model: DB.content
        }
      ],
      where: {
        languageid: currentLanguage.id
      }
    })
    .then(list => {
      const content = {};

      list.forEach(item => {
        content[item.content.key] = item.text;
      });

      return {
        cultures: languages.map(l => ({
          value: l.locale,
          text: `${l.description} - (${l.locale})`,
          current: (req.cookies.lang || 'en-US') === l.locale
        })),
        content
      };
    })
    .catch(err => Promise.reject(err));
};

exports.setLanguage = async (req, res) => {
  if (req.body.culture) {
    res.cookie('lang', req.body.culture);
  }
  res.redirect('/');
};

exports.get = (req, res) => {
  getContent(req).then(appData => res.json(appData));
};

exports.content = getContent;
