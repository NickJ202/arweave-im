import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	p {
		color: ${(props) => props.theme.colors.font.alt2} !important;
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.bold} !important;
		margin: 0 !important;
	}
	button {
		svg {
			height: 11.5px;
			width: 11.5px;
			margin: 3.5px 0 0 6.5px;
			fill: ${(props) => props.theme.colors.font.alt2} !important;
		}
	}
`;