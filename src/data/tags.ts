import { posts } from "virtual:blog-posts";
import type { Tag } from "~/types";

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
