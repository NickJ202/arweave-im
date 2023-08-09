import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: calc(100% - 50px);
	width: 100%;
	position: relative;
	margin: 50px 0 0 0;
	padding: 20px 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const MWrapper = styled.div`
	overflow: auto;

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

	> * {
		padding: 0 15px 0 0;

		&:not(:last-child) {
			margin: 0 0 30px 0;
		}

		&:last-child {
			margin: 0;
		}
	}
`;

export const CWrapper = styled.div`
	height: fit-content;
	width: 100%;
	margin: 20px 0 0 0;
`;
