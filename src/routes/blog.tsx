import { For } from "solid-js";
import type { RouteSectionProps } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { posts } from "virtual:blog-posts";
import { MDXProvider } from "solid-mdx";
import { markdownComponents } from "~/components/Markdown";
import dayjs from "dayjs";
import "../css/prism-theme.css";

const Blog = (props: RouteSectionProps<unknown>) => {
	const meta = () =>
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		posts.find((p) => props.location.pathname.endsWith(p.slug))!;

	return (
		<article class="pt-4 pb-20">
			<Title>{meta().title}</Title>
			<Meta name="og:title" content={meta().title} />
			<Meta name="description" content={meta().description} />
			<Meta name="og:description" content={meta().description} />

			<h1 class="text-3xl text-zinc-800 dark:text-zinc-200 font-bold mb-3">
				{meta().title}
			</h1>

			<div class="flex items-center gap-6 mb-6">
				<p>{dayjs(meta().date).format("D MMMM YYYY")}</p>

				<div class="flex items-center gap-2">
					<For each={meta().tags}>
						{(tag, index) => (
							<a
								href={`/tags/${tag}`}
								class="font-medium underline underline-offset-2 italic"
							>
								{tag + (index() === meta().tags.length - 1 ? "" : ",")}
							</a>
						)}
					</For>
				</div>
			</div>

			<MDXProvider components={markdownComponents}>
				{props.children}
			</MDXProvider>
		</article>
	);
};
export default Blog;
