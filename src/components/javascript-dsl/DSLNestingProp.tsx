import { createSignal, For } from "solid-js";
import { Button } from "../Button";
import { Blockquote } from "../Markdown";

const steps = [
	{
		name: "Initial",
		description:
			"The loop hasn't started yet. result is assigned as the full object.",
		draw: `
         ┌───────────────────┐
      ┌──► Object            │  let result = obj;
      │  │┌─────────────────┐│
      │  ││ metadata        ││
result┘  ││┌───────────────┐││
         │││ coolnessScore │││
         ││└───────────────┘││
         │└─────────────────┘│
         └───────────────────┘
`,
	},
	{
		name: "First loop",
		description:
			'Property is "metadata", result gets assigned as result["metadata"].',
		draw: `
         ┌───────────────────┐
         │ Object            │  
         │┌─────────────────┐│  for (const property in nested) {
      ┌──┼► metadata        ││    // property = "metadata"
result┘  ││┌───────────────┐││    result = result[property];
         │││ coolnessScore │││  }
         ││└───────────────┘││
         │└─────────────────┘│
         └───────────────────┘
`,
	},
	{
		name: "Second loop",
		description:
			'Property is "coolnessScore", result gets assigned as result["coolnessScore"].',
		draw: `
         ┌───────────────────┐
         │ Object            │  
         │┌─────────────────┐│  for (const property in nested) {
         ││ metadata        ││    // property = "coolnessScore"
result┐  ││┌───────────────┐││    result = result[property];
      └──┼┼► coolnessScore │││  }
         ││└───────────────┘││
         │└─────────────────┘│
         └───────────────────┘
`,
	},
	{
		name: "Loop ends",
		description:
			"The loop has ended and result is 100. The query function will return result.",
		draw: `
         ┌───────────────────┐
         │ Object            │  
         │┌─────────────────┐│  
         ││ metadata        ││    
result┐  ││┌───────────────┐││  
      └──┼┼► coolnessScore │││  
         ││└───────────────┘││  return result;
         │└─────────────────┘│
         └───────────────────┘
`,
	},
];
export const DSLNestingProps = () => {
	const [step, setStep] = createSignal(0);
	const curr = () => steps[step()];

	return (
		<div class="mt-1v [&_blockquote]:mt-1v [&_blockquote]:mb-0">
			<div class="font-bold">
				{step() + 1}/{steps.length} {curr().name}
			</div>
			<Blockquote>{curr().description}</Blockquote>

			<figure class="whitespace-pre overflow-x-auto overflow-y-hidden">
				{curr().draw}
			</figure>

			<div class="flex gap-1h mt-1v">
				<Button
					onClick={() => {
						setStep((s) => Math.max(0, s - 1));
					}}
				>
					{"<|"}
				</Button>
				<Button
					onClick={() => {
						setStep((s) => Math.min(steps.length - 1, s + 1));
					}}
				>
					{"|>"}
				</Button>
			</div>
		</div>
	);
};
