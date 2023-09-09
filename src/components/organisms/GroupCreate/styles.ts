import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Form = styled.form``;

export const SWrapper = styled.div`
    width: fit-content;
    margin: 0 0 0 auto;
`;

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
	border: 1px solid ${(props) => props.theme.colors.border.primary};
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
		color: ${(props) => props.theme.colors.font.primary.alt1};
		transition: background 0.075s;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		border-radius: ${STYLING.dimensions.borderRadius};
		background: ${(props) => props.disabled ? props.theme.colors.container.primary.disabled : props.theme.colors.container.primary.background};
		&:hover {
			background: ${(props) =>
		        props.disabled ? props.theme.colors.container.primary.disabled : props.theme.colors.container.primary.hover};
		}
	}
	input {
		display: none;
	}
`;