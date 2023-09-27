import React from 'react';
import Stamps from '@permaweb/stampjs';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import { IconButton } from 'components/atoms/IconButton';
import { ASSETS, REDIRECTS } from 'helpers/config';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

import * as S from './styles';
import { IProps } from './types';

export default function MessageActions(props: IProps) {
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [stamps, setStamps] = React.useState<any>(null);

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

	const handleStamp = React.useCallback(
		async (amount?: number) => {
			try {
				// setLoading(true);
				if (props.id) {
					// setDisabled(true);

					const stamp: any = await stamps.stamp(props.id, amount ? amount : 0, [{ name: '', value: '' }]);
					let stampSuccess = stamp && stamp.bundlrResponse && stamp.bundlrResponse.id;
					if (!stampSuccess) {
						stampSuccess = stamp && stamp.id;
					}

					// setUpdateCount(true);

					// if (!stampSuccess) {
					// 	setDisabled(false);
					// }

					// setStampNotification({
					// 	status: stampSuccess,
					// 	message: stampSuccess
					// 		? props.hasStampedMessage
					// 			? props.hasStampedMessage
					// 			: language.assetStamped
					// 		: language.errorOccurred,
					// });
				}
				// setLoading(false);
			} catch (e: any) {
				// setLoading(false);
				// setStampNotification({
				// 	status: false,
				// 	message: e.toString(),
				// });
			}
		},
		[stamps, props]
	);

	return props.id ? (
		<S.Wrapper>
			<IconButton
				type={'alt1'}
				src={ASSETS.stamp}
				handlePress={handleStamp}
				dimensions={{
					wrapper: 25,
					icon: 15,
				}}
                disabled={props.stamps.connectedWalletStamped}
				tooltip={props.stamps.connectedWalletStamped ? language.messageStamped : language.stamp}
			/>
			<IconButton
				type={'alt1'}
				src={ASSETS.viewblock}
				handlePress={() => window.open(REDIRECTS.viewblock(props.id), '_blank')}
				dimensions={{
					wrapper: 25,
					icon: 15,
				}}
				tooltip={language.viewblock}
			/>
		</S.Wrapper>
	) : null;
}
