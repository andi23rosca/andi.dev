import { For, type Component } from "solid-js";

export const TextHoverJump: Component<{ text: string }> = (props) => {
	return (
		<span class="jump-text flex items-baseline">
			<For each={[...props.text]}>
				{(i, index) => (
					<span
						class="jump-text block"
						style={{
							"--animation-delay": `${index() * 20}ms`,
						}}
					>
						{i}
					</span>
				)}
			</For>
		</span>
	);
};
