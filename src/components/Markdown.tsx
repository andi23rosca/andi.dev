import {
	type Component,
	createMemo,
	type ParentComponent,
	type JSXElement,
} from "solid-js";

const P: ParentComponent = (props) => <p class="mb-4">{props.children}</p>;

const Ol: ParentComponent = (props) => <ol class="mb-4">{props.children}</ol>;
const Ul: ParentComponent = (props) => <ul class="mb-4">{props.children}</ul>;

const Li: ParentComponent = (props) => (
	<li class="list-disc ml-6 mb-2">{props.children}</li>
);

const Blockquote: ParentComponent = (props) => (
	<blockquote class="px-4 py-2 text-zinc-700 dark:text-zinc-300 italic">
		{props.children}
	</blockquote>
);

const Pre: ParentComponent<{ lang: string }> = (props) => {
	return (
		<div class="mt-4 mb-8">
			<pre class={`language-${props.lang}`}>{props.children}</pre>
		</div>
	);
};

const headingLink = (children: JSXElement) =>
	children?.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "");

const H2: ParentComponent = (props) => (
	<h2
		id={headingLink(props.children)}
		class="text-2xl font-bold mt-6 mb-3 relative"
	>
		<a
			href={`#${headingLink(props.children)}`}
			class="text-gray-400 absolute -left-6"
		>
			#
		</a>
		{props.children}
	</h2>
);

const H3: ParentComponent = (props) => (
	<h3
		id={headingLink(props.children)}
		class="text-xl font-bold mt-6 mb-3 relative"
	>
		<a
			href={`#${headingLink(props.children)}`}
			class="text-gray-400 absolute -left-6"
		>
			#
		</a>
		{props.children}
	</h3>
);

const H4: ParentComponent = (props) => (
	<h4
		id={headingLink(props.children)}
		class="text-lg font-bold mt-6 mb-3 relative"
	>
		<a
			href={`#${headingLink(props.children)}`}
			class="text-gray-400 absolute -left-6"
		>
			#
		</a>
		{props.children}
	</h4>
);

const A: ParentComponent<{ href: string }> = (props) => {
	const isLocal = createMemo(() =>
		["/", "./", "#"].some((s) => props.href.startsWith(s)),
	);

	return (
		<a
			href={props.href}
			target={isLocal() ? "" : "_blank"}
			class="underline underline-offset-2"
		>
			{props.children}
		</a>
	);
};

export const PostImage: Component<{
	src: string;
	alt: string;
	attr?: JSXElement;
}> = (props) => {
	return (
		<div>
			<img src={props.src} alt={props.alt} class="w-full" />
			{props.attr}
		</div>
	);
};

export const Aside: ParentComponent = (props) => (
	<aside class="border-l-4 border-blue-300 dark:border-blue-800 pl-4 bg-blue-50 dark:bg-slate-800 py-3">
		{props.children}
	</aside>
);

export const markdownComponents = {
	a: A,
	p: P,
	li: Li,
	ol: Ol,
	ul: Ul,
	blockquote: Blockquote,
	pre: Pre,
	h2: H2,
	h3: H3,
	h4: H4,
};
