import dayjs from "dayjs";
import { For } from "solid-js";
import { posts } from "virtual:blog-posts";
import { Posts } from "~/components/Posts";

const links = [
	"https://github.com/andi23rosca",
	"https://linkedin.com/in/andirosca",
	"https://codementor.io/@andi23rosca",
	"https://dev.to/andi23rosca",
];
const Homepage = () => {
	return (
		<div>
			<section class="flex flex-col sm:flex-row sm:items-center gap-6">
				<div>
					<p class="mb-2">Hi 👋, Andi here.</p>
					<p class="mb-2">
						Expect to read a good mix of web-dev content and whatever niche
						programming interest I've gotten into lately.
					</p>
					<p>
						Mail:{" "}
						<a
							class="text-green-600 dark:text-green-500 underline underline-offset-2 rounded"
							target="_blank"
							rel="noreferrer"
							href="mailto:hi@andi.dev"
						>
							hi@andi.dev
						</a>
					</p>
				</div>
				<div class="">
					<ul>
						<For each={links}>
							{(link) => (
								<li class="">
									<a
										target="_blank"
										rel="noreferrer"
										href={link}
										class="rounded mb-1 text-sm text-zinc-700 dark:text-zinc-300 font-light hover:underline underline-offset-2 hover:text-green-600 hover:dark:text-green-500"
									>
										{link.replace("https://", "")}
									</a>
								</li>
							)}
						</For>
					</ul>
				</div>
			</section>

			<div aria-hidden class="border border-dashed border-gray-200 my-6" />

			<section>
				<h2 class="text-lg font-medium mb-4">Latest posts</h2>

				<Posts posts={posts} />
			</section>
		</div>
	);
};

export default Homepage;
