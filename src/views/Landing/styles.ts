import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	min-height: 100vh;
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	display: flex;
	justify-content: space-between;
	padding: 50px 20px 0 20px;
	margin: 0 auto;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		justify-content: flex-start;
		padding: 20px;
	}
`;

export const IWrapper = styled.div`
	height: fit-content;
	width: 47.5%;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const ILogo = styled.div`
	svg {
		height: 300px;
		max-height: 47.5vh;
		width: 485px;
		max-width: 37.5vw;
		animation: ${open} ${fadeIn2};
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		svg {
			max-height: 55.5vh;
			max-width: 100%;
			margin: 0 0 40px 0;
		}
	}
`;

export const IGraphic = styled.div`
	width: 100%;
	max-width: 250px;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	margin: 60px 0 0 0;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		margin: 0;
	}
`;

export const IAWrapper = styled.div``;

export const AWrapper = styled.div`
	height: fit-content;
	width: 47.5%;
	margin: 0 auto;
	h1 {
		line-height: 1.5;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		margin: 40px 0 0 0;
	}
`;

export const AHeader = styled.div`
	animation: ${open} ${fadeIn2};
	h1 {
		font-size: ${(props) => props.theme.typography.size.header};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		color: ${(props) => props.theme.colors.font.primary};
	}
	span {
		display: block;
		margin: 10px 0 0 0;
		line-height: 1.5;
	}
`;

export const WWrapper = styled.div`
	margin: 25px 0 0 0;
	animation: ${open} ${fadeIn2};
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const GWrapper = styled.div`
	margin: 25px 0 0 0;
	animation: ${open} ${fadeIn2};
	p,
	span {
		display: block;
		padding: 20px;
		line-height: 1.5;
	}
	p {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const GDetailWrapper = styled.div`
	max-height: 315px;
	margin: 0 0 20px 0;
	p {
		font-size: ${(props) => props.theme.typography.size.header};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.xBold};
		color: ${(props) => props.theme.colors.font.primary};
	}
	> * {
		&:not(:last-child) {
			margin: 0 0 10px 0;
		}
		&:last-child {
			margin: 0;
		}
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		max-height: none;
	}
`;

export const GDetailLine = styled.button`
	height: 55px;
	width: 100%;
	text-align: left;
	padding: 0 20px;
	display: flex;
	align-items: center;
	&:hover {
		background: ${(props) => props.theme.colors.container.primary.hover};
	}
	span {
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		padding: 0;
	}
`;

export const GDetailLogo = styled.div`
	min-height: 30px;
	min-width: 30px;
	height: 30px;
	width: 30px;
	margin: 0 15px 0 0;
	position: relative;
	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const GCWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
	gap: 15px;
	margin: 25px 0;
	animation: ${open} ${fadeIn2};
`;

export const SWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	button {
		margin: 0 0 0 auto;
	}
`;

export const RWrapper = styled.div<{ status: 'success' | 'failure' }>`
	max-width: 75%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	span {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) =>
			props.status === 'success'
				? props.theme.colors.font.primary
				: props.theme.colors.notification.warning} !important;
	}
`;

export const Form = styled.form``;
