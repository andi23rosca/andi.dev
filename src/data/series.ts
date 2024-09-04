import { posts } from "~/data/posts";
import type { Series } from "~/types";

export const series: Record<string, Series> = posts.reduce(
	(all, post, index) => {
		const { series } = post;
		if (series) {
			if (!all[series]) {
				all[series] = {
					id: series,
					posts: [],
				};
			}
			all[series].posts.push(index);
		}
		return all;
	},
	{} as Record<string, Series>,
);
