import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
    height: ${STYLING.dimensions.navHeaderHeight};
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background: ${(props) => props.theme.colors.navigation.header.background};
    border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;