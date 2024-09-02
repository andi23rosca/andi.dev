import type { ParentComponent } from "solid-js";

export const Button: ParentComponent<{ onClick?: () => void }> = (props) => {
	return (
		<button class="button" type="button" onClick={props.onClick}>
			{props.children}
		</button>
	);
};
