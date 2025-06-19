import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { appendSpace, getSpaces } from "@/storages/spaces";
import { SpaceForm } from "./SpaceForm";
import { SpaceItem } from "./SpaceItem";

export const SpaceSetting: React.FC = () => {
	const queryClient = useQueryClient();
	const query = useQuery({
		queryFn: getSpaces,
		queryKey: ["spaces"],
	});

	const mutation = useMutation({
		mutationFn: (async ({ spaceDomain, apiKey }) => {
			if (typeof apiKey === "string") {
				await appendSpace({ apiKey, spaceDomain });
			}
		}) satisfies ComponentProps<typeof SpaceForm>["onSubmit"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["spaces"] });
		},
	});

	return (
		<div>
			<SpaceForm onSubmit={async (data) => mutation.mutate(data)} />
			<ul>
				{query.data?.map((space) => (
					<li key={space.spaceDomain}>
						<SpaceItem onDelete={() => {}} onUpdate={() => {}} space={space} />
					</li>
				))}
			</ul>
		</div>
	);
};
