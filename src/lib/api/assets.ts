import Stamps from '@permaweb/stampjs';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import { API_CONFIG } from 'helpers/config';

import { getGQLData } from '../gql';
import {
	AGQLResponseType,
	ASSET_CONTRACT,
	AssetArgsClientType,
	AssetCreateArgsClientType,
	AssetType,
	ChannelResponseType,
	CursorEnum,
	getTagValue,
	GQLNodeResponseType,
	logValue,
	TAGS,
	TagType,
} from '../helpers';

import { createContract, createTransaction } from '.';

export async function getAssetsByChannel(args: AssetArgsClientType): Promise<ChannelResponseType> {
	try {
		const gqlData: AGQLResponseType = await getGQLData({
			ids: null,
			tagFilters: [{ name: TAGS.keys.messageChannelId, values: args.ids }],
			owners: args.owners,
			cursor: args.cursor,
			reduxCursor: null,
			cursorObject: CursorEnum.GQL,
			useBundlrGateway: true,
			useArweaveNet: false,
		});

		const stamps = Stamps.init({
			warp: args.arClient.warp,
			arweave: args.arClient.arweave,
			wallet: args.walletAddress ? new InjectedArweaveSigner(args.walletAddress) : 'use_wallet',
			graphql: `${API_CONFIG.protocol}://${API_CONFIG.arweave}/graphql`,
		});
		const dataIds = gqlData.data.map((element: GQLNodeResponseType) => element.node.id);

		const stampCounts = await withTimeout(2000, stamps.counts(dataIds)).catch(e => {
			console.error(e)
		});

		// TODO: connectedWalletStamped 429
		const responseDataPromises: Promise<AssetType>[] = gqlData.data.map(async (element: GQLNodeResponseType) => {
			// const connectedWalletStamped = await withTimeout(1000, stamps.hasStamped(element.node.id)).catch(_e => {
			// 	return false;
			// });

			const connectedWalletStamped = false;
			
			return {
				id: element.node.id,
				dateCreated: Number(getTagValue(element.node.tags, TAGS.keys.dateCreated)),
				message: getTagValue(element.node.tags, TAGS.keys.messageData),
				owner: getTagValue(element.node.tags, TAGS.keys.initialOwner),
				stamps: stampCounts && stampCounts[element.node.id]
					? {
						...stampCounts[element.node.id],
						connectedWalletStamped: args.walletAddress
							? connectedWalletStamped
							: false
					}
					: { total: 0, vouched: 0, connectedWalletStamped: false },
			};
		});

		const responseData: AssetType[] = await Promise.all(responseDataPromises);

		return {
			data: responseData,
			nextCursor: gqlData.nextCursor,
			previousCursor: null,
		};
	} catch (error: any) {
		console.error(error);
		return {
			data: [],
			nextCursor: null,
			previousCursor: null,
		};
	}
}

export async function getAssetById(args: { assetId: string; arClient: any }): Promise<AssetType | null> {
	const gqlData: AGQLResponseType = await getGQLData({
		ids: [args.assetId],
		tagFilters: null,
		owners: null,
		cursor: null,
		reduxCursor: null,
		cursorObject: null,
		useBundlrGateway: true,
		useArweaveNet: false,
	});

	if (gqlData && gqlData.data.length) {
		const element = gqlData.data[0];
		return {
			id: element.node.id,
			dateCreated: Number(getTagValue(element.node.tags, TAGS.keys.dateCreated)),
			message: getTagValue(element.node.tags, TAGS.keys.messageData),
			owner: getTagValue(element.node.tags, TAGS.keys.initialOwner),
			stamps: { total: 0, vouched: 0, connectedWalletStamped: false },
		};
		return null;
	} else return null;
}

export async function createAsset(args: AssetCreateArgsClientType): Promise<string | null> {
	const assetId = await createTransaction({
		arClient: args.arClient,
		content: args.content,
		contentType: args.contentType,
		tags: createAssetTags(args),
	});
	const contractId = await createContract({ arClient: args.arClient, assetId: assetId });
	if (contractId) {
		logValue(`Deployed Contract`, contractId, 0);
		return contractId;
	} else {
		return null;
	}
}

function createAssetTags(args: AssetCreateArgsClientType): TagType[] {
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
		{ name: TAGS.keys.contractSrc, value: ASSET_CONTRACT.src },
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
		{ name: TAGS.keys.messageData, value: args.content },
	];

	args.topics.forEach((topic: string) => tags.push({ name: TAGS.keys.topic(topic), value: topic }));

	if (args.dataProtocol) tags.push({ name: TAGS.keys.dataProtocol, value: args.dataProtocol });
	if (args.dataSource) tags.push({ name: TAGS.keys.dataSource, value: args.dataSource });
	if (args.renderWith)
		args.renderWith.forEach((renderWith: string) => tags.push({ name: TAGS.keys.renderWith, value: renderWith }));

	return tags;
}

function withTimeout<T>(ms: number, promise: Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Promise timed out'));
        }, ms);

        promise.then((value) => {
            clearTimeout(timer);
            resolve(value);
        }).catch((error) => {
            clearTimeout(timer);
            reject(error);
        });
    });
}
