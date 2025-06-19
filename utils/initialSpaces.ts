import type { BacklogSpace } from "@/types/space";

/**
 * WXT_INITIAL_SPACES環境変数から初期スペースを取得・解析する
 * @returns 解析されたBacklogSpaceの配列
 */
export const getInitialSpaces = (): BacklogSpace[] => {
	const envValue = import.meta.env.WXT_INITIAL_SPACES;
	if (!envValue) {
		return [];
	}

	const spaceEntries = envValue.split(",");
	const spaces: BacklogSpace[] = [];

	for (const entry of spaceEntries) {
		const trimmedEntry = entry.trim();
		if (!trimmedEntry) {
			continue;
		}

		const colonIndex = trimmedEntry.indexOf(":");
		if (colonIndex === -1) {
			console.warn(`Invalid initial space format: ${trimmedEntry}`);
			continue;
		}

		const spaceDomain = trimmedEntry.slice(0, colonIndex).trim();
		const apiKey = trimmedEntry.slice(colonIndex + 1).trim();

		if (!spaceDomain || !apiKey) {
			console.warn(`Invalid initial space format: ${trimmedEntry}`);
			continue;
		}

		spaces.push({
			apiKey,
			spaceDomain,
		});
	}

	return spaces;
};
