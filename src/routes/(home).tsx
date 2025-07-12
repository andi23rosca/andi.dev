import { For } from "solid-js";
import { posts } from "~/data/posts";
import { Posts } from "~/components/Posts";
import { TextHoverJump } from "~/components/TextHoverJump";

const links = [
	"https://github.com/andi23rosca",
	"https://linkedin.com/in/andirosca",
	"https://codementor.io/@andi23rosca",
	"https://dev.to/andi23rosca",
];
const Homepage = () => {
	return (
		<div>
			<section class="flex flex-col sm:flex-row gap-2v sm:gap-3h">
				<div class="font-medium">
					<div class="flex items-end mb-1v gap-1h">
						<img
							class="inline-block h-2v select-none wave-image"
							alt="wave emoji"
							src="/images/wave-pixel.png"
						/>
						<p>Hi, Andi here.</p>
					</div>
					<p class="mb-1v">
						Expect to read a good mix of web-dev content and whatever niche
						programming interest I've gotten into lately.
					</p>
					<p>
						Say hi:{" "}
						<a
							class="[&_span]:underline"
							target="_blank"
							rel="noreferrer"
							href="mailto:hi@andi.dev"
						>
							<TextHoverJump text="hi@andi.dev" />
						</a>
					</p>
				</div>
				<ul class="sm:mt-3v text-base sm:text-sm leading-1">
					<For each={links}>
						{(link) => (
							<li class="list-square ml-2h leading-1">
								<a
									target="_blank"
									rel="noreferrer"
									href={link}
									class="underline"
								>
									{link.replace("https://", "")}
								</a>
							</li>
						)}
					</For>
				</ul>
			</section>

			<hr />

			<section>
				<h2 class="font-bold mt-1v mb-1v uppercase leading-1">Latest posts</h2>

				<Posts posts={posts} />
			</section>
		</div>
	);
};

export default Homepage;
