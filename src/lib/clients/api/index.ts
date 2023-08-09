import {
	createAsset,
	getActivity,
	getAssetById,
	getAssetsByChannel,
	getCollection,
	getCollections,
	getCommentData,
	getComments,
	getProfile,
	search,
} from '../../api';
import {
	ActivityResponseType,
	ApiClientInitArgs,
	ApiClientType,
	AssetArgsType,
	AssetCreateArgsType,
	AssetDetailType,
	AssetsResponseType,
	AssetType,
	CollectionAssetType,
	CollectionsResponseType,
	CommentDetailType,
	CommentsResponseType,
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

	getAssetsByChannel: async function (args: AssetArgsType): Promise<AssetsResponseType> {
		return await getAssetsByChannel({ ...args, arClient: this.arClient });
	},

	getAssetById: async function (args: { assetId: string }): Promise<GQLResponseType | null> {
		return await getAssetById({
			assetId: args.assetId,
			arClient: this.arClient
		});
	},

	getProfile: async function (args: { walletAddress: string }): Promise<ProfileType> {
		return await getProfile({
			walletAddress: args.walletAddress,
			arClient: this.arClient,
		});
	},
};

export { apiClient as ApiClient };
