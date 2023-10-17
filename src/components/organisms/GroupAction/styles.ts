import styled from 'styled-components';

export const SWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	button {
		margin: 0 0 0 auto;
	}
`;

export const RWrapper = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const Form = styled.form``;
