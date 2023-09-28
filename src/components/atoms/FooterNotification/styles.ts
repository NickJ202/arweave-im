import styled from 'styled-components';

export const Wrapper = styled.div`
    span {
        font-size: ${(props) => props.theme.typography.size.xxxSmall};
        font-weight: ${(props) => props.theme.typography.weight.xBold};
        color: ${(props) => props.theme.colors.font.alt2};
    }
`;