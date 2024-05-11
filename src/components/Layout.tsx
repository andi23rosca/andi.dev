import type { ParentComponent } from "solid-js";

export const Layout: ParentComponent = (props) => {
	return (
		<>
			<a href="#main-content" class="visually-hidden">
				Skip to main content
			</a>
			<main
				id="main-content"
				class="container max-w-screen-sm px-4 mx-auto mt-6"
			>
				<header class="flex flex-col items-center justify-center p-10">
					<a href="/">
						<picture>
							<source
								srcset="/logo-dark.png"
								media="(prefers-color-scheme:dark)"
							/>
							<img
								class="max-w-64 h-28"
								alt="andi.dev logo"
								src="/logo-light.png"
							/>
						</picture>
					</a>
				</header>

				{props.children}
			</main>
		</>
	);
};
