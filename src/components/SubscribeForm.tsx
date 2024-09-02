import { onMount } from "solid-js";

export const SubscribeForm = () => {
	let ref!: HTMLDivElement;
	onMount(() => {
		const el = document.createElement("script");
		el.setAttribute("data-uid", "a6d9b30e24");
		el.setAttribute("async", "true");
		el.setAttribute("src", "https://andi-dev.ck.page/a6d9b30e24/index.js");
		ref.append(el);
	});

	return <div ref={ref} />;
};
