import * as a from "../routes/blog/solid-resource-storage.mdx";

export const AllPosts: {
	date: Date;
	slug: string;
	tags: string[];
}[] = [a.meta]
	.map((i) => ({ ...i, date: new Date(i.date) }))
	.sort((a, b) => b.date.getTime() - a.date.getTime());
