import type { ParentComponent } from "solid-js";

export const P: ParentComponent = (props) => (
	<p class="mb-4">{props.children}</p>
);

export const Ol: ParentComponent = (props) => (
	<ol class="mb-4">{props.children}</ol>
);
export const Ul: ParentComponent = (props) => (
	<ul class="mb-4">{props.children}</ul>
);

export const Li: ParentComponent = (props) => (
	<li class="list-disc ml-6 mb-2">{props.children}</li>
);

export const Blockquote: ParentComponent = (props) => (
	<blockquote class="px-4 py-2 text-zinc-700 dark:text-zinc-300 italic">
		{props.children}
	</blockquote>
);

export const Pre: ParentComponent<{ lang: string }> = (props) => {
	return (
		<div class="mt-4 mb-8">
			<pre class={`language-${props.lang}`}>{props.children}</pre>
		</div>
	);
};

export const H2: ParentComponent = (props) => (
	<h2 class="text-2xl font-bold mt-6 mb-3">{props.children}</h2>
);
export const H3: ParentComponent = (props) => (
	<h2 class="text-xl font-bold mt-6 mb-3">{props.children}</h2>
);
export const H4: ParentComponent = (props) => (
	<h2 class="text-lg font-bold mt-6 mb-3">{props.children}</h2>
);
