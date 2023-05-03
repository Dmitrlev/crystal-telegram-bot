const TOKEN = '6293830536:AAE7dyGTJVrUXMLXUS9VsiGwEr4VDrFH9QM';
const TelegramApi = require('node-telegram-bot-api');
const bot = new TelegramApi(TOKEN, {polling: true});

const {typeCleaningBTN, typeCommands, roomsBTN} = require('./radios');

const start = '/start';
const order = 'Order cleaning 🧹';
const price = '💸\nSee prices';
const info = 'ℹ️\nInformation';

bot.setMyCommands([
  {command: '/start', description: 'Начать'},
  // {command: '/order', description: 'Заказать уборку'},
  // {command: '/info', description: 'Информация о компании'},
]);

bot.on('message', (msg) => {
  const command = msg.text;
  const chatId = msg.chat.id;
  const name = msg.chat.first_name;
  requests({command, chatId, name})();
});

const requests = ({command, chatId, name = ''}) => {
  switch (command) {
    case start:
      return () => {
        const MESSAGE = `${name}, "Welcome to our Crystal Cleaning bot!\n\nWe are glad to see you here. With the help of our bot you can get information about our services, work schedule and prices, as well as order cleaning online. If you have any questions, our managers are always ready to help.\n\nWe wish you a pleasant use of our bot!"`;
        return bot.sendMessage(chatId, MESSAGE, typeCommands);
      };
    case order:
      return () => {
       return bot.sendMessage(chatId, 'Choose the type of cleaning:', typeCleaningBTN)
      };
    case price:
      return () => bot.sendMessage(chatId, 'Прайс компании!');
    case info:
      return () => bot.sendMessage(chatId, 'Crystal cleaning - это процесс очистки различных поверхностей от пыли, грязи, пятен и других загрязнений с использованием специальных инструментов и химических растворов. Этот процесс может применяться для очистки различных типов поверхностей, включая стекло, керамику, металлы, пластмассы и многие другие материалы.\n' + '\n' + 'Процесс очистки кристалла начинается с удаления грубых загрязнений с помощью щетки или пылесоса. Затем на поверхность наносится специальный раствор, который помогает размягчить и удалить оставшиеся загрязнения. После этого поверхность тщательно промывается и протирается до полного удаления раствора и любых оставшихся загрязнений.\n' + '\n' + 'Очистка кристалла может быть особенно важна для таких предметов, как хрустальные вазы, стеклянные чаши, кристальные люстры и другие декоративные предметы. Эти предметы часто используются для создания эффекта роскоши и изысканности в интерьере, и должны регулярно очищаться для поддержания своего блеска и привлекательности.\n' + '\n' + 'Кроме того, очистка кристалла может быть необходима для удаления остатков от смазки и других химических веществ, которые могут оставаться на стеклянных поверхностях после механических работ или производства.\n' + '\n' + 'В целом, очистка кристалла является важным процессом для поддержания красоты и долговечности предметов из стекла и кристалла. При правильном уходе и регулярной очистке эти предметы могут сохранять свой блеск и привлекательность на протяжении многих лет.');
    default: return () => null;
  }
};

bot.on('callback_query', async (query) => {
  const type = query.data;
  const chatId = query.message.chat.id;
  const message_id = query.message.message_id;

  if(
    type === 'Lite' ||
    type === 'Premium' ||
    type === 'PremiumUltra' ||
    type === 'Supportive hourly cleaning for one-room apartments'
  ) {
    await bot.sendMessage(chatId, `Type of cleaning: ${type}.`)
    await bot.sendMessage(chatId, 'Select number of rooms:', roomsBTN);
    setTimeout(() => bot.deleteMessage(chatId, message_id), 100);
  } else if (type >= 1 && type <= 10) {
    await bot.sendMessage(chatId, `Number of rooms: ${type}.`)
    setTimeout(() => bot.deleteMessage(chatId, message_id), 100);
  }

});

