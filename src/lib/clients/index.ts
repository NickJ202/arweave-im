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
			arClient: ArweaveClient.init({
				arweave: args.arweave,
				bundlrKey: args.bundlrKey,
				warp: args.warp,
				dreNode: args.dreNode,
			}),
		};

		let api: ApiClientType = ApiClient.init({
			arClient: this.env.arClient,
		});

		this.api = api;

		return this;
	},
};

export { client as Client };
