import { getGQLData, getGQLDataByIds } from '../gql';
import {
	AGQLResponseType,
	AssetArgsClientType,
	AssetCreateArgsClientType,
	AssetDetailType,
	AssetsResponseType,
	AssetType,
	BalanceType,
	CONTENT_TYPES,
	getBalancesEndpoint,
	getTagValue,
	GQLResponseType,
	log,
	logValue,
	ORDERBOOK_CONTRACT,
	OrderBookPairOrderType,
	OrderBookPairType,
	STORAGE,
	TAGS,
	TagType,
	UDL_ICONS,
	UDL_LICENSE_VALUE,
	UDLType,
	UserBalancesType,
} from '../helpers';

export async function createAsset(args: AssetCreateArgsClientType): Promise<string | null> {
	const assetId = await createTransaction({
		arClient: args.arClient,
		content: args.content,
		contentType: args.contentType,
		tags: createTags(args),
	});
	const contractId = await createContract({ arClient: args.arClient, assetId: assetId });
	if (contractId) {
		logValue(`Deployed Contract`, contractId, 0);
		return contractId;
	} else {
		return null;
	}
}

export async function getAssetsByChannel(args: AssetArgsClientType): Promise<AssetsResponseType> {
	try {
		const gqlData: AGQLResponseType = await getGQLData({
			ids: null,
			tagFilters: [{ name: TAGS.keys.messageChannelId, values: args.ids.map((id: string) => id) }],
			uploader: args.uploader,
			cursor: null,
			reduxCursor: null,
			cursorObject: null,
			arClient: args.arClient,
			useArweaveBundlr: true,
		});

		return {
			assets: gqlData.data,
			nextCursor: gqlData.nextCursor,
			previousCursor: null,
		};
	} catch (error: any) {
		throw new Error(error);
	}
}

export async function getAssetById(args: { assetId: string, arClient: any }): Promise<GQLResponseType | null> {
	const gqlData: AGQLResponseType = await getGQLData({
		ids: [args.assetId],
		tagFilters: null,
		uploader: null,
		cursor: null,
		reduxCursor: null,
		cursorObject: null,
		arClient: args.arClient,
		useArweaveBundlr: true,
	});

	if (gqlData && gqlData.data.length) return gqlData.data[0];
	else return null;
}

// export async function getAssetIdsByUser(args: { walletAddress: string; arClient: any }): Promise<string[]> {
// 	try {
// 		const result: any = await fetch(getBalancesEndpoint(args.walletAddress));
// 		if (result.status === 200) {
// 			const balances = ((await result.json()) as UserBalancesType).balances;

// 			const assetIds = balances
// 				.filter((balance: BalanceType) => {
// 					return balance.balance && parseInt(balance.balance) !== 0;
// 				})
// 				.map((balance: BalanceType) => {
// 					return balance.contract_tx_id;
// 				});
// 			return assetIds;
// 		} else {
// 			return [];
// 		}
// 	} catch (e: any) {
// 		return [];
// 	}
// }

// export async function getAssetsByIds(args: AssetArgsClientType): Promise<AssetType[]> {
// 	const gqlData: AssetsResponseType = await getGQLDataByIds({
// 		ids: args.ids,
// 		owner: args.owner,
// 		uploader: args.uploader,
// 		cursor: args.cursor,
// 		reduxCursor: args.reduxCursor,
// 		arClient: args.arClient,
// 		walletAddress: args.walletAddress,
// 		useArweaveBundlr: args.useArweaveBundlr ? args.useArweaveBundlr : false,
// 	});

// 	return getValidatedAssets(gqlData, pairs);
// }

// export async function getAssetById(args: {
// 	id: string;
// 	arClient: any;
// 	orderBookContract: string;
// }): Promise<AssetDetailType> {
// 	const asset = (
// 		await getAssetsByIds({
// 			ids: [args.id],
// 			owner: null,
// 			uploader: null,
// 			cursor: null,
// 			reduxCursor: null,
// 			walletAddress: null,
// 			arClient: args.arClient,
// 			useArweaveBundlr: true,
// 		})
// 	)[0];

// 	if (asset) {
// 		const state = await args.arClient.read(args.id);
// 		let orders = [];
// 		let orderBookState = await args.arClient.read(args.orderBookContract);
// 		let pair = orderBookState.pairs.find((p: any) => {
// 			return p.pair[0] === args.id;
// 		});
// 		if (pair) {
// 			orders = pair.orders.map((order: OrderBookPairOrderType) => {
// 				return { ...order, currency: pair.pair[1] };
// 			});
// 		}
// 		return { ...asset, state: state, orders: orders };
// 	} else {
// 		return null;
// 	}
// }

function createTags(args: AssetCreateArgsClientType): TagType[] {
	const dateTime = new Date().getTime().toString();

	let initStateJson: any = {
		balances: {
			[args.owner]: 1,
		},
		title: args.title,
		description: args.description,
		ticker: args.ticker,
		dateCreated: dateTime,
		claimable: [],
	};

	if (args.dataProtocol) initStateJson.dataProtocol = args.dataProtocol;
	if (args.dataSource) initStateJson.dataSource = args.dataSource;
	if (args.renderWith) initStateJson.renderWith = args.renderWith.map((renderWith: string) => renderWith);

	initStateJson = JSON.stringify(initStateJson);

	const tags: TagType[] = [
		{ name: TAGS.keys.contractSrc, value: TAGS.values.assetContractSrc },
		{ name: TAGS.keys.smartweaveAppName, value: TAGS.values.smartweaveAppName },
		{ name: TAGS.keys.smartweaveAppVersion, value: TAGS.values.smartweaveAppVersion },
		{ name: TAGS.keys.contentType, value: args.contentType },
		{ name: TAGS.keys.initState, value: initStateJson },
		{ name: TAGS.keys.initialOwner, value: args.owner },
		{ name: TAGS.keys.ans110.title, value: args.title },
		{ name: TAGS.keys.ans110.description, value: args.description },
		{ name: TAGS.keys.ans110.type, value: args.type },
		{ name: TAGS.keys.ans110.implements, value: TAGS.values.ansVersion },
		{ name: TAGS.keys.dateCreated, value: dateTime },
		{ name: TAGS.keys.messageChannelId, value: args.channelId },
		{ name: TAGS.keys.messageGroupId, value: args.groupId },
	];

	args.topics.forEach((topic: string) => tags.push({ name: TAGS.keys.topic(topic), value: topic }));

	if (args.dataProtocol) tags.push({ name: TAGS.keys.dataProtocol, value: args.dataProtocol });
	if (args.dataSource) tags.push({ name: TAGS.keys.dataSource, value: args.dataSource });
	if (args.renderWith)
		args.renderWith.forEach((renderWith: string) => tags.push({ name: TAGS.keys.renderWith, value: renderWith }));

	return tags;
}

async function createTransaction(args: { arClient: any; content: any; contentType: string; tags: TagType[] }) {
	let finalContent: any;
	switch (args.contentType) {
		case CONTENT_TYPES.json as any:
			finalContent = JSON.stringify(args.content);
			break;
		default:
			finalContent = args.content;
			break;
	}
	try {
		const txRes = await args.arClient.arweavePost.createTransaction({ data: finalContent }, 'use_wallet');
		args.tags.forEach((tag: TagType) => txRes.addTag(tag.name, tag.value));
		const response = await global.window.arweaveWallet.dispatch(txRes);
		return response.id;
	} catch (e: any) {
		throw new Error(`Error creating transaction ...\n ${e}`);
	}
}

async function createContract(args: { arClient: any; assetId: string }) {
	try {
		const { contractTxId } = await args.arClient.warpDefault.register(args.assetId, 'node2');
		return contractTxId;
	} catch (e: any) {
		logValue(`Error deploying to Warp - Asset ID`, args.assetId, 1);

		const errorString = e.toString();
		if (errorString.indexOf('500') > -1) {
			return null;
		}

		if (errorString.indexOf('502') > -1 || errorString.indexOf('504') > -1 || errorString.indexOf('FetchError') > -1) {
			let retries = 5;
			for (let i = 0; i < retries; i++) {
				await new Promise((r) => setTimeout(r, 2000));
				try {
					log(`Retrying Warp ...`, null);
					const { contractTxId } = await args.arClient.warpDefault.register(args.assetId, 'node2');
					log(`Retry succeeded`, 0);
					return contractTxId;
				} catch (e2: any) {
					logValue(`Error deploying to Warp - Asset ID`, args.assetId, 1);
					continue;
				}
			}
		}
	}

	throw new Error(`Warp retries failed ...`);
}
