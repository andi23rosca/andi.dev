import { createSignal, onMount } from "solid-js";

export const DarkModeToggle = () => {
	let ref!: HTMLButtonElement;

	const [dark, setDark] = createSignal(false);
	const size = 64;
	const max = 5;
	const time = 70;
	let direction = dark() ? -1 : 1;
	let current = dark() ? 0 : max;

	onMount(() => {
		const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		setDark(isDark);
		if (isDark) {
			direction = -1;
			current = 0;
		}
		requestAnimationFrame(() => {
			play();
		});
	});

	const coord = (n: number) => -n * size;

	const play = () => {
		ref.style.backgroundPositionX = `${coord(current)}px`;
		if (direction === -1 && current === 2) {
			document.documentElement.classList.add("dark");
			// ref.style.filter = "invert(0)";
		}
		if (direction === 1 && current === 3) {
			document.documentElement.classList.remove("dark");
			// ref.style.filter = "invert(1)";
		}
		if (direction === -1 && current === 0) return;
		if (direction === 1 && current === max) return;
		current += direction;
		setTimeout(play, time);
	};
	const toggle = () => {
		if (dark()) {
			direction = 1;
		} else {
			direction = -1;
		}
		play();
		setDark((d) => !d);
	};

	return (
		<div class="absolute top-1v right-4h">
			<button
				onClick={toggle}
				ref={ref}
				class="pixelated"
				style={{
					scale: "1.5",
					height: "32px",
					width: "64px",
					"background-image": `url("/images/toggle.png")`,
				}}
				aria-hidden
				type="button"
			/>
		</div>
	);
};
