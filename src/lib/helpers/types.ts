export type AssetType = {
	data: {
		id: string;
		title: string;
		description: string;
		topic: string;
		type: string;
		implementation: string;
		license: string;
		renderWith: string | null;
		dateCreated: number;
		blockHeight: number;
		creator: string;
	};
	stamps?: { total: number; vouched: number };
};

export type EnvType = {
	orderBookContract: string;
	currency: string;
	currencyContract: string;
	arClient: ArweaveClientType;
};

export type InitArgs = {
	currency: 'U';
	arweaveGet: any;
	arweavePost: any;
	arweaveBundlr?: any;
	bundlrKey: any;
	warp: any;
	warpDreNode: string;
};

export type ApiClientInitArgs = {
	arClient: ArweaveClientType;
	orderBookContract: string;
};

export type AssetArgsType = {
	ids: string[] | null;
	owner: string | null;
	uploader: string | null;
	cursor: string | null;
	reduxCursor: string | null;
	walletAddress: string | null;
};

export type AssetArgsClientType = AssetArgsType & {
	arClient: any;
	useArweaveBundlr?: boolean;
};

export type AssetCreateArgsType = {
	content: any;
	contentType: string;
	title: string;
	description: string;
	type: string;
	topics: string[];
	owner: string;
	ticker: string;
	dataProtocol: string | null;
	dataSource: string | null;
	renderWith: string[] | null;
	channelId: string;
	groupId: string;
};

export type AssetCreateArgsClientType = AssetCreateArgsType & {
	arClient: any;
};

export type GetCollectionsArgs = {
	arClient: any;
};

export type GetCollectionArgs = {
	arClient: any;
	collectionId: string;
};

export type SearchReturnType = {
	nodes: AssetType[];
};

export type SearchArgs = AssetArgsType & {
	term: string;
};

export type ApiClientType = {
	arClient: ArweaveClientType;
	orderBookContract: string;
	init: (args: ApiClientInitArgs) => ApiClientType;
	createAsset: (args: AssetCreateArgsType) => Promise<string>;
	getAssetsByChannel: (args: AssetArgsType) => Promise<GQLResponseType>;
	getAssetById: (args: { assetId: string }) => Promise<GQLNodeResponseType | null>;
	getGroupsByUser: (args: { walletAddress: string }) => Promise<GQLResponseType>;
	createGroup: (args: CreateGroupArgs) => Promise<string>;
	addGroupMember: (args: { groupId: string, groupTitle: string, walletAddress: string, wallet: any }) => Promise<string>;
	addGroupChannel: (args: { groupId: string, channelTitle: string, wallet: any }) => Promise<string>;
	getProfile: (args: { walletAddress: string }) => Promise<ProfileType>;
};

export type WriteContractArgs = {
	contract: string;
	wallet: any;
	input: any;
	options?: any;
};

export type ArweaveClientInitArgs = {
	arweaveGet: any;
	arweavePost: any;
	bundlrKey: any;
	warp: any;
	warpDreNode: string;
};

export type ArweaveClientType = {
	init: (args: ArweaveClientInitArgs) => ArweaveClientType;
	arweaveGet: any;
	arweavePost: any;
	bundlr: any;
	warpDefault: any;
	writeContract: (args: WriteContractArgs) => Promise<any>;
	read: (id: string) => Promise<any>;
	options: any;
};

export type ClientType = {
	env: EnvType;
	init: (args: InitArgs) => ClientType;
	api: ApiClientType;
};

export enum CursorEnum {
	GQL = 'gql',
	idGQL = 'idGQL',
}

export type CursorObjectKeyType = CursorEnum.GQL | CursorEnum.idGQL | null;

export type GQLNodeResponseType = {
	cursor: string | null;
	node: {
		id: string;
		tags: { [key: string]: any }[];
		data?: {
			size: string;
			type: string;
		};
		block?: {
			height: number;
			timestamp: number;
		};
		owner?: {
			address: string;
		};
		address?: string;
		timestamp?: number;
	};
};

export type TagFilterType = { name: string; values: string[] };

export type GQLResponseType = {
	nextCursor: string | null;
	previousCursor: string | null;
	nodes: GQLNodeResponseType[];
};

export type CollectionsResponseType = {
	nextCursor: string | null;
	previousCursor: string | null;
	collections: CollectionType[];
};

export type AGQLResponseType = { data: GQLNodeResponseType[]; nextCursor: string | null };

export type ProfileType = {
	handle: string | null;
	avatar: string | null;
	twitter: string | null;
	discord: string | null;
	walletAddress?: string;
};

export type CollectionType = {
	id: string;
	banner: string;
	thumbnail: string;
	name: string;
	title: string;
	description: string;
	type: string;
	creator: ProfileType;
	stamps?: { total: number; vouched: number };
};

export type CollectionAssetType = CollectionType & {
	nodes: string[];
};

export type CollectionManifestType = {
	type: string;
	items: string[];
};

export type ActivityElementType = {
	id: string;
	dataProtocol: string | null;
	dataSource: string;
	dateCreated: number;
	owner: string;
	protocolName: string | null;
	stamps?: { total: number; vouched: number };
};

export type ActivityResponseType = {
	activity: ActivityElementType[];
	nextCursor: string | null;
	previousCursor: string | null;
};

export type CommentType = {
	id: string;
	dataSource: string;
	owner: string;
	stamps?: { total: number; vouched: number };
};

export type CommentDetailType = {
	text: string;
};

export type CommentsResponseType = {
	comments: CommentType[];
	nextCursor: string | null;
	previousCursor: string | null;
};

export type TagType = { name: string; value: string };

export type KeyValueType = { [key: string]: string };

export type CreateGroupArgs = {
	title: string;
	initialChannel: string;
	logo: {
		src: any;
		buffer: any;
	};
	owner: string;
	wallet: any;
};

export type CreateGroupClientArgs = CreateGroupArgs & {
	arClient: any;
};

export type ChannelType = { id: string, title: string };

// TODO: group type
export type GroupType = {
	balances: any,
	channels: ChannelType[],
	dateCreated: string,
	logo: string,
	members: string[],
	owner: string,
	title: string
};