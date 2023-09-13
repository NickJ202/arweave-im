import React from 'react';
import Arweave from 'arweave';
import { defaultCacheOptions, LoggerFactory, WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';

import { ClientType } from 'lib';
import { Client } from 'lib/clients';

import { API_CONFIG, DRE_NODE } from 'helpers/config';
import { useArweaveProvider } from 'providers/ArweaveProvider';

LoggerFactory.INST.logLevel('fatal');

interface ClientContextState {
	lib: ClientType | null;
}

interface ClientProviderProps {
	children: React.ReactNode;
}

const DEFAULT_CONTEXT = {
	lib: null,
};

const ClientContext = React.createContext<ClientContextState>(DEFAULT_CONTEXT);

export function useClientProvider(): ClientContextState {
	return React.useContext(ClientContext);
}

export function ClientProvider(props: ClientProviderProps) {
	const arProvider = useArweaveProvider();

	const [lib, setLib] = React.useState<ClientType | null>(null);

	React.useEffect(() => {
		const arweave = Arweave.init({
			host: API_CONFIG.arweave,
			port: API_CONFIG.port,
			protocol: API_CONFIG.protocol,
			timeout: API_CONFIG.timeout,
			logging: API_CONFIG.logging,
		});

		const warp = WarpFactory.forMainnet({
			...defaultCacheOptions,
			inMemory: true,
		}).use(new DeployPlugin());

		setLib(
			Client.init({
				arweave: arweave,
				bundlrKey: window.arweaveWallet ? window.arweaveWallet : null,
				warp: warp,
				dreNode: DRE_NODE,
			})
		);
	}, [arProvider.wallet, arProvider.walletAddress]);

	return <ClientContext.Provider value={{ lib }}>{props.children}</ClientContext.Provider>;
}
