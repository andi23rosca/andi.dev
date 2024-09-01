import { A } from "@solidjs/router";
import { For, type ParentComponent } from "solid-js";
import { TextHoverJump } from "./TextHoverJump";

export const Layout: ParentComponent = (props) => {
	return (
		<>
			<a href="#main-content" class="sr-only">
				Skip to main content
			</a>
			<div class="flex flex-col min-h-screen py-1v px-2h max-w-thread mx-auto relative overflow-x-hidden leading-1 box-border decoration-2 underline-offset-2">
				<header class="flex flex-col items-center justify-center gap-2v px-4h py-2v">
					<a href="/" class="text-2v leading-2 font-bold">
						<TextHoverJump text="~/andi.dev" />
					</a>

					<nav>
						<ul class="flex items-center gap-7h">
							<For
								each={[
									{ label: "Home", url: "/" },
									{ label: "Article series", url: "/series" },
									{ label: "All tags", url: "/tags" },
								]}
							>
								{(item) => (
									<li>
										<A
											end
											class="hover:underline"
											activeClass="font-bold"
											href={item.url}
										>
											{item.label}
										</A>
									</li>
								)}
							</For>
						</ul>
					</nav>
				</header>
				<main id="main-content" class="mt-1v flex-auto">
					{props.children}
				</main>

				<div class="mx-auto text-xs text-center">
					Design inspired by (and copied from):{" "}
					<a
						class="underline"
						href="https://owickstrom.github.io/the-monospace-web"
						target="_blank"
						rel="noreferrer"
					>
						owickstrom.github.io/the-monospace-web
					</a>
				</div>

				<div class="debug-grid" />
			</div>
		</>
	);
};
