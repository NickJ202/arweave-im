import { ReactSVG } from 'react-svg';

import * as S from './styles';
import { IProps } from './types';

export default function IconButton(props: IProps) {
	const buttonStyle = getType();
	const StyledButton = buttonStyle.wrapper;

	function getType() {
		let buttonObj: {
			wrapper: any;
		};
		buttonObj = {
			wrapper: S.Primary,
		};
		return buttonObj;
	}

	function handlePress(e: any) {
		e.preventDefault();
		props.handlePress();
	}

	function getAction() {
		return (
			<StyledButton
				title={props.tooltip ? props.tooltip : null}
				onMouseDown={handlePress}
				disabled={props.disabled}
				active={props.active}
				sm={props.sm}
				warning={props.warning}
				dimensions={props.dimensions}
			>
				<ReactSVG src={props.src} />
			</StyledButton>
		);
	}

	function getButton() {
		if (props.tooltip) {
			return (
				<S.Wrapper>
					{getAction()}
				</S.Wrapper>
			);
		} else {
			return <>{getAction()}</>;
		}
	}

	return <>{getButton()}</>;
}
