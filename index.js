require('dotenv').config();

const { Bot, GrammyError, HttpError, Keyboard } = require('grammy');
const bot = new Bot(process.env.BOT_API_KEY);

const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const pray = {

};

const databaseId = 'fff6f0d33c1c81159201c4a06e15c6dc';

bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Запуск бота',
    },
    {
        command: 'pray',
        description: 'Начать процесс инициации',
    }
]);

bot.command(['say_hello', 'hello', 'say_hi'], async (ctx) => {
    await ctx.reply('hello');
});

bot.command('start', async (ctx) => {
    await ctx.reply('Привет, нуждаешься в молитве? Просто выбери команду \'/pray\' чтобы сохранить свою молитву и Церковь будет молиться о тебе!');
});

bot.command('pray', async (ctx) => {
    await ctx.reply('Введи свое имя');
});

bot.command( 'mood', async (ctx) => {
    const moodKeyboard = new Keyboard ().text('Xopoшo').row().text('Норм').row().text ('Плохо').row().resized()
    await ctx.reply('Как настроение?', {
        reply_markup: moodKeyboard
    })
});

bot.hears(['Xopoшo', 'Плохо', 'Норм'], async (ctx) => {
    await ctx.reply('Класc!', {
        reply_markup: {remove_keyboard: true},
    });
})

// await notion.pages.create({
//     parent: {
//         type: "database_id",
//         database_id: databaseId
//     },
//     properties: {
//         "Имя": {
//             rich_text: [
//                 {
//                     text: {
//                         content: "Алекс Кохович"
//                     }
//                 }
//             ]
//         },
//         "Молитва": {
//             title: [
//                 {
//                     text: { content: 'Test' }
//                 }
//             ]
//         }
//     }
// });

// bot.on('message', async (ctx) => {
//     await ctx.reply('Надо подумать ...')
// })

bot.catch(err => {
    const ctx = err.ctx;
    console.error( 'Error while handling update ${ctx.update.update_id}:');
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Error in request:", e);
    } else {
        console.error("Unknown error:", e);
    }
})

bot.start();


// const result = await notion.users.list({});
// const usersName = result.results.map(user => user.name);
//
// await ctx.reply(usersName.join(','));