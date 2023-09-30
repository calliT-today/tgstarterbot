import dotenv from 'dotenv';
dotenv.config();
import { Telegraf } from 'telegraf';

const BOT_TOKEN = process.env.BOT_TOKEN;
const botInstance = new Telegraf(BOT_TOKEN);

export const sendChatAction = async (chatId, action) => {
	return await botInstance.telegram.sendChatAction(chatId, action);
};

export const sendMessage = async (chatId, text, options) => {
	return await botInstance.telegram.sendMessage(chatId, text, options);
};

export const launchBot = () => {
	botInstance.launch();
};

export const handleStart = (callback) => {
	botInstance.start(callback);
};

export const handleCommand = (commands, callback) => {
	botInstance.command(commands, callback);
};

export const handleMessage = (callback) => {
	botInstance.on('message', callback);
};
