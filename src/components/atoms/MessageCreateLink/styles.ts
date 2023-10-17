import styled from 'styled-components';

export const Form = styled.form``;

export const Actions = styled.div`
	width: fit-content;
	display: flex;
	align-items: center;
	margin: 0 0 0 auto;
	> * {
		&:not(:last-child) {
			margin: 0 15px 0 0;
		}
		&:last-child {
			margin: 0;
		}
	}
`;
