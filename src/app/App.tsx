import { DOM } from 'helpers/config';
import { Routes } from 'routes';

export default function App() {
	return (
		<>
			<div id={DOM.loader} />
			<div id={DOM.notification} />
			<div id={DOM.modal} />
			<div id={DOM.panel} />
			<Routes />
		</>
	);
}
