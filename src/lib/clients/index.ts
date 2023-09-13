import { CURRENCY_DICT } from '../helpers/config';
import {
	ApiClientType,
	ClientType,
	InitArgs,
} from '../helpers/types';

import { ApiClient } from './api';
import { ArweaveClient } from './arweave';

const client: ClientType = {
	env: null,
	api: null,

	init: function (args: InitArgs) {
		this.env = {
			orderBookContract: 'TEMP',
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
			orderBookContract: 'TEMP',
		});

		this.api = api;

		return this;
	},
};

export { client as Client };
