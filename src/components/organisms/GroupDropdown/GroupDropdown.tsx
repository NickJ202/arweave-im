import React from 'react';

import { getTxEndpoint } from 'lib';

import { IconButton } from 'components/atoms/IconButton';
import { TxAddress } from 'components/atoms/TxAddress';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { GroupActionType } from 'helpers/types';

import { GroupAction } from '../GroupAction';

import * as S from './styles';
import { IProps } from './types';

export default function GroupDropdown(props: IProps) {
	const [showAction, setShowAction] = React.useState(false);
	const [actionType, setActionType] = React.useState<GroupActionType | null>(null);

	function handleShowAction(type: 'addMember' | 'addChannel') {
		setShowAction(true);
		props.setDisabled(true);
		setActionType(type);
	}

	return (
		<>
			<S.Wrapper className={'border-wrapper-primary'}>
				<S.Header>
					<S.Logo>
						<img src={getTxEndpoint(props.group.logo)} />
					</S.Logo>
					<S.TAWrapper>
						<S.Title>
							<p>{props.group.title}</p>
						</S.Title>
						<S.GroupId>
							<p>{`${language.groupId}:`}</p>
							&nbsp;
							<TxAddress address={props.groupId} wrap={false} />
						</S.GroupId>
					</S.TAWrapper>
					<S.Close>
						<IconButton
							type={'primary'}
							sm
							warning
							src={ASSETS.close}
							handlePress={() => props.handleClose()}
							active={false}
						/>
					</S.Close>
				</S.Header>
				<S.Body>
					<S.Action onClick={() => handleShowAction('addMember')}>
						<span>{language.addGroupMember}</span>
					</S.Action>
					<S.Action onClick={() => handleShowAction('addChannel')}>
						<span>{language.createChannel}</span>
					</S.Action>
				</S.Body>
			</S.Wrapper>
			{showAction && (
				<GroupAction
					groupId={props.groupId}
					group={props.group}
					type={actionType}
					handleClose={() => {
						setShowAction(false);
						setActionType(null);
						props.handleClose();
					}}
				/>
			)}
		</>
	);
}
