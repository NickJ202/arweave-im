import React from 'react';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { formatAddress } from 'helpers/utils';

import * as S from './styles';
import { IProps } from './types';

export default function TxAddress(props: IProps) {
	const [copied, setCopied] = React.useState<boolean>(false);

	const copyAddress = React.useCallback(async () => {
		if (props.address) {
			if (props.address.length > 0) {
				await navigator.clipboard.writeText(props.address);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, [props.address]);

	return (
		<>
			<S.Wrapper>
				<p>{formatAddress(props.address, props.wrap)}</p>
				<button onClick={copyAddress}>
					<ReactSVG src={copied ? ASSETS.checkmark : ASSETS.copy} />
				</button>
			</S.Wrapper>
		</>
	);
}
