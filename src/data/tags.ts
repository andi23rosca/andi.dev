import { posts } from "virtual:blog-posts";

export type Tag = {
	// id/name of tag
	id: string;
	// indexes of posts with tag (they point to the posts list coming from virtual:blog-posts)
	posts: number[];
};

export const tags: Record<string, Tag> = posts.reduce(
	(a, p, i) => {
		if (Array.isArray(p.tags)) {
			for (const t of p.tags) {
				if (!a[t]) {
					a[t] = {
						id: t,
						posts: [],
					};
				}
				a[t].posts.push(i);
			}
		}

		return a;
	},
	{} as Record<string, Tag>,
);
