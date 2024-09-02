import type { Accessor } from "solid-js";
import { isServer } from "solid-js/web";
import { useRouteTransitionTiming } from "./useRouteTransitionTiming";

export const useDitherAnimation = (ref: Accessor<HTMLElement | undefined>) => {
	if (!isServer) {
		const d1 = document.createElement("div");
		d1.classList.add("dither", "dither-1");
		const d2 = document.createElement("div");
		d2.classList.add("dither", "dither-2");
		const d3 = document.createElement("div");
		d3.classList.add("dither", "dither-3");

		let started = false;
		useRouteTransitionTiming(
			300,
			() => {
				ref()?.appendChild(d1);
				setTimeout(() => {
					ref()?.appendChild(d2);
				}, 100);
				setTimeout(() => {
					ref()?.appendChild(d3);
				}, 200);
				started = true;
			},
			() => {
				const rnd = () =>
					setTimeout(() => {
						try {
							d1.style.backgroundPosition = `${Math.round(
								Math.random() * 100,
							)}px ${Math.round(Math.random() * 100)}px`;
							d2.style.backgroundPosition = `${Math.round(
								Math.random() * 100,
							)}px ${Math.round(Math.random() * 100)}px`;
							d3.style.backgroundPosition = `${Math.round(
								Math.random() * 100,
							)}px ${Math.round(Math.random() * 100)}px`;
						} catch (error) {
							console.error(error);
						}
						if (started) {
							rnd();
						}
					}, 100);
				rnd();
			},
			() => {
				started = false;
				try {
					ref()?.removeChild(d3);
				} catch (error) {
					console.error(error);
				}
				setTimeout(() => {
					try {
						ref()?.removeChild(d2);
					} catch (error) {
						console.error(error);
					}
				}, 100);
				setTimeout(() => {
					try {
						ref()?.removeChild(d1);
					} catch (error) {
						console.error(error);
					}
				}, 200);
			},
		);
	}
};
