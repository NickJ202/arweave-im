import { Dispatch } from 'redux';

import { GroupReduxType } from 'helpers/types';

import { SET_GROUP } from './constants';

export function setGroup(payload: GroupReduxType | null) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: SET_GROUP,
			payload: payload,
		});
	};
}
