import { ReactSVG } from 'react-svg';

import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function Button(props: IProps) {
	const buttonStyle = getType();
	const StyledButton = buttonStyle.wrapper;
	const StyledIcon = buttonStyle.icon;

	function getType() {
		let buttonObj: {
			wrapper: any;
			icon: any;
		};

		switch (props.type) {
			case 'primary':
				buttonObj = {
					wrapper: S.Primary,
					icon: S.IconPrimary,
				};
				break;
			case 'alt1':
				buttonObj = {
					wrapper: S.Alt1,
					icon: S.IconAlt1,
				};
				break;
			case 'alt2':
				buttonObj = {
					wrapper: S.Alt2,
					icon: S.IconAlt2,
				};
				break;
		}
		return buttonObj;
	}

	function getLabel() {
		return (
			<>
				{props.icon && props.iconLeftAlign && (
					<StyledIcon disabled={props.disabled} active={props.active} leftAlign={props.iconLeftAlign}>
						<ReactSVG src={props.icon} />
					</StyledIcon>
				)}
				<span>{props.label}</span>
				{props.icon && !props.iconLeftAlign && (
					<StyledIcon disabled={props.disabled} active={props.active} leftAlign={props.iconLeftAlign}>
						<ReactSVG src={props.icon} />
					</StyledIcon>
				)}
			</>
		);
	}

	function handlePress(e: React.MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		props.handlePress(e);
	}

	return (
		<StyledButton
			tabIndex={props.noFocus ? -1 : 0}
			type={props.formSubmit ? 'submit' : 'button'}
			title={props.tooltip ? props.tooltip : null}
			onClick={props.handlePress}
			onKeyPress={handlePress}
			disabled={props.disabled}
			active={props.active}
			useMaxWidth={props.useMaxWidth}
			noMinWidth={props.noMinWidth}
			fullWidth={props.fullWidth}
			width={props.width}
			height={props.height}
		>
			{props.loading ? <span>{`${language.loading}...`}</span> : getLabel()}
		</StyledButton>
	);
}
