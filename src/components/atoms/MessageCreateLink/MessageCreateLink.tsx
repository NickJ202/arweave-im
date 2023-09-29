import React from 'react';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Modal } from 'components/molecules/Modal';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function MessageCreateLink(props: IProps) {
	const [link, setLink] = React.useState<string>('');

    function handleSubmit(e: any) {
        e.preventDefault();
        e.stopPropagation();
        props.handleSubmit(link);
        props.handleClose();
    }

	return (
		<Modal header={language.addLink} handleClose={props.handleClose}>
			<S.Form onSubmit={(e: any) => handleSubmit(e)}>
				<FormField
					label={language.link}
					value={link}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
					disabled={false}
					invalid={{ status: false, message: null }}
				/>
                <S.Actions>
                    <Button
                        type={'primary'}
                        label={language.cancel}
                        handlePress={props.handleClose}
                        disabled={false}
                        noMinWidth
                    />
                    <Button
                        type={'alt1'}
                        label={language.add}
                        handlePress={(e: any) => handleSubmit(e)}
                        disabled={!link || !checkValidLink(link)}
                        noMinWidth
                        formSubmit
                    />
                </S.Actions>
			</S.Form>
		</Modal>
	);
}

function checkValidLink(link: string): boolean {
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
        return false;
    }
    
    let protocolEnd = link.indexOf('//') + 2;
    if (protocolEnd >= link.length) {
        return false;
    }

    return true;
}

