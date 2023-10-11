import styled from 'styled-components';

import { fadeIn1, open, openRight } from 'helpers/animations';

export const Wrapper = styled.div``;

export const PWrapper = styled.div`
	height: 100vh;
	width: 400px;
	max-width: 100vw;
	position: fixed;
	top: 0;
	right: 0;
	z-index: 1;
	padding: 0;
	background: ${(props) => props.theme.colors.container.alt1.background};
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
	border-left: 1px solid ${(props) => props.theme.colors.border.primary};
	will-change: transform;
	animation: ${openRight} 0.15s ease-in-out forwards;
`;

export const TWrapper = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	animation: ${open} ${fadeIn1};
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		max-width: 75%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const BWrapper = styled.div`
	height: calc(100% - 50px);
	width: 100%;
	padding: 20px 0;
`;

export const AWrapper = styled.div`
	width: fit-content;
	margin: 5px auto 0 auto;
`;

export const IWrapper = styled.div`
	width: 100%;
	margin: 25px 0 0 0;
	padding: 0 20px 25px 20px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Name = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		max-width: 75%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const Address = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: space-between;
	margin: 7.5px 0 0 0;
	span {
		color: ${(props) => props.theme.colors.font.alt2};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const SWrapper = styled(IWrapper)``;

export const SHeader = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		max-width: 75%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const SBody = styled.div`
	width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: 15px 0 0 0;
	> * {
		&:not(:last-child) {
			margin: 0 0 10px 0;
		}
		&:last-child {
			margin: 0;
		}
	}
`;
