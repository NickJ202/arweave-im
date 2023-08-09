import { DOM } from 'helpers/config';
import { Header } from 'navigation/header';
import { Panel } from 'navigation/panel';
import { Routes } from 'routes';

export default function App() {
	return (
		<>
			<div id={DOM.loader} />
			<div id={DOM.modal} />
			<div id={DOM.notification} />
			<Panel groupId={'EodNWrXM0bXpH_TGAqw02_yRUqKZojvJQeRaa-f_V3g'} />
			<Header />
			<Routes />
		</>
	);
}
