import React from 'react';

import { Footer } from 'navigation/footer';
import { Header } from 'navigation/header';
import { Panel } from 'navigation/panel';

import * as S from './styles';

export default function ConnectedView(props: { children: React.ReactNode }) {
	return (
		<>
			<S.Panel>
				<Panel overlay={false} active={false} handleClose={null} />
			</S.Panel>
			<Header />
			<S.Wrapper>{props.children}</S.Wrapper>
			<Footer />
		</>
	);
}
