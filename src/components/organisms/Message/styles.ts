import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
`;

export const MAvatarWrapper = styled.div`
    height: 45px;
    width: 45px;
    border: 1px solid ${(props) => props.theme.colors.border.primary};
    border-radius: ${STYLING.dimensions.borderRadius};
    background: #F9F9F9;
`;

export const MMessage = styled.div`
    width: calc(100% - 45px);
    padding: 0 0 0 20px;
`;

export const MMessageHeader = styled.div`
    display: flex;
    align-items: center;
    p {
        font-size: ${(props) => props.theme.typography.size.base};
        font-family: ${(props) => props.theme.typography.family.primary};
        font-weight: ${(props) => props.theme.typography.weight.bold};
        color: ${(props) => props.theme.colors.font.alt1};
    }
    span {
        margin: 0 0 0 7.5px;
        font-size: ${(props) => props.theme.typography.size.xxSmall};
        font-family: ${(props) => props.theme.typography.family.primary};
        font-weight: ${(props) => props.theme.typography.weight.regular};
        color: ${(props) => props.theme.colors.font.alt2};
    }
`;

export const MText = styled.div`
    margin: 7.5px 0 0 0;
    p {
        line-height: 1.5;
        font-size: ${(props) => props.theme.typography.size.small};
        font-family: ${(props) => props.theme.typography.family.primary};
        font-weight: ${(props) => props.theme.typography.weight.regular};
        color: ${(props) => props.theme.colors.font.alt1};
    }
`;