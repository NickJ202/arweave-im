import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { App } from 'app';
import { GlobalStyle } from 'app/styles';
import { defaultTheme } from 'helpers/themes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeProvider theme={defaultTheme}>
		<HashRouter>
			<GlobalStyle />
			<App />
		</HashRouter>
	</ThemeProvider>
);
