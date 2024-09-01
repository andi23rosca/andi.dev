import { For } from "solid-js";
import { series as allSeries } from "~/data/series";

const Series = () => {
	return (
		<div>
			<h1 class="text-xl font-bold mt-2v mb-1v">All series</h1>
			<ol class="flex flex-col gap-1v list-square ml-2h">
				<For each={Object.values(allSeries)}>
					{(series) => (
						<li class="">
							<a
								class="underline underline-offset-2"
								href={`/series/${series.id}`}
							>
								{series.id}
							</a>
							<span>
								{" "}
								- {series.posts.length} Post
								{series.posts.length === 1 ? "" : "s"}
							</span>
						</li>
					)}
				</For>
			</ol>
		</div>
	);
};

export default Series;
