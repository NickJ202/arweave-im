import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.footer`
	height: ${STYLING.dimensions.navFooterHeight};
	width: 100vw;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	padding: 0 15px;
	background: ${(props) => props.theme.colors.navigation.footer.background};
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Title = styled.div`
    span {
        font-size: ${(props) => props.theme.typography.size.xxxSmall};
        font-weight: ${(props) => props.theme.typography.weight.xBold};
        color: ${(props) => props.theme.colors.font.alt2};
    }
`;

export const FNotification = styled.div`
    width: fit-content;
    margin: 0 0 0 auto;
    span {
        font-size: ${(props) => props.theme.typography.size.xxxSmall};
        font-weight: ${(props) => props.theme.typography.weight.xBold};
        color: ${(props) => props.theme.colors.font.alt2};
    }
`;