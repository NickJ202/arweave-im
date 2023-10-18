import Bundlr from '@bundlr-network/client';

import { ArweaveClientInitArgs, ArweaveClientType, BUNDLR_CONFIG, WriteContractArgs } from '../../helpers';

const arClient: ArweaveClientType = {
	arweave: null,
	bundlr: null,
	warp: null,
	options: {
		allowBigInt: true,
		internalWrites: true,
		ignoreExceptions: false,
		remoteStateSyncEnabled: true,
		remoteStateSyncSource: null,
		unsafeClient: 'skip',
	},

	init: function (args: ArweaveClientInitArgs) {
		this.arweave = args.arweave;

		if (args.bundlrKey) this.bundlr = new Bundlr(BUNDLR_CONFIG.node, BUNDLR_CONFIG.currency, args.bundlrKey);

		this.warp = args.warp;
		this.options.remoteStateSyncSource = args.dreNode;

		return this;
	},

	writeContract: async function (args: WriteContractArgs) {
		const result = await this.warp
			.contract(args.contract)
			.connect(args.wallet)
			.setEvaluationOptions(this.options)
			.writeInteraction(args.input);
		return result;
	},

	read: async function (id: string) {
		return (await this.warp.contract(id).setEvaluationOptions(this.options).readState()).cachedValue.state;
	},
};

export { arClient as ArweaveClient };
