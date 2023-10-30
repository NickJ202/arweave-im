export const ASSET_CONTRACT = {
	src: 'Of9pi--Gj7hCTawhgxOwbuWnFI1h24TTgO5pw8ENJNQ',
};

export const GROUP_CONTRACT = {
	src: 'pIgLouud9Lwykr11apVURXYgR2ynYSwUZUV_cZpS23U',
};

export const PAGINATOR = 100;

export const STORAGE = {
	none: 'N/A',
};

export const CURSORS = {
	p1: 'P1',
	end: 'END',
};

export const TAGS = {
	keys: {
		ans110: {
			title: 'Title',
			description: 'Description',
			topic: 'Topic:*',
			type: 'Type',
			implements: 'Implements',
			license: 'License',
		},
		contentType: 'Content-Type',
		contractSrc: 'Contract-Src',
		dataProtocol: 'Data-Protocol',
		dataSource: 'Data-Source',
		dateCreated: 'Date-Created',
		groupChannel: 'Group-Channel',
		groupId: 'Group-Id',
		groupMember: 'Group-Member',
		groupTitle: 'Group-Title',
		indexedBy: 'Indexed-By',
		initialOwner: 'Initial-Owner',
		initialGroupOwner: 'Initial-Group-Owner',
		initState: 'Init-State',
		logo: 'Logo',
		messageChannelId: 'Msg-Channel-Id',
		messageData: 'Msg-Data',
		messageGroupId: 'Msg-Group-Id',
		messageGroupVersion: 'Msg-Group-Version',
		name: 'Name',
		profileHexCode: 'Profile-Hex-Code',
		protocolName: 'Protocol-Name',
		uploaderTxId: 'Uploader-Tx-Id',
		renderWith: 'Render-With',
		rootSource: 'Root-Source',
		smartweaveAppName: 'App-Name',
		smartweaveAppVersion: 'App-Version',
		thumbnail: 'Thumbnail',
		topic: (topic: string) => `topic:${topic}`,
	},
	values: {
		ansVersion: 'ANS-110',
		contentTypes: {
			textPlain: 'text/plain',
		},
		messageGroupVersions: {
			'0.1': 'Msg-Group-Version-v1.0',
		},
		profileVersions: {
			'0.2': 'Account-0.2',
			'0.3': 'Account-0.3',
		},
		ticker: 'MSG',
		smartweaveAppName: 'SmartWeaveContract',
		smartweaveAppVersion: '0.3.0',
	},
};

export const CONTENT_TYPES = {
	json: 'application/json',
	textPlain: 'text/plain',
};

export const BUNDLR_CONFIG = {
	currency: 'arweave',
	node: 'https://node2.bundlr.network',
};

export const PROFILE_HEX_CODES = {
	'1': '#FF665C',
	'2': '#D73D5B',
	'3': '#C44EC2',
	'4': '#FF6666',
	'5': '#FF8360',
	'6': '#FD6998',
	'7': '#E75A7C',
	'8': '#DE2BC0',
	'9': '#DA008F',
	'10': '#FF4D50',
};
