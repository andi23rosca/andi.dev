import type { ParentComponent } from "solid-js";

export const P: ParentComponent = (props) => (
	<p class="mb-2">{props.children}</p>
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
	<blockquote class="px-4 py-2 text-zinc-700 italic">
		{props.children}
	</blockquote>
);
