import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createEffect } from "solid-js";
import "./app.css";
import { Layout } from "./components/Layout";

export default function App() {
	return (
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
	);
}
