import styled from 'styled-components';

export const WWrapper = styled.div`
	width: fit-content;
`;

export const GWrapper = styled.div`
	margin: 0 0 20px 0;
	> * {
		&:not(:last-child) {
			margin: 0 0 20px 0;
		}
		&:last-child {
			margin: 0;
		}
	}
`;