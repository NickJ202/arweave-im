import React from 'react';
import { useSelector } from 'react-redux';

import { DOM } from 'helpers/config';
import { language } from 'helpers/language';
import { NotificationReduxType } from 'helpers/types';
import { Routes } from 'routes';
import { RootState } from 'store';

export default function App() {
	const notificationsReducer = useSelector((state: RootState) => state.notificationsReducer);

	React.useEffect(() => {
		if (notificationsReducer && notificationsReducer.length) {
			const notificationCount = notificationsReducer.reduce(
				(acc: number, notificationObject: NotificationReduxType) => acc + notificationObject.count,
				0
			);
			document.title = `${language.appName} (${notificationCount})`;
		} else document.title = language.appName;
	}, [notificationsReducer]);

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
