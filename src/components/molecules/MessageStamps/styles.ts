import styled from 'styled-components';

export const Action = styled.button<{ disabled: boolean }>`
	height: 23.5px;
	width: 41.5px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${(props) =>
		props.disabled
			? props.theme.colors.button.primary.disabled.background
			: props.theme.colors.button.primary.background};
	border: 1px solid
		${(props) => (props.disabled ? props.theme.colors.border.alt2 : props.theme.colors.button.primary.border)};
	border-radius: 20px;
	padding: 0.5px 0 0 0;
	svg {
		height: 12.5px;
		width: 12.5px;
		padding: 2.5px 0 0 0;
		margin: 0 0 0 -2.5px;
		fill: ${(props) =>
			props.disabled ? props.theme.colors.button.primary.disabled.color : props.theme.colors.button.primary.color};
	}
	span {
		font-size: ${(props) => props.theme.typography.size.xxxSmall};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => (props.disabled ? props.theme.colors.font.primary : props.theme.colors.font.primary)};
		margin: 0 0 0.5px 4.5px;
	}
	&:hover {
		background: ${(props) =>
			props.disabled
				? props.theme.colors.button.primary.disabled.background
				: props.theme.colors.button.primary.active.background};
		border: 1px solid
			${(props) =>
				props.disabled ? props.theme.colors.button.primary.border : props.theme.colors.button.primary.active.border};
	}
`;
