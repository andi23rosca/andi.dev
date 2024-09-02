import { Router, useBeforeLeave, useIsRouting } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import {
	type Accessor,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	Suspense,
} from "solid-js";
import "./app.css";
import { Layout } from "./components/Layout";
import { MetaProvider, Title } from "@solidjs/meta";
import { isServer } from "solid-js/web";

const useRouteTransitionTiming = (
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

const useDitherAnimation = (ref: Accessor<HTMLElement | undefined>) => {
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

export default function App() {
	onMount(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.metaKey && e.key.toLowerCase() === "k") {
				e.preventDefault(); // Prevent the default action (optional)
				document.body.classList.toggle("debug");
			}
		};
		window.addEventListener("keydown", listener);
		onCleanup(() => {
			window.removeEventListener("keydown", listener);
		});
	});

	return (
		<MetaProvider>
			<Title>andi.dev</Title>
			<Router
				root={(props) => {
					const [ref, setRef] = createSignal<HTMLDivElement>();

					// useDitherAnimation(ref);
					return (
						<Layout>
							<Suspense>{props.children}</Suspense>

							<div aria-hidden ref={setRef} />
						</Layout>
					);
				}}
			>
				<FileRoutes />
			</Router>
		</MetaProvider>
	);
}
