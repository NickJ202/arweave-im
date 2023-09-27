import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	animation: ${open} ${fadeIn2};
`;

export const FlexAction = styled.div`
	display: flex;
	align-items: center;
	svg {
		height: 25px;
		width: 20px;
		margin: 0 -2.5px 0 11.5px;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column-reverse;
		align-items: flex-end;
	}
`;

export const Dropdown = styled.ul`
	width: 350px;
	max-width: 90vw;
	padding: 20px 0 10px 0;
	position: absolute;
	top: 50px;
	right: 13.5px;
`;

export const DHeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 15px 20px 15px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const DHeader = styled.div`
	margin: 0 0 0 10px;
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
	span {
		color: ${(props) => props.theme.colors.font.alt2};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const DBodyWrapper = styled.ul`
	width: 100%;
	padding: 10px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	li {
		text-align: center;
		height: 37.5px;
		display: flex;
		align-items: center;
		cursor: pointer;
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		border: 1px solid transparent;
		padding: 0 15px;
		transition: all 100ms;
		&:hover {
			background: ${(props) => props.theme.colors.button.primary.active.background};
			color: ${(props) => props.theme.colors.button.primary.color};
		}
	}
`;

export const DFooterWrapper = styled(DBodyWrapper)`
	padding: 10px 0 0 0;
	border-bottom: none;
`;