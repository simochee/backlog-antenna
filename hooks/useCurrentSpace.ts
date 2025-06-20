import { useParams } from "@tanstack/react-router";
import { useSpaces } from "./useSpaces";

export const useCurrentSpace = () => {
	const { spaceDomain } = useParams({ strict: false });
	const spaces = useSpaces();

	const space = spaces.items.find((space) => space.spaceDomain === spaceDomain);

	if (!space) {
		throw new Error(`スペース ${spaceDomain} が見つかりません`);
	}

	return space;
};
