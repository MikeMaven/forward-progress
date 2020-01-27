/* eslint consistent-return: "off" */
const { ContentText, Language, Content } = require('../db/models');
const errorHandler = require('../errorHandler');

exports.list = async (req, res) => {
  try {
    const { id } = await Language.findOne({
      where: { locale: req.query.lang }
    });

    const allContentText = ContentText.findAll({
      include: [{ model: Content }],
      where: { languageid: id }
    });

    const contentObj = {};

    allContentText.map(el => {
      contentObj[el.Content.key] = el.text;
    });

    res.json(contentObj);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = await Language.findOne({
      where: { locale: req.params.locale }
    });

    const allContentText = ContentText.findAll({
      include: [{ model: Content }],
      where: { languageid: id }
    });

    const contentArr = allContentText.map(content => ({
      id: content.id,
      text: content.text,
      contentKey: content.Content.key
    }));

    res.json(contentArr);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.put = async (req, res) => {
  try {
    const contentText = await ContentText.findOne({
      where: { id: req.body.id }
    });

    const updatedText = await contentText.update({
      text: req.body.text
    });

    res.json(updatedText);
  } catch (error) {
    res.status(400).send(errorHandler(error));
  }
};
