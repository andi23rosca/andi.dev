declare module "virtual:blog-posts" {
	export const posts: {
		title: string;
		date: Date;
		slug: string;
		tags: string[];
		featuredImage?: string;
	}[];
}
