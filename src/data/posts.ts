// @ts-expect-error
import Posts from "./posts.json";
import type { Post } from "~/types";

export const posts: Post[] = Posts.map((p: Post) => ({
	...p,
	date: new Date(p.date),
}));
