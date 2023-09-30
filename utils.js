import { sendMessage } from './service.js';

const MAX_MESSAGE_LENGTH = 4096;

export const sendLongMessage = async (chatId, messageId, longMessage, etc = {}) => {
	while (longMessage.length > 0) {
		const messageChunk = longMessage.slice(0, MAX_MESSAGE_LENGTH);

		try {
			await sendMessage(chatId, messageChunk, {
				parse_mode: 'HTML',
				disable_web_page_preview: true,
				reply_to_message_id: messageId,
				...etc,
			});
			return 'success';
		} catch (error) {
			sendMessage(chatId, 'oops, something went wrong');
			return 'error';
		}
	}
};

export const createInlineKeyboard = (chainId, address) => {
	let buttons = [];

	if (chainId === 'eth') {
		buttons.push([
			{
				text: '👥 Holders',
				url: `https://etherscan.io/token/${address}#balances`,
			},
			{
				text: '📈 Chart',
				url: `https://www.dextools.io/app/en/ether/pair-explorer/${address}`,
			},
		]);
	} else if (chainId === 'bsc') {
		buttons.push([
			{
				text: '👥 Holders',
				url: `https://bscscan.com/token/${address}#balances`,
			},
			{
				text: '📈 Chart',
				url: `https://www.dextools.io/app/en/bnb/pair-explorer/${address}`,
			},
		]);
	}

	const secondRow = [];

	secondRow.push({
		text: '🟣🔵 Bubblemaps',
		url: `https://app.bubblemaps.io/${chainId}/token/${address}`,
	});

	buttons.push(secondRow);

	return { reply_markup: { inline_keyboard: buttons } };
};

export const extractAddressFromMessage = (message) => {
	const regex = /^0x[a-fA-F0-9]{40}$/;
	const result = message?.match(regex);
	return result ? result[0] : null;
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
