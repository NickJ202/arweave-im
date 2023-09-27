import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const TWrapper = styled.div`
	height: 15px;
	width: 35px;
	position: absolute;
	top: 10.5px;
	left: 15px;
	z-index: 1;
	display: none;
	span {
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.alt2};
	}
`;

export const AWrapper = styled.div`
	position: absolute;
	top: -19.5px;
	right: 10px;
	z-index: 1;
	display: none;
`;

export const Wrapper = styled.div<{ textOnly: boolean; disabled: boolean }>`
	width: 100%;
	display: flex;
	position: relative;
	padding: ${(props) => (props.textOnly ? '7.5px 0' : '12.5px 15px 7.5px 15px')};
	&:hover {
		background: ${(props) => (props.disabled ? 'transparent' : props.theme.colors.container.alt2.background)};
		${TWrapper} {
			display: block;
		}
		${AWrapper} {
			display: block;
		}
	}
`;

export const MMessage = styled.div<{ textOnly: boolean }>`
	width: calc(100% - 45px);
	padding: ${(props) => (props.textOnly ? '0 0 0 62.5px' : '0 0 0 15px')};
`;

export const MMessageHeader = styled.div`
	display: flex;
	align-items: center;
	margin: -3.5px 0 0 0;
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

export const MText = styled.div<{ textOnly: boolean }>`
	margin: 7.5px 0 0 0;
	margin: ${(props) => (props.textOnly ? '0' : '7.5px 0 0 0')};
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

export const MFooter = styled.div`
	margin: 5px 0 0 0;
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
