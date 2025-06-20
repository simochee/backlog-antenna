import { Backlog } from "backlog-js";
import { useCurrentSpace } from "./useCurrentSpace";

/**
 * 指定されたスペースのBacklog APIクライアントを取得する
 * パラメータのspaceDomainに基づいてスペース情報を検索し、認証情報付きのAPIクライアントを返す
 * @returns APIクライアント、スペース情報、ローディング状態、エラー情報
 */
export const useBacklogApi = () => {
	const { spaceDomain, apiKey } = useCurrentSpace();

	const api = new Backlog({
		apiKey: apiKey,
		host: spaceDomain,
	});

	return api;
};
