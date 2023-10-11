import { CONTENT_TYPES, getTagValue, GROUP_CONTRACT, logValue, PROFILE_HEX_CODES, TAGS } from 'lib/helpers';

import { DEFAULT_LOGO } from 'helpers/config';

import { getGQLData, getGQLResponseObject } from '../gql';
import { AGQLResponseType, CreateGroupClientArgs, CursorEnum, GQLNodeResponseType, GQLResponseType, TagType } from '../helpers/types';

import { createContract, createTransaction } from '.';

export async function getGroupsByUser(args: { walletAddress: string; arClient: any }): Promise<GQLResponseType> {
	const memberGqlData: AGQLResponseType = await getGQLData({
		ids: null,
		tagFilters: [
			{ name: TAGS.keys.groupMember, values: [args.walletAddress] },
			{
				name: TAGS.keys.messageGroupVersion,
				values: Object.keys(TAGS.values.messageGroupVersions).map(
					(version: string) => TAGS.values.messageGroupVersions[version]
				),
			},
		],
		owners: null,
		cursor: null,
		reduxCursor: null,
		cursorObject: CursorEnum.GQL,
		useArweaveNet: true,
	});

	const groupIds = memberGqlData.data.map((element: GQLNodeResponseType) => getTagValue(element.node.tags, TAGS.keys.groupId));
	
	const groupGqlData: AGQLResponseType = await getGQLData({
		ids: groupIds,
		tagFilters: null,
		owners: null,
		cursor: null,
		reduxCursor: null,
		cursorObject: CursorEnum.GQL,
		useArweaveNet: true,
	});

	return getGQLResponseObject(groupGqlData);
}

export async function createGroup(args: CreateGroupClientArgs): Promise<string | null> {
	let logoId = DEFAULT_LOGO;
	if (args.logo.src) {
		const mimeType = args.logo.src.split(';')[0].split(':')[1];
		logoId = await createTransaction({
			arClient: args.arClient,
			tags: [{ name: TAGS.keys.contentType, value: mimeType }],
			content: args.logo.buffer,
			contentType: mimeType,
		});
	}

	try {
		const assetId = await createTransaction({
			arClient: args.arClient,
			tags: createGroupTags({
				owner: args.owner,
				title: args.title,
				logo: logoId,
			}),
			content: TAGS.values.messageGroupVersions['0.1'],
			contentType: CONTENT_TYPES.textPlain,
		});
		const groupContractId = await createContract({ arClient: args.arClient, assetId: assetId });
		if (groupContractId) {
			logValue(`Deployed Contract`, groupContractId, 0);

			const memberTxId = await addGroupMember({
				arClient: args.arClient,
				groupId: groupContractId,
				groupTitle: args.title,
				walletAddress: args.owner,
				wallet: args.wallet,
			});

			logValue(`Added Group Member`, memberTxId, 0);

			const channelTxId = await addGroupChannel({
				arClient: args.arClient,
				groupId: groupContractId,
				channelTitle: args.initialChannel,
				owner: args.owner,
				wallet: args.wallet,
			});

			logValue(`Added Group Channel`, channelTxId, 0);

			return groupContractId;
		} else {
			return null;
		}
	} catch (e: any) {
		console.error(e);
		return null;
	}
}

function createGroupTags(args: { owner: string; title: string; logo: string }): TagType[] {
	const dateTime = new Date().getTime().toString();

	let initStateJson: any = {
		balances: {
			[args.owner]: 1,
		},
		title: args.title,
		members: [],
		owner: args.owner,
		channels: [],
		dateCreated: dateTime,
		logo: args.logo,
	};

	initStateJson = JSON.stringify(initStateJson);

	const tags: TagType[] = [
		{ name: TAGS.keys.contractSrc, value: GROUP_CONTRACT.src },
		{ name: TAGS.keys.smartweaveAppName, value: TAGS.values.smartweaveAppName },
		{ name: TAGS.keys.smartweaveAppVersion, value: TAGS.values.smartweaveAppVersion },
		{ name: TAGS.keys.contentType, value: CONTENT_TYPES.textPlain },
		{ name: TAGS.keys.initState, value: initStateJson },
		{ name: TAGS.keys.initialOwner, value: args.owner },
		{ name: TAGS.keys.initialGroupOwner, value: args.owner },
		{ name: TAGS.keys.ans110.title, value: args.title },
		{ name: TAGS.keys.logo, value: args.logo },
		{ name: TAGS.keys.dateCreated, value: dateTime },
		{ name: TAGS.keys.messageGroupVersion, value: TAGS.values.messageGroupVersions['0.1'] },
	];

	return tags;
}

export async function addGroupChannel(args: {
	arClient: any;
	groupId: string;
	channelTitle: string;
	owner: string;
	wallet: any;
}): Promise<string | null> {
	try {
		const txId = await createTransaction({
			arClient: args.arClient,
			tags: createGroupChannelTags({
				groupId: args.groupId,
				channelTitle: args.channelTitle,
				initialOwner: args.owner,
			}),
			content: TAGS.keys.groupChannel,
			contentType: CONTENT_TYPES.textPlain,
		});

		await args.arClient.writeContract({
			contract: args.groupId,
			wallet: args.wallet,
			input: {
				function: 'addChannel',
				channel: { id: txId, title: args.channelTitle },
			},
			options: { strict: true },
		});

		return txId;
	} catch (e: any) {
		console.error(e);
		return null;
	}
}

function createGroupChannelTags(args: { groupId: string; channelTitle: string; initialOwner: string }): TagType[] {
	const dateTime = new Date().getTime().toString();

	const tags: TagType[] = [
		{ name: TAGS.keys.groupId, value: args.groupId },
		{ name: TAGS.keys.groupChannel, value: args.channelTitle },
		{ name: TAGS.keys.messageGroupVersion, value: TAGS.values.messageGroupVersions['0.1'] },
		{ name: TAGS.keys.dateCreated, value: dateTime },
		{ name: TAGS.keys.initialOwner, value: args.initialOwner },
	];

	return tags;
}

export async function addGroupMember(args: {
	arClient: any;
	groupId: string;
	groupTitle: string;
	walletAddress: string;
	wallet: any;
}): Promise<string | null> {
	try {
		const hexCodes = Object.values(PROFILE_HEX_CODES);
		const hexIndex = Math.floor(Math.random() * hexCodes.length);

		const txId = await createTransaction({
			arClient: args.arClient,
			tags: createGroupMemberTags({
				groupId: args.groupId,
				groupTitle: args.groupTitle,
				walletAddress: args.walletAddress,
			}),
			content: TAGS.keys.groupMember,
			contentType: CONTENT_TYPES.textPlain,
		});

		await args.arClient.writeContract({
			contract: args.groupId,
			wallet: args.wallet,
			input: {
				function: 'addMembers',
				members: [{ address: args.walletAddress, profileHexCode: hexCodes[hexIndex] }],
			},
			options: { strict: true },
		});

		return txId;
	} catch (e: any) {
		console.error(e);
		return null;
	}
}

function createGroupMemberTags(args: { groupId: string; groupTitle: string; walletAddress: string }): TagType[] {
	const dateTime = new Date().getTime().toString();

	const tags: TagType[] = [
		{ name: TAGS.keys.groupId, value: args.groupId },
		{ name: TAGS.keys.groupMember, value: args.walletAddress },
		{ name: TAGS.keys.groupTitle, value: args.groupTitle },
		{ name: TAGS.keys.messageGroupVersion, value: TAGS.values.messageGroupVersions['0.1'] },
		{ name: TAGS.keys.dateCreated, value: dateTime },
	];

	return tags;
}
