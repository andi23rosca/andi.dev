import { type Component, For, Show } from "solid-js";

type Node = { l: string; c: TreeNode[] };
type TreeNode = string | Node;

const Subtree: Component<{ tree: TreeNode }> = (props) => {
	return (
		<Show
			when={typeof props.tree !== "string"}
			fallback={<li>{props.tree as string}</li>}
		>
			<li>
				<span>{(props.tree as Node).l}</span>
				<ul class="incremental">
					<For each={(props.tree as Node).c}>{(c) => <Subtree tree={c} />}</For>
				</ul>
			</li>
		</Show>
	);
};
export const Tree: Component<{ tree: TreeNode }> = (props) => {
	return (
		<ul class="tree [&>li>span]:font-bold">
			<Subtree tree={props.tree} />
		</ul>
	);
};
