import type { ParentComponent } from "solid-js";

export const Layout: ParentComponent = (props) => {
	return (
		<>
			<a href="#main-content" class="visually-hidden">
				Skip to main content
			</a>
			<div class="container max-w-screen-md px-4 mx-auto mt-6">
				<header class="flex flex-col items-center justify-center gap-8 p-10">
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

					<nav>
						<ul class="flex items-center gap-4">
							<li class="hover:underline underline-offset-2">
								<a href="/">Home</a>
							</li>
							<li class="hover:underline underline-offset-2">
								<a href="/tags">Tags</a>
							</li>
						</ul>
					</nav>
				</header>

				<main id="main-content">{props.children}</main>
			</div>
		</>
	);
};
