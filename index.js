import dotenv from 'dotenv';
dotenv.config();

import createQueue from './queue.js';
import {
	sendChatAction,
	sendMessage,
	launchBot,
	handleStart,
	handleCommand,
	handleMessage,
} from './service.js';

const queue = createQueue();

queue.on('failed', (job, err) => {
	console.log(`Job ${job.id} failed with error ${err.message}`);
});

queue.on('completed', (job, result) => {
	console.log(`Job ${job.id} completed with result:`, result);
});

handleStart((ctx) => ctx.reply('Welcome to Telegraf starter bot\n\nsay /wassup'));

handleCommand(['wassup', 'sup'], async (ctx) => {
	try {
		await sendChatAction(ctx.chat.id, 'typing'); // disable for topics as this shows on main chat
		queue.add(
			{ chatId: ctx.chat.id, messageId: ctx.message.message_id },
			{
				attempts: 5,
				backoff: {
					type: 'fixed',
					delay: 2000,
				},
			}
		);
	} catch (error) {
		console.error('Error adding job to queue:', error);
	}
});

handleMessage(async (ctx) => {
	await sendMessage(
		ctx.chat.id,
		'You talking to me? Remove on message to only get replies to commands',
		{
			reply_to_message_id: ctx.message.message_id,
		}
	);
});

launchBot();
