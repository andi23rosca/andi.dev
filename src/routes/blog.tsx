import { For, Show } from "solid-js";
import type { RouteSectionProps } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { posts } from "~/data/posts";
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
		<article class="pb-5v">
			<Title>andi.dev - {meta()?.title}</Title>
			<Meta name="og:title" content={meta().title} />
			<Meta name="description" content={meta().description} />
			<Meta name="og:description" content={meta().description} />

			<h1 class="text-2v leading-2 font-bold mb-1v">{meta().title}</h1>

			<div class="flex items-center gap-4h mb-2v text-sm leading-1">
				<p>{dayjs(meta().date).format("D MMMM YYYY")}</p>

				<div class="">
					<For each={meta().tags}>
						{(tag, index) => (
							<>
								<a
									href={`/tags/${tag}`}
									class="font-medium underline underline-offset-2 italic"
								>
									{tag}
								</a>
								{index() === meta().tags.length - 1 ? "" : ", "}
							</>
						)}
					</For>
				</div>
			</div>

			<MDXProvider components={markdownComponents}>
				{props.children}
			</MDXProvider>

			<div class="mt-3v flex flex-col gap-1v">
				<Show when={prevMeta()} fallback={<div />}>
					<div class="flex gap-1h">
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
					<div class="flex gap-1h">
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
