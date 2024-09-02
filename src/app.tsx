import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, onCleanup, onMount, Suspense } from "solid-js";
import "./app.css";
import { Layout } from "./components/Layout";
import { MetaProvider, Title } from "@solidjs/meta";

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
					return (
						<Layout>
							<Suspense>{props.children}</Suspense>
						</Layout>
					);
				}}
			>
				<FileRoutes />
			</Router>
		</MetaProvider>
	);
}
