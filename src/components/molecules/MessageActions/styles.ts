import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
    height: 35px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    background: ${(props) => props.theme.colors.container.primary.background};
    border-radius: ${STYLING.dimensions.borderRadius};
    > * {
		&:not(:last-child) {
			margin: 0 5px 0 0;
		}
		&:last-child {
			margin: 0;
		}
	}
`;