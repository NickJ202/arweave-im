import { DOM } from 'helpers/config';
import { Header } from 'navigation/header';
import { Panel } from 'navigation/panel';
import { Routes } from 'routes';

import * as S from './styles';

export default function App() {
	return (
		<>
			<div id={DOM.loader} />
			<div id={DOM.modal} />
			<div id={DOM.notification} />
			<S.Panel>
				<Panel overlay={false} active={false} handleClose={null} />
			</S.Panel>
			<Header />
			<Routes />
		</>
	);
}
