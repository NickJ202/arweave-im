import styled from 'styled-components';

import { fadeIn1, open } from 'helpers/animations';

export const Wrapper = styled.div`
	height: 100vw;
	width: 100vw;
	position: fixed;
	z-index: 10;
	background: ${(props) => props.theme.colors.container.primary.background};
	display: flex;
	padding: 20px;
	flex-direction: column;
	align-items: center;
	animation: ${open} ${fadeIn1};
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		margin: 20px 0;
	}
`;

export const WCWrapper = styled.div`
	height: auto;
`;
