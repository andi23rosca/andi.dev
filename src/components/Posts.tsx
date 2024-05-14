import dayjs from "dayjs";
import { type Component, For } from "solid-js";
import type { Post } from "~/types";

export const Posts: Component<{ posts: Post[] }> = (props) => {
	return (
		<ol class="flex flex-col gap-4">
			<For each={props.posts}>
				{(post) => (
					<li class="flex flex-col">
						<a class="text-lg font-light rounded" href={`/blog/${post.slug}`}>
							{post.title}
						</a>
						<span class="text-sm text-gray-500 font-light">
							{dayjs(post.date).format("MMMM YYYY")}
						</span>
					</li>
				)}
			</For>
		</ol>
	);
};
