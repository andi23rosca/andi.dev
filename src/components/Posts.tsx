import dayjs from "dayjs";
import { type Component, For } from "solid-js";
import type { Post } from "~/types";

export const Posts: Component<{ posts: Post[] }> = (props) => {
	return (
		<ol class="">
			<For each={props.posts}>
				{(post) => (
					<li class="list-square ml-2h mb-1v">
						<a class="font-medium underline block" href={`/blog/${post.slug}`}>
							{post.title}
						</a>
						<span class="text-xs leading-1 text-slate-600 dark:text-slate-400">
							{dayjs(post.date).format("MMMM YYYY")}
						</span>
					</li>
				)}
			</For>
		</ol>
	);
};
