import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import * as urls from 'helpers/urls';
import { View } from 'wrappers/View';

const Channel = getLazyImport('Channel');

export default function _Routes() {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route
					path={`${urls.base}:groupId/:channelId`}
					element={
						<View>
							<Channel />
						</View>
					}
				/>
			</Routes>
		</Suspense>
	);
}

function getLazyImport(view: string) {
	return lazy(() =>
		import(`../views/${view}/index.tsx`).then((module) => ({
			default: module.default,
		}))
	);
}
