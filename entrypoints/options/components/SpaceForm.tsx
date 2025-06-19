import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithValibot } from "@conform-to/valibot";
import * as v from "valibot";

const schema = v.object({
	apiKey: v.optional(v.string()),
	spaceDomain: v.string(),
});

type Props = {
	onSubmit: (data: v.InferOutput<typeof schema>) => Promise<void>;
};

export const SpaceForm: React.FC<Props> = ({ onSubmit }) => {
	const [form, fields] = useForm({
		onSubmit: async (event, { submission }) => {
			event.preventDefault();

			if (submission?.status === "success") {
				await onSubmit(submission.value);
			}
		},
		onValidate: ({ formData }) => parseWithValibot(formData, { schema }),
	});

	return (
		<form {...getFormProps(form)}>
			<input {...getInputProps(fields.spaceDomain, { type: "url" })} />
			<input {...getInputProps(fields.apiKey, { type: "text" })} />
			<button type="submit">Save</button>
		</form>
	);
};
