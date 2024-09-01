import type { ParentComponent } from "solid-js";

export const Button: ParentComponent<{ onClick?: () => void }> = (props) => {
	return (
		<button
			class="button bg-white dark:bg-black px-1h shadow-box active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
			type="button"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};
