import { GroupReduxType, ReduxActionType } from 'helpers/types';

import { SET_GROUP } from './constants';

export function groupReducer(state: GroupReduxType | null = null, action: ReduxActionType) {
	switch (action.type) {
		case SET_GROUP:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}
