import {
	addGroupChannel,
	addGroupMember,
	createAsset,
	createGroup,
	getAssetById,
	getAssetsByChannel,
	getChannelById,
	getGroupsByUser,
	getProfiles,
} from '../../api';
import {
	ApiClientInitArgs,
	ApiClientType,
	AssetArgsType,
	AssetCreateArgsType,
	AssetType,
	ChannelHeaderResponseType,
	ChannelResponseType,
	CreateGroupArgs,
	GQLResponseType,
	ProfileType,
} from '../../helpers';

const apiClient: ApiClientType = {
	arClient: null,

	init: function (args: ApiClientInitArgs) {
		this.arClient = args.arClient;
		return this;
	},

	createAsset: async function (args: AssetCreateArgsType): Promise<string> {
		return await createAsset({ ...args, arClient: this.arClient });
	},

	getAssetsByChannel: async function (args: AssetArgsType): Promise<ChannelResponseType> {
		return await getAssetsByChannel({ ...args, arClient: this.arClient });
	},

	getAssetById: async function (args: { assetId: string }): Promise<AssetType | null> {
		return await getAssetById({
			assetId: args.assetId,
			arClient: this.arClient,
		});
	},

	getChannelById: async function (args: { channelId: string }): Promise<ChannelHeaderResponseType | null> {
		return await getChannelById({
			channelId: args.channelId
		})
	},

	getGroupsByUser: async function (args: { walletAddress: string }): Promise<GQLResponseType> {
		return await getGroupsByUser({
			walletAddress: args.walletAddress,
			arClient: this.arClient,
		});
	},

	createGroup: async function (args: CreateGroupArgs): Promise<string> {
		return await createGroup({ ...args, arClient: this.arClient });
	},

	addGroupMember: async function (args: {
		groupId: string;
		groupTitle: string;
		walletAddress: string;
		wallet: any;
	}): Promise<string> {
		return await addGroupMember({ ...args, arClient: this.arClient });
	},

	addGroupChannel: async function (args: { groupId: string; channelTitle: string; wallet: any; owner: string }): Promise<string> {
		return await addGroupChannel({ ...args, arClient: this.arClient });
	},

	getProfiles: async function (args: { addresses: string[] }): Promise<ProfileType[]> {
		return await getProfiles({
			addresses: args.addresses,
		});
	},
};

export { apiClient as ApiClient };
