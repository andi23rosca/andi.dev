import { Posts } from "~/components/Posts";
import { posts } from "virtual:blog-posts";
import { series as allSeries } from "~/data/series";

const WeekendSeries = () => {
	return (
		<div>
			<h1 class="text-xl font-bold mt-2v mb-1v">The weekend series</h1>
			<p class="mt-1v">
				This is where I'll explore complex subjects and distill them into small
				projects that can be followed along and completed within a weekend or
				less.
			</p>

			<h2 class="font-bold uppercase mt-2v mb-1v">Posts</h2>
			<ol class="flex flex-col gap-1v mt-1v">
				<Posts posts={allSeries["weekend-series"].posts.map((p) => posts[p])} />
			</ol>
		</div>
	);
};

export default WeekendSeries;
