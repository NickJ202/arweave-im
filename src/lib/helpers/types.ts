export type AssetType = {
	id: string;
	dateCreated: number;
	message: string;
	owner: string;
	stamps: StampType;
};

export type ChannelResponseType = {
	data: AssetType[] | null;
	nextCursor: string | null;
	previousCursor: string | null;
};

export type StampType = {
	total: number;
	vouched: number;
};

export type EnvType = {
	arClient: ArweaveClientType;
};

export type InitArgs = {
	arweave: any;
	arweaveBundlr?: any;
	bundlrKey: any;
	warp: any;
	dreNode: string;
};

export type ApiClientInitArgs = {
	arClient: ArweaveClientType;
};

export type AssetArgsType = {
	ids: string[] | null;
	owners: string[] | null;
	cursor: string | null;
	reduxCursor: string | null;
	walletAddress: string | null;
};

export type AssetArgsClientType = AssetArgsType & {
	arClient: any;
	useBundlrGateway?: boolean;
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

export type ApiClientType = {
	arClient: ArweaveClientType;
	init: (args: ApiClientInitArgs) => ApiClientType;
	createAsset: (args: AssetCreateArgsType) => Promise<string>;
	getAssetsByChannel: (args: AssetArgsType) => Promise<ChannelResponseType>;
	getAssetById: (args: { assetId: string }) => Promise<AssetType | null>;
	getGroupsByUser: (args: { walletAddress: string }) => Promise<GQLResponseType>;
	createGroup: (args: CreateGroupArgs) => Promise<string>;
	addGroupMember: (args: {
		groupId: string;
		groupTitle: string;
		walletAddress: string;
		wallet: any;
	}) => Promise<string>;
	addGroupChannel: (args: { groupId: string; channelTitle: string; wallet: any }) => Promise<string>;
	getProfiles: (args: { addresses: string[] }) => Promise<ProfileType[]>;
};

export type WriteContractArgs = {
	contract: string;
	wallet: any;
	input: any;
	options?: any;
};

export type ArweaveClientInitArgs = {
	arweave: any;
	bundlrKey: any;
	warp: any;
	dreNode: string;
};

export type ArweaveClientType = {
	init: (args: ArweaveClientInitArgs) => ArweaveClientType;
	arweave: any;
	bundlr: any;
	warp: any;
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

export type AGQLResponseType = { data: GQLNodeResponseType[]; nextCursor: string | null };

export type ProfileType = {
	handle: string | null;
	avatar: string | null;
	twitter: string | null;
	discord: string | null;
	walletAddress?: string;
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

export type ChannelType = { id: string; title: string };

export type GroupType = {
	balances: any;
	channels: ChannelType[];
	dateCreated: string;
	logo: string;
	members: string[];
	owner: string;
	title: string;
};

export enum MessageEnum {
	Text = 'text',
}
