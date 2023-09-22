import React from 'react';
import { useSelector } from 'react-redux';

import { ProfileType } from 'lib';

import { Avatar } from 'components/atoms/Avatar';
import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { Portal } from 'components/atoms/Portal';
import { ASSETS, DOM, REDIRECTS } from 'helpers/config';
import { language } from 'helpers/language';
import { formatAddress, getOwner } from 'helpers/utils';
import { RootState } from 'store';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';
import { IProps } from './types';

export default function Profile(props: IProps) {
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const [owner, setOwner] = React.useState<ProfileType | null>(null);

	const [addressCopied, setAddressCopied] = React.useState<boolean>(false);
	const [discordHandleCopied, setDiscordHandleCopied] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (groupReducer && props.owner) setOwner(getOwner(groupReducer, props.owner));
	}, [groupReducer, props.owner]);

	const copyAddress = React.useCallback(async () => {
		if (owner && owner.walletAddress.length > 0) {
			await navigator.clipboard.writeText(owner.walletAddress);
			setAddressCopied(true);
			setTimeout(() => setAddressCopied(false), 2000);
		}
	}, [owner]);

	function handleTwitterAction() {
		if (owner && owner.twitter) {
			window.open(REDIRECTS.twitter.profile(owner.twitter), '_blank');
		}
	}

	const handleDiscordAction = React.useCallback(async () => {
		if (owner && owner.discord) {
			await navigator.clipboard.writeText(owner.discord);
			setDiscordHandleCopied(true);
			setTimeout(() => setDiscordHandleCopied(false), 2000);
		}
	}, [owner]);

	console.log(owner);

	return owner ? (
		<Portal node={DOM.panel}>
			<S.Wrapper className={'overlay'}>
				<S.PWrapper>
					<CloseHandler active={props.active} disabled={!props.active} callback={props.handleClose}>
						<S.TWrapper>
							<span>{language.profile}</span>
							<IconButton type={'primary'} src={ASSETS.close} handlePress={props.handleClose} active={false} sm />
						</S.TWrapper>
						<S.BWrapper>
							<S.AWrapper>
								<Avatar owner={props.owner} dimensions={{ wrapper: 130, icon: 65 }} callback={null} />
							</S.AWrapper>
							<S.IWrapper>
								<S.Name>
									<p>{owner.handle ? owner.handle : formatAddress(owner.walletAddress, false)}</p>
								</S.Name>
								<S.Address>
									<span>{formatAddress(owner.walletAddress, false)}</span>
									<Button
										type={'alt2'}
										label={addressCopied ? `${language.copied}!` : language.copyWalletAddress}
										handlePress={copyAddress}
										disabled={addressCopied}
									/>
								</S.Address>
							</S.IWrapper>
							{(owner.twitter || owner.discord) && (
								<S.SWrapper>
									<S.SHeader>
										<span>{language.social}</span>
									</S.SHeader>
									<S.SBody>
										{owner.twitter && (
											<Button type={'alt2'} label={language.twitter} handlePress={handleTwitterAction} />
										)}
										{owner.discord && (
											<Button
												type={'alt2'}
												label={discordHandleCopied ? `${language.copied}!` : language.discord}
												handlePress={handleDiscordAction}
												disabled={discordHandleCopied}
											/>
										)}
									</S.SBody>
								</S.SWrapper>
							)}
						</S.BWrapper>
					</CloseHandler>
				</S.PWrapper>
			</S.Wrapper>
		</Portal>
	) : null;
}
