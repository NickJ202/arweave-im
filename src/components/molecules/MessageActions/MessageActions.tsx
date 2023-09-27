import { IconButton } from 'components/atoms/IconButton';
import { ASSETS } from 'helpers/config';

import * as S from './styles';
import { IProps } from './types';

export default function MessageActions(props: IProps) {
	return props.id ? (
        <S.Wrapper>
            <IconButton
                type={'alt1'}
                src={ASSETS.stamp}
                handlePress={() => console.log('stamp')}
                dimensions={{
                    wrapper: 25,
                    icon: 15
                }}
            />
            <IconButton
                type={'alt1'}
                src={ASSETS.stamp}
                handlePress={() => console.log('stamp')}
                dimensions={{
                    wrapper: 25,
                    icon: 15
                }}
            />
            <IconButton
                type={'alt1'}
                src={ASSETS.stamp}
                handlePress={() => console.log('stamp')}
                dimensions={{
                    wrapper: 25,
                    icon: 15
                }}
            />
        </S.Wrapper>
    ) : null;
}
