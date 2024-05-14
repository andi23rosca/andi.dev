import { For, Show } from "solid-js";
import type { RouteSectionProps } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { posts } from "virtual:blog-posts";
import { MDXProvider } from "solid-mdx";
import { markdownComponents } from "~/components/Markdown";
import dayjs from "dayjs";
import "../css/prism-theme.css";
import type { Post } from "~/types";

const Blog = (props: RouteSectionProps<unknown>) => {
	const meta = () =>
		posts.find((p) => props.location.pathname.endsWith(p.slug)) as Post;
	const index = () => posts.indexOf(meta());

	const prevMeta = () =>
		index() === posts.length - 1 ? undefined : posts[index() + 1];
	const nextMeta = () => (index() === 0 ? undefined : posts[index() - 1]);

	return (
		<article class="pt-4 pb-20">
			<Title>{meta().title}</Title>
			<Meta name="og:title" content={meta().title} />
			<Meta name="description" content={meta().description} />
			<Meta name="og:description" content={meta().description} />

			<h1 class="text-3xl text-gray-800 dark:text-gray-200 font-bold mb-6">
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

			<div class="mt-12 flex flex-col gap-4">
				<Show when={prevMeta()} fallback={<div />}>
					<div class="flex gap-2">
						<span>Previous:</span>
						<a
							class="underline underline-offset-2"
							href={`/blog/${prevMeta()?.slug}`}
						>
							{prevMeta()?.title}
						</a>
					</div>
				</Show>
				<Show when={nextMeta()} fallback={<div />}>
					<div class="flex gap-2">
						<span>Next:</span>
						<a
							class="underline underline-offset-2"
							href={`/blog/${nextMeta()?.slug}`}
						>
							{nextMeta()?.title}
						</a>
					</div>
				</Show>
			</div>
		</article>
	);
};
export default Blog;
