import { Dispatch } from 'redux';

import { NotificationReduxType } from 'helpers/types';

import { CLEAR_NOTIFICATIONS, SET_NOTIFICATIONS } from './constants';

export function setNotifications(payload: NotificationReduxType[]) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: SET_NOTIFICATIONS,
			payload: payload,
		});
	};
}

export function clearNotifications(payload: string) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: CLEAR_NOTIFICATIONS,
			payload: payload,
		});
	};
}
