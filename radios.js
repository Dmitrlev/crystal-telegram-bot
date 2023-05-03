const webAppUrl = 'https://dmitrlev.github.io/crystal-cleaning-app';

module.exports = {
  typeCleaningBTN: {
    reply_markup: {
      inline_keyboard: [
        [
          {text: 'Lite', callback_data: 'Lite'},
          {text: 'Premium', callback_data: 'Premium'},
          {text: 'Premium Ultra', callback_data: 'PremiumUltra'},
        ],
        [
          {text: 'Supportive hourly cleaning for one-room apartments', callback_data: 'Supportive hourly cleaning for one-room apartments'}
        ],
      ],
    },
  },
  roomsBTN: {
    reply_markup: {
      inline_keyboard: [
        [
          {text: '1', callback_data: 1},
          {text: '2', callback_data: 2},
          {text: '3', callback_data: 3},
          {text: '4', callback_data: 4},
          {text: '5', callback_data: 5},
        ],
      ],
    },
  },
  typeCommands: {
    reply_markup: {
      keyboard: [
        [
          {text: 'Order cleaning 🧹', web_app: {url: webAppUrl}},
        ],
        [
          {text: '💸\nSee prices'},
          {text: 'ℹ️\nInformation'},
          {text: 'Language\n(AR, EN)'},
        ],
      ],
    },
  },
};

// [
//   {text: '⬅️ HOME', callback_data: '/start'}
// ],