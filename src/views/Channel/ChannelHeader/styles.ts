import styled from 'styled-components';

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
`;

export const Title = styled.div`
	span {
		font-size: clamp(18px, 1.15vw, 20px);
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const MemberCount = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;