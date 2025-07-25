const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../db')



class ParseController {
  async parseBlog(req, res, next) {
    try {
      const { word } = req.body;
      if (!word) {
        return res.status(400).json({ message: 'Не передано слово для поиска' });
      }

      const { data: html } = await axios.get('https://is-systems.org/blog');
      const $ = cheerio.load(html);
      const results = [];

      // Пройтись по всем заголовкам статей (h3)
      $('h3').each((_, element) => {
        const anchor = $(element).find('a');
        const title = anchor.text().trim();
        const link = 'https://is-systems.org' + anchor.attr('href');
        const date = $(element).next().text().trim();
        const descr = $(element).next().next().text().trim();

        const fullText = (title + ' ' + descr).toLowerCase();
        const searchWord = word.toLowerCase();

        if (fullText.includes(searchWord)) {
          results.push({ title, descr, date, link });
        }
      });

      await db('posts').del();

      if (!results.length) {
        console.log('Запрос прошел, но ничего не найдено')
        return res.json(results);
      }

      const formatted = results.map(post => ({
        title: post.title,
        descr: post.descr,
        date: post.date,
        link: post.link,
      })).filter(post => post.date !== null);

      if (!formatted.length) {
        return res.status(500).json({ message: 'Невозможно записать пустой массив данных в бд' });
      }

      await db('posts').insert(formatted);
      console.log('Запрос прошел, данные сохранены в бд')
      return res.json(results);
    } catch (error) {
      console.error('Ошибка парсинга:', error);
      res.status(500).json({ message: 'Ошибка при парсинге сайта' });
    }
  }


  async getHistoryBlog(req, res, next) {
    try {
      const posts = await db('posts').select('*').orderBy('date', 'desc');
      res.json(posts);
    } catch (error) {
      console.error('Ошибка получения истории:', error);
      res.status(500).json({ message: 'Ошибка при получении истории' });
    }
  }
}
module.exports = new ParseController()