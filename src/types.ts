export type Post = {
	title: string;
	date: Date;
	slug: string;
	tags: string[];
	series?: string;
	featuredImage?: string;
	description: string;
};

export type Tag = {
	// id/name of tag
	id: string;
	// indexes of posts with tag (they point to the posts list coming from virtual:blog-posts)
	posts: number[];
};

export type Series = {
	id: string;
	posts: number[];
};
