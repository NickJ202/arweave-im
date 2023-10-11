import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.main`
	height: calc(100% - ${STYLING.dimensions.navHeaderHeight} - ${STYLING.dimensions.navFooterHeight});
	width: calc(100% - ${STYLING.dimensions.navPanelWidth});
	position: fixed;
	top: ${STYLING.dimensions.navHeaderHeight};
	left: ${STYLING.dimensions.navPanelWidth};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		left: 0;
	}
`;

export const Panel = styled.aside`
	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;