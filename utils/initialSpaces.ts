import type { BacklogSpace } from "@/types/space";

/**
 * 初期スペース環境変数を解析してBacklogSpaceの配列に変換する
 * @param envValue 環境変数の値（<spaceDomain>:<apiKey>,<spaceDomain>:<apiKey>,...形式）
 * @returns 解析されたBacklogSpaceの配列
 */
export const parseInitialSpaces = (envValue: string): BacklogSpace[] => {
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

/**
 * WXT_INITIAL_SPACES環境変数から初期スペースを取得する
 * @returns 初期スペースの配列
 */
export const getInitialSpaces = (): BacklogSpace[] => {
	const envValue = import.meta.env.WXT_INITIAL_SPACES;
	return parseInitialSpaces(envValue || "");
};
