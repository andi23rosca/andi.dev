import type { Component, ParentComponent } from "solid-js";

const Posts: ParentComponent = (props) => {
	return (
		<div>
			Layout
			<div>{props.children}</div>
		</div>
	);
};

export default Posts;
