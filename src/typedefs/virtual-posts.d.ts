declare module "virtual:blog-posts" {
	export const posts: {
		title: string;
		date: string;
		slug: string;
		tags: string[];
		featuredImage?: string;
	}[];
}
