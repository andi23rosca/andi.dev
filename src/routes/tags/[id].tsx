import type { RouteSectionProps } from "@solidjs/router";
import { type Component, Show } from "solid-js";
import { posts } from "virtual:blog-posts";
import { Posts } from "~/components/Posts";
import { tags } from "~/data/tags";

const TagId: Component<RouteSectionProps<unknown>> = (props) => {
	const tag = () => tags[props.params.id];
	return (
		<Show when={tag()} fallback={<div>No posts with that tag</div>}>
			<div>
				<h2>Tag: {tag().id}</h2>

				<Posts posts={tag().posts.map((i) => posts[i])} />
			</div>
		</Show>
	);
};

export default TagId;
