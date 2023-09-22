import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 300px;
	position: absolute;
	top: 100px;
	left: 15px;
	z-index: 1;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		top: 90px;
	}
`;

export const Header = styled.div`
	width: 100%;
	display: flex;
	padding: 20px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Logo = styled.div`
	height: 40px;
	width: 40px;
	position: relative;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadius};
	img {
		height: 65%;
		width: 65%;
		object-fit: contain;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const Title = styled.div`
	margin: 0 0 0 15px;
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		max-width: 75%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const Close = styled.div`
	width: fit-content;
	padding: 2.5px 0 0 0;
	margin: 0 0 0 auto;
`;

export const Body = styled.div`
	width: 100%;
	padding: 15px 0;
`;

export const Action = styled.button`
	width: 100%;
	height: 37.5px;
	padding: 7.5px 20px;
	text-align: left;
	&:hover {
		background: ${(props) => props.theme.colors.button.primary.active.background};
	}
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		max-width: 75%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const SWrapper = styled.div`
	width: fit-content;
	margin: 0 0 0 auto;
`;
