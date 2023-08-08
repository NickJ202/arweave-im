import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 50px;
    width: 100%;
    position: fixed;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 0 15px;
    background: ${(props) => props.theme.colors.container.primary.background};
    border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
    span {
        font-size: clamp(18px,1.15vw,20px);
        font-family: ${(props) => props.theme.typography.family.primary};
        font-weight: ${(props) => props.theme.typography.weight.bold};
        color: ${(props) => props.theme.colors.font.primary};
    }
`;