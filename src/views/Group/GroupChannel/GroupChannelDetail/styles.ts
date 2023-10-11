import styled from 'styled-components';

export const Wrapper = styled.div`
	height: calc(100% - 50px);
	width: 100%;
	position: relative;
	margin: 50px 0 0 0;
	padding: 15px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const MWrapper = styled.div`
	height: 100%;
`;

export const MHWrapper = styled.div`
	min-height: 40.5px;
	width: 100%;
	padding: 0 15px;
	margin: 0 0 15px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const MHHeader = styled.div`
	margin: 0 0 20px 0;
	h4 {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const MHData = styled.div`
	display: flex;
	align-items: center;
	padding: 0 0 13.5px 0;
	p, span, button {
		line-height: 1.65;
	}
	p, span {
		font-size: ${(props) => props.theme.typography.size.base} !important;
		font-family: ${(props) => props.theme.typography.family.primary};
	}
	span {
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.alt2};
	}
	p {
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const EWrapper = styled.div`
	margin: 0 0 0 15px;
`;

export const CWrapper = styled.div`
	height: fit-content;
	width: calc(100% - 30px);
	margin: 15px auto 0 auto;
`;
