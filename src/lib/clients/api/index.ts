import {
	createAsset,
	createGroup,
	getActivity,
	getAssetById,
	getAssetsByChannel,
	getGroupsByUser,
	getProfile,
} from '../../api';
import {
	ActivityResponseType,
	ApiClientInitArgs,
	ApiClientType,
	AssetArgsType,
	AssetCreateArgsType,
	AssetDetailType,
	AssetType,
	CollectionAssetType,
	CollectionsResponseType,
	CommentDetailType,
	CommentsResponseType,
	CreateGroupArgs,
	CreateGroupClientArgs,
	GQLNodeResponseType,
	GQLResponseType,
	ProfileType,
	SearchArgs,
	SearchReturnType,
} from '../../helpers';

const apiClient: ApiClientType = {
	arClient: null,
	orderBookContract: null,

	init: function (args: ApiClientInitArgs) {
		this.arClient = args.arClient;
		this.orderBookContract = args.orderBookContract;
		return this;
	},

	createAsset: async function (args: AssetCreateArgsType): Promise<string> {
		return await createAsset({ ...args, arClient: this.arClient });
	},

	getAssetsByChannel: async function (args: AssetArgsType): Promise<GQLResponseType> {
		return await getAssetsByChannel({ ...args, arClient: this.arClient });
	},

	getAssetById: async function (args: { assetId: string }): Promise<GQLNodeResponseType | null> {
		return await getAssetById({
			assetId: args.assetId,
			arClient: this.arClient
		});
	},

	getGroupsByUser: async function (args: { walletAddress: string }): Promise<GQLResponseType> {
		return await getGroupsByUser({
			walletAddress: args.walletAddress,
			arClient: this.arClient
		})
	},

	createGroup: async function (args: CreateGroupArgs): Promise<string> {
		return await createGroup({...args, arClient: this.arClient})
	},

	getProfile: async function (args: { walletAddress: string }): Promise<ProfileType> {
		return await getProfile({
			walletAddress: args.walletAddress,
			arClient: this.arClient,
		});
	},
};

export { apiClient as ApiClient };
