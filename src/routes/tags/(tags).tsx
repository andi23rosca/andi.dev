import { For } from "solid-js";
import { tags } from "~/data/tags";

const Tags = () => {
	return (
		<div>
			<h1 class="text-lg font-bold mb-6">All tags:</h1>
			<ol class="flex flex-col gap-4">
				<For each={Object.values(tags)}>
					{(tag) => (
						<li class="">
							<a class="underline underline-offset-2" href={`/tags/${tag.id}`}>
								{tag.id}
							</a>
							<span>
								{" "}
								- {tag.posts.length} Post{tag.posts.length === 1 ? "" : "s"}
							</span>
						</li>
					)}
				</For>
			</ol>
		</div>
	);
};

export default Tags;
