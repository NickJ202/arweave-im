import {
	createAsset,
	getActivity,
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
	AssetType,
	CollectionAssetType,
	CollectionsResponseType,
	CommentDetailType,
	CommentsResponseType,
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

	getAssetsByChannel: async function (args: AssetArgsType): Promise<AssetType[]> {
		return await getAssetsByChannel({ ...args, arClient: this.arClient });
	}
};

export { apiClient as ApiClient };
