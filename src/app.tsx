import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Layout } from "./components/Layout";
import { MetaProvider } from "@solidjs/meta";

export default function App() {
	return (
		<MetaProvider>
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
