import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.main`
	height: calc(100% - ${STYLING.dimensions.navHeaderHeight});
	width: calc(100% - ${STYLING.dimensions.navPanelWidth});
	position: fixed;
	top: ${STYLING.dimensions.navHeaderHeight};
	left: ${STYLING.dimensions.navPanelWidth};
`;
