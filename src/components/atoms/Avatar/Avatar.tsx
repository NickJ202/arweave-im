import React from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { MemberType } from 'lib';

import { Loader } from 'components/atoms/Loader';
import { AR_PROFILE, ASSETS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { getOwner } from 'helpers/utils';
import { RootState } from 'store';

import * as S from './styles';
import { IProps } from './types';

export default function Avatar(props: IProps) {
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const [hasError, setHasError] = React.useState(false);

	function getProfileHex() {
		if (groupReducer && props.owner) {
			const member = groupReducer.data.members.find((member: MemberType) => member.address === props.owner);
			if (member) return member.profileHexCode;
			return null;
		}
	}

	function getAvatar() {
		if (!props.owner) return <Loader placeholder />;

		const owner = getOwner(groupReducer, props.owner);
		if (owner) {
			if (!hasError && owner.avatar && owner.avatar !== AR_PROFILE.defaultAvatar) {
				return <img src={getTxEndpoint(owner.avatar)} onError={() => setHasError(true)} />;
			} else return <ReactSVG src={ASSETS.user} />;
		}
		return <ReactSVG src={ASSETS.user} />;
	}

	

	return (
		<S.Wrapper onClick={props.callback ? props.callback : () => {}} dimensions={props.dimensions} hexCode={getProfileHex()} hasCallback={props.callback !== null}>
			{getAvatar()}
		</S.Wrapper>
	);
}
