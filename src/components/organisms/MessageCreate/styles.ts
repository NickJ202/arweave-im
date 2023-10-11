import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div<{ active: boolean }>`
	width: 100%;
	border: 1.35px solid ${(props) => props.active ? props.theme.colors.border.alt2 : props.theme.colors.border.alt1};
	border-radius: ${STYLING.dimensions.borderRadius};
	&:hover {
		cursor: text;
	}
`;

export const Header = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 15px;
	background: ${(props) => props.theme.colors.container.alt1.background};
	border-top-left-radius: ${STYLING.dimensions.borderRadius};
	border-top-right-radius: ${STYLING.dimensions.borderRadius};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	> * {
		&:not(:last-child) {
			margin: 0 16.5px 0 0;
		}
		&:last-child {
			margin: 0;
		}
	}
`;

export const IDivider = styled.div`
	height: 19.5px;
	width: 1.25px;
	border-right: 1.25px solid ${(props) => props.theme.colors.border.alt1};
`;

export const Body = styled.div`
	width: 100%;
`;

export const Editor = styled.div`
	max-height: 500px;
	overflow: auto;
	position: relative;
	padding: 15px;
	background: ${(props) => props.theme.colors.container.primary.background};

	scrollbar-width: thin;
	scrollbar-color: transparent transparent;
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-thumb {
		background-color: transparent;
		border-radius: ${STYLING.dimensions.borderRadius};
	}

	&:hover {
		scrollbar-color: ${(props) => props.theme.colors.scrollbar.thumb} transparent;

		::-webkit-scrollbar-thumb {
			background-color: ${(props) => props.theme.colors.scrollbar.thumb};
		}
	}

	span,
	.public-DraftEditorPlaceholder-inner {
		line-height: 1.5;
	}

	.public-DraftEditorPlaceholder-inner {
		color: ${(props) => props.theme.colors.font.alt2};
	}
`;

export const Footer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 0 9.5px 9.5px 9.5px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-bottom-left-radius: ${STYLING.dimensions.borderRadius};
	border-bottom-right-radius: ${STYLING.dimensions.borderRadius};
`;
