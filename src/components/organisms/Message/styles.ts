import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
`;

export const MMessage = styled.div`
	width: calc(100% - 45px);
	padding: 0 0 0 15px;
`;

export const MMessageHeader = styled.div`
	display: flex;
	align-items: center;
	button {
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.alt1};
		&:hover {
			text-decoration: underline;
			text-decoration-thickness: 1.35px;
		}
	}
	span {
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.alt2};
		margin: 0 0 0 7.5px;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		flex-direction: column;
		align-items: flex-start;
		span {
			margin: 7.5px 0 0 0;
		}
	}
`;

export const MText = styled.div`
	margin: 7.5px 0 0 0;
	position: relative;
	z-index: 0;
	span,
	.public-DraftEditorPlaceholder-inner {
		line-height: 1.5;
	}

	.public-DraftEditorPlaceholder-inner {
		color: ${(props) => props.theme.colors.font.alt2};
	}
`;

export const Loader = styled.div`
	max-width: 100%;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadius};
	overflow: hidden;
`;

export const HLoader = styled(Loader)`
	height: 18.5px;
	width: 200px;
`;

export const MLoader = styled(Loader)`
	height: 17.5px;
	width: 400px;
	margin: 7.5px 0;
`;