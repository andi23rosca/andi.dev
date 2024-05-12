import type { RouteSectionProps } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { posts } from "virtual:blog-posts";
import { MDXProvider } from "solid-mdx";
import { Blockquote, Li, Ol, P, Ul } from "~/components/Markdown";
import "prismjs";

const Blog = (props: RouteSectionProps<unknown>) => {
	const meta = () =>
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		posts.find((p) => props.location.pathname.endsWith(p.slug))!;

	return (
		<article>
			<Title>{meta().title}</Title>
			<Meta name="og:title" content={meta().title} />
			<Meta name="description" content={meta().description} />
			<Meta name="og:description" content={meta().description} />
			<MDXProvider
				components={{
					p: P,
					li: Li,
					ol: Ol,
					ul: Ul,
					blockquote: Blockquote,
				}}
			>
				{props.children}
			</MDXProvider>
		</article>
	);
};
export default Blog;
