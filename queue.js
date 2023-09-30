import Bull from 'bull';
import { createInlineKeyboard, sendLongMessage } from './utils.js';

const createQueue = () => {
	const queue = new Bull('bot-queue', {
		redis: { port: 6379, host: '127.0.0.1' },
	});

	queue.process(async (job) => {
		console.log(`Starting job ${job.id}`);

		const longMessage = `
      <b>Lorem ipsum</b> <i>dolor sit amet</i> \nconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis imperdiet proin fermentum leo vel orci porta non. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Mattis molestie a iaculis at erat. Massa enim nec dui nunc mattis enim ut tellus elementum. Ut porttitor leo a diam sollicitudin tempor id eu. In fermentum posuere urna nec tincidunt. Tortor id aliquet lectus proin nibh nisl condimentum id. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl. At tempor commodo ullamcorper a lacus vestibulum. Sed id semper risus in hendrerit gravida rutrum quisque non. Gravida rutrum quisque non tellus orci ac auctor. Fermentum dui faucibus in ornare quam viverra orci. Purus in massa tempor nec feugiat nisl pretium. Non enim praesent elementum facilisis leo vel.
      Mi bibendum neque egestas congue quisque egestas. Cursus turpis massa tincidunt dui ut ornare lectus sit. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Quis hendrerit dolor magna eget est lorem ipsum dolor. At in tellus integer feugiat scelerisque varius. Diam volutpat commodo sed egestas egestas fringilla phasellus. Sed nisi lacus sed viverra tellus in hac habitasse platea. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Pellentesque pulvinar pellentesque habitant morbi. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. At in tellus integer feugiat.
      `;

		const inline_keyboard = createInlineKeyboard(
			'eth',
			'0xb8cb60d07056d54df518785de9600bd4e6b2b53b'
		);

		return await sendLongMessage(job.data.chatId, job.data.messageId, longMessage);
	});

	return queue;
};

export default createQueue;
