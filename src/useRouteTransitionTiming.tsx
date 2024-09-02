import { useIsRouting, useBeforeLeave } from "@solidjs/router";
import { createEffect } from "solid-js";

export const useRouteTransitionTiming = (
	transitionTime: number,
	onEnter: () => void,
	onLoading: () => void,
	onExit: () => void,
) => {
	const isRouting = useIsRouting();
	createEffect((oldR: boolean | undefined) => {
		const r = isRouting();
		if (oldR && !r) onExit();
		return r;
	});
	useBeforeLeave((e) => {
		e.preventDefault();
		onEnter();
		setTimeout(() => {
			e.retry(true);
			onLoading();
		}, transitionTime);
	});
};
