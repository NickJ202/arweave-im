import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Form = styled.form``;

export const ImageWrapper = styled.div`
	margin: 0 0 40px 0;
`;

export const ImageHeader = styled.div`
	margin: 0 0 20px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const Image = styled.div<{ disabled: boolean }>`
	height: 150px;
	width: 100%;
	border: 1px dashed ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadius};
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
		border-radius: ${STYLING.dimensions.borderRadius};
	}
	label {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
		color: ${(props) => (props.disabled ? props.theme.colors.font.alt2 : props.theme.colors.font.primary)};
		transition: all 100ms;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		border-radius: ${STYLING.dimensions.borderRadius};
		background: ${(props) =>
			props.disabled ? props.theme.colors.container.primary.disabled : props.theme.colors.container.alt1.background};
		&:hover {
			background: ${(props) =>
				props.disabled ? props.theme.colors.container.primary.disabled : props.theme.colors.container.primary.hover};
		}
	}
	input {
		display: none;
	}
`;

export const VWrapper = styled.div`
	display: flex;
	align-items: center;
	span {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		display: block;
		line-height: 1.5;
	}
	input {
		margin: 0 7.5px -1.75px 0;
	}
`;

export const SWrapper = styled.div`
	width: 100%;
	margin: 25px 0 0 0;
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
