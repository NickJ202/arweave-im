import React from 'react';
import Stamps from '@permaweb/stampjs';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import { language } from 'helpers/language';
import { ResponseType } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

interface UseHandleStampProps {
	id: string;
}

export default function useHandleStamp({ id }: UseHandleStampProps) {
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [stamps, setStamps] = React.useState<any>(null);

	const [stampDisabled, setStampDisabled] = React.useState<boolean>(false);
	const [stampNotification, setStampNotification] = React.useState<ResponseType | null>(null);

	React.useEffect(() => {
		if (cliProvider.lib) {
			setStamps(
				Stamps.init({
					warp: cliProvider.lib.api.arClient.warp,
					arweave: cliProvider.lib.api.arClient.arweave,
					wallet: arProvider.walletAddress ? new InjectedArweaveSigner(arProvider.walletAddress) : 'use_wallet',
				})
			);
		}
	}, [cliProvider.lib, arProvider.walletAddress]);

	React.useEffect(() => {
		if (stampNotification) {
			const timeoutId = setTimeout(() => {
				setStampNotification(null);
			}, 3000);

			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [stampNotification]);

	const handleStamp: any = React.useCallback(
		async (amount?: number) => {
			try {
				if (id) {
					setStampDisabled(true);

					const stamp: any = await stamps.stamp(id, amount ? amount : 0, [{ name: '', value: '' }]);
					let stampSuccess = stamp && stamp.bundlrResponse && stamp.bundlrResponse.id;
					if (!stampSuccess) {
						stampSuccess = stamp && stamp.id;
					}

					if (!stampSuccess) {
						setStampDisabled(false);
						return language.errorOccurred;
					}

					return stampSuccess ? `${language.messageStamped}!` : language.errorOccurred;
				}
			} catch (e: any) {
				return e.toString();
			}
		},
		[stamps, id, language]
	);

	return {
		handleStamp,
		stampDisabled,
	};
}
