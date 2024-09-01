import { For } from "solid-js";
import { tags } from "~/data/tags";

const Tags = () => {
	return (
		<div>
			<h1 class="text-xl font-bold mt-2v mb-1v">All tags:</h1>
			<ol class="flex flex-col gap-1v list-square ml-2h">
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
