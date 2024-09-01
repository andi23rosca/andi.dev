import {
	type Component,
	createMemo,
	type ParentComponent,
	type JSXElement,
	createSignal,
} from "solid-js";

const P: ParentComponent = (props) => <p class="mt-1v">{props.children}</p>;

const Ol: ParentComponent = (props) => (
	<ol class="list-decimal">{props.children}</ol>
);
const Ul: ParentComponent = (props) => (
	<ul class="list-square">{props.children}</ul>
);

const Li: ParentComponent = (props) => <li class="ml-2h">{props.children}</li>;

const Blockquote: ParentComponent = (props) => (
	<blockquote class="my-2v pl-1h text-slate-700 dark:text-slate-200 font-medium italic grid grid-cols-[max-content_1fr]">
		<span class="w-2h">{"> "}</span>
		<div class="[&>p]:mt-0">{props.children}</div>
	</blockquote>
);

const Pre: ParentComponent<{ lang: string; lines?: string }> = (props) => {
	const [copied, setCopied] = createSignal(false);
	let ref!: HTMLPreElement;

	const onCopy = () => {
		setCopied(true);
		navigator.clipboard.writeText(ref.innerText);
		setTimeout(() => {
			setCopied(false);
		}, 1500);
	};

	return (
		<div class="my-1v">
			<div class="bg-black text-white dark:bg-white dark:text-white flex justify-end px-1h text-sm leading-1">
				<button type="button" onClick={onCopy}>
					{copied() ? "Copied!" : "Copy code"}
				</button>
			</div>
			<pre ref={ref} class={`language-${props.lang}`} data-line={props.lines}>
				{props.children}
			</pre>
		</div>
	);
};

const headingLink = (children: JSXElement) =>
	children?.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "");

const HeadlineLink: Component<{ link: string; class: string }> = (props) => {
	return (
		<a href={props.link} class="relative top-[1px]">
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
		class="text-2xl leading-2 font-bold mt-2v mb-1v flex items-center gap-1h"
	>
		{props.children}
		<HeadlineLink class="w-5 h-5" link={`#${headingLink(props.children)}`} />
	</h2>
);

const H3: ParentComponent = (props) => (
	<h3
		id={headingLink(props.children)}
		class="text-xl leading-2 font-bold mt-2v mb-1v flex items-center gap-1h"
	>
		{props.children}
		<HeadlineLink class="w-4 h-4" link={`#${headingLink(props.children)}`} />
	</h3>
);

const H4: ParentComponent = (props) => (
	<h4
		id={headingLink(props.children)}
		class="text-lg leading-1 font-bold mt-2v mb-1v flex items-center gap-1h"
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
	class?: string;
}> = (props) => {
	return (
		<div>
			<img
				src={props.src}
				alt={props.alt}
				class="w-full"
				classList={{ [props.class || ""]: !!props.class }}
			/>
			{props.attr}
		</div>
	);
};

export const Aside: ParentComponent = (props) => (
	<aside class="border-l-2 border-black dark:border-white pl-1h mt-1v">
		<div class="uppercase text-sm leading-1 font-medium select-none">Aside</div>
		<div class="[&_*:first-child]:mt-0">{props.children}</div>
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
