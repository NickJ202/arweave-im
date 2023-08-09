import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadius};
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
			margin: 0 20px 0 0;
		}
		&:last-child {
			margin: 0;
		}
	}
`;

export const Body = styled.div`
	width: 100%;
`;

export const Editor = styled.div`
	min-height: 100px;
	max-height: 500px;
	overflow: auto;
	position: relative;
	padding: 15px;

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
		cursor: text;
		scrollbar-color: ${(props) => props.theme.colors.scrollbar.thumb} transparent;

		::-webkit-scrollbar-thumb {
			background-color: ${(props) => props.theme.colors.scrollbar.thumb};
		}
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
	padding: 0 15px 12.5px 15px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-bottom-left-radius: ${STYLING.dimensions.borderRadius};
	border-bottom-right-radius: ${STYLING.dimensions.borderRadius};
`;
