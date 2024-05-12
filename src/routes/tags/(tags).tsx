import { For } from "solid-js";
import { tags } from "~/data/tags";

const Tags = () => {
	return (
		<div>
			<ol>
				<For each={Object.values(tags)}>
					{(tag) => (
						<li>
							<a href={`/tags/${tag.id}`}>
								{tag.id} - {tag.posts.length}
							</a>
						</li>
					)}
				</For>
			</ol>
		</div>
	);
};

export default Tags;
