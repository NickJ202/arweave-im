import { getContractEndpoint, getTransactionLink, validateAsset, validateBuy, validateSell } from '../helpers';
import { CURRENCY_DICT, ORDERBOOK_CONTRACT } from '../helpers/config';
import {
	ApiClientType,
	ArweaveClientType,
	BuyArgs,
	CancelArgs,
	ClientType,
	EnvType,
	InitArgs,
	SellArgs,
} from '../helpers/types';

import { ApiClient } from './api';
import { ArweaveClient } from './arweave';

const client: ClientType = {
	env: null,
	api: null,

	init: function (args: InitArgs) {
		this.env = {
			orderBookContract: ORDERBOOK_CONTRACT,
			currency: args.currency,
			currencyContract: CURRENCY_DICT[args.currency],
			arClient: ArweaveClient.init({
				arweaveGet: args.arweaveGet,
				arweavePost: args.arweavePost,
				bundlrKey: args.bundlrKey,
				warp: args.warp,
				warpDreNode: args.warpDreNode,
			}),
		};

		let api: ApiClientType = ApiClient.init({
			arClient: this.env.arClient,
			orderBookContract: ORDERBOOK_CONTRACT,
		});

		this.api = api;

		return this;
	},
};

export { client as Client };
