import type { BacklogSpace } from "@/types/space";

/**
 * WXT_INITIAL_SPACES環境変数から初期スペースを取得・解析する
 * @returns 解析されたBacklogSpaceの配列
 */
export const getInitialSpaces = (): BacklogSpace[] => {
	const envValue = import.meta.env.WXT_INITIAL_SPACES;
	if (typeof envValue !== "string") return [];

	return envValue
		.split(",")
		.map((entry) => entry.trim())
		.filter((entry) => entry.includes(":"))
		.map((entry) => {
			const [spaceDomain, apiKey] = entry.split(":");
			return { apiKey, spaceDomain };
		});
};
