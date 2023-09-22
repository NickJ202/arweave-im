import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.button<{ dimensions: { wrapper: number; icon: number }, hexCode: string, hasCallback: boolean }>`
    min-height: ${(props) => `${props.dimensions.wrapper.toString()}px`};
    min-width: ${(props) => `${props.dimensions.wrapper.toString()}px`};
    height: ${(props) => `${props.dimensions.wrapper.toString()}px`};
    width: ${(props) => `${props.dimensions.wrapper.toString()}px`};
    background: ${(props) => props.hexCode ? props.hexCode : props.theme.colors.icon.alt2};
    border: 1px solid ${(props) => props.hexCode ? props.hexCode : props.theme.colors.border.primary};
    border-radius: ${STYLING.dimensions.borderRadius};
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
        height: 100%;
        width: 100%;
    }
    svg {
        min-height: ${(props) => `${props.dimensions.icon.toString()}px`};
        min-width: ${(props) => `${props.dimensions.icon.toString()}px`};
        height: ${(props) => `${props.dimensions.icon.toString()}px`};
        width: ${(props) => `${props.dimensions.icon.toString()}px`};
        padding: 3.5px 0 0 0px;
        margin: 0 0 2.5px 0;
        stroke: ${(props) => props.theme.colors.icon.alt1};
    }

    pointer-events: none;
    &:hover {
        cursor: default;
    }
    &:focus {
        opacity: 1;
    }

    ${(props) => props.hasCallback ? `
        pointer-events: all;
        ::after {
            content: "";
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${props.theme.colors.overlay.alt1};
            opacity: 0;
            transition: all 100ms;
        }
        
        &:hover::after {
            opacity: 1;
        }
        &:focus::after {
            opacity: 1;
        }
        &:hover {
            cursor: pointer;
            border: none;
        }
    ` : ''}
`;