import styled from 'styled-components';

import { fadeIn1, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 50px;
	width: calc(100% - ${STYLING.dimensions.navPanelWidth});
	position: fixed;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	animation: ${open} ${fadeIn1};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const Title = styled.div`
	span {
		font-size: clamp(18px, 1.15vw, 20px);
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const Members = styled.div`
	position: relative;
`;

export const MembersDropdown = styled.div`
	width: 350px;
	max-width: 90vw;
	position: absolute;
	top: 40px;
	right: 0;
	z-index: 1;
`;

export const MDHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const MDBody = styled.div`
	height: fit-content;
	max-height: 50vh;
	margin: 10px 0;
`;

export const MemberLine = styled.button`
	height: 47.5px;
	width: 100%;
	padding: 0 15px;
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.colors.container.primary.background};
	transition: all 100ms;
	p {
		margin: 0 0 0 10px;
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.alt1};
	}
	&:hover {
		background: ${(props) => props.theme.colors.container.alt3.background};
	}
`;

export const MemberAdd = styled.p`
	margin: 0 !important;
`;
