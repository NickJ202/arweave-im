import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
`;

export const MAvatarWrapper = styled.div`
	height: 32.5px;
	width: 32.5px;
`;

export const Avatar = styled.div`
	height: 100%;
	width: 100%;
	margin: 0 8.5px 0 0;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadius};
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		height: 100%;
		width: 100%;
	}
	svg {
		height: 21.5px;
		width: 21.5px;
		padding: 3.5px 0 0 0px;
		margin: 0 0 2.5px 0;
		stroke: ${(props) => props.theme.colors.icon.primary};
	}
`;

export const MMessage = styled.div`
	width: calc(100% - 45px);
	padding: 0 0 0 15px;
`;

export const MMessageHeader = styled.div`
	display: flex;
	align-items: center;
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.alt1};
	}
	span {
		margin: 0 0 0 7.5px;
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.alt2};
	}
`;

export const MText = styled.div`
	margin: 7.5px 0 0 0;
	span,
	.public-DraftEditorPlaceholder-inner {
		line-height: 1.5;
	}

	.public-DraftEditorPlaceholder-inner {
		color: ${(props) => props.theme.colors.font.alt2};
	}
`;
