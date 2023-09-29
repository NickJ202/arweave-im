import styled, { createGlobalStyle } from 'styled-components';

import { STYLING } from 'helpers/styling';

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    background: ${(props) => props.theme.colors.view.background};
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: none;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    font-family: ${(props) => props.theme.typography.family.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  
  button {
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    transition: all 100ms;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      cursor: default;
    }
  }

  input, textarea {
    box-shadow: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    margin: 0;
    padding: 10px;
    &:focus {
      outline: 0;
    }
    &:disabled {
      cursor: default;
    }
  }

  input {
    padding: 10px 15px;
  }

  textarea {
    resize: none;
  }

  b, strong {
    font-weight: ${(props) => props.theme.typography.weight.bold};
  }

  p, span {
    line-height: 1.25;
  }

  a {
    color: ${(props) => props.theme.colors.link.color};
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.colors.link.active};
      text-decoration: underline;
			text-decoration-thickness: 1.35px;
    }
  }

  * {
    &:focus {
      outline: none;
      opacity: 0.85;
    }
  }

  .border-wrapper-primary {
    border: 1px solid ${(props) => props.theme.colors.border.primary};
    background: ${(props) => props.theme.colors.container.primary.background};
    border-radius: ${STYLING.dimensions.borderRadius};
    box-shadow: 0 0 7.5px ${(props) => props.theme.colors.shadow};
  }

  .overlay {
    min-height: 100vh;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    background: ${(props) => props.theme.colors.overlay.primary};
    backdrop-filter: blur(2px);
  }

  .scroll-wrapper {
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
  }
`;

export const Panel = styled.aside`
	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;
