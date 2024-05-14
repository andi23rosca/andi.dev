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
	<blockquote class="px-4 py-2 text-gray-700 dark:text-gray-300 italic">
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

const HeadlineLink: Component<{ link: string; class: string }> = (props) => {
	return (
		<a
			href={props.link}
			class="text-gray-300 hover:text-gray-400 dark:text-gray-600 dark:hover:text-gray-500 relative top-[2px]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class={props.class}
				fill="none"
			>
				<title>link</title>
				<path
					d="M9.52051 14.4359L14.4335 9.52283"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
				/>
				<path
					d="M12.5685 15.1086C13.3082 16.249 13.1108 17.418 12.2563 18.2725L9.26109 21.2678C8.28269 22.2462 6.69638 22.2462 5.71798 21.2678L2.73185 18.2816C1.75345 17.3032 1.75345 15.7169 2.73185 14.7385L5.72706 11.7433C6.429 11.0413 7.76312 10.636 8.90958 11.4662M15.1083 12.5688C16.2487 13.3085 17.4177 13.1111 18.2722 12.2566L21.2674 9.26138C22.2458 8.28297 22.2458 6.69666 21.2674 5.71825L18.2813 2.7321C17.3029 1.75369 15.7166 1.75369 14.7382 2.7321L11.743 5.72733C11.041 6.42927 10.6357 7.7634 11.4659 8.90986"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</a>
	);
};

const H2: ParentComponent = (props) => (
	<h2
		id={headingLink(props.children)}
		class="text-2xl font-bold mt-12 mb-5 flex items-center gap-4"
	>
		{props.children}
		<HeadlineLink class="w-5 h-5" link={`#${headingLink(props.children)}`} />
	</h2>
);

const H3: ParentComponent = (props) => (
	<h3
		id={headingLink(props.children)}
		class="text-xl font-bold mt-12 mb-5 flex items-center gap-4"
	>
		{props.children}
		<HeadlineLink class="w-4 h-4" link={`#${headingLink(props.children)}`} />
	</h3>
);

const H4: ParentComponent = (props) => (
	<h4
		id={headingLink(props.children)}
		class="text-lg font-bold mt-12 mb-5 flex items-center gap-4"
	>
		{props.children}
		<HeadlineLink class="w-3 h-3" link={`#${headingLink(props.children)}`} />
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
			<img src={props.src} alt={props.alt} class="w-full rounded" />
			{props.attr}
		</div>
	);
};

export const Aside: ParentComponent = (props) => (
	<aside class="border-l-4 border-blue-300 dark:border-blue-800 pl-4 bg-blue-50 dark:bg-slate-800 pb-3 pt-5 mb-4">
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
