import { DOM } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';

export default function Footer() {
    return (
        <S.Wrapper>
            <S.Title>
                <span>{language.appName}</span>
            </S.Title>
            <S.FNotification id={DOM.footerNotification} />
        </S.Wrapper>
    )
}