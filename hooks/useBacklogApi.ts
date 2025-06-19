import { useParams } from "@tanstack/react-router";
import { Backlog } from "backlog-js";
import { useSpaces } from "./useSpaces";

/**
 * 指定されたスペースのBacklog APIクライアントを取得する
 * パラメータのspaceDomainに基づいてスペース情報を検索し、認証情報付きのAPIクライアントを返す
 * @returns APIクライアント、スペース情報、ローディング状態、エラー情報
 */
export const useBacklogApi = () => {
	const { spaceDomain } = useParams({ strict: false });
	const { items: spaces, isLoading, error } = useSpaces();

	const space = spaces.find((s) => s.spaceDomain === spaceDomain);

	if (!space && !isLoading) {
		return {
			api: null,
			space: null,
			isLoading: false,
			error: new Error(`スペース ${spaceDomain} が見つかりません`),
		};
	}

	if (!space) {
		return {
			api: null,
			space: null,
			isLoading,
			error: null,
		};
	}

	const api = new Backlog({
		host: `https://${space.spaceDomain}`,
		apiKey: space.apiKey,
	});

	return {
		api,
		space,
		isLoading: false,
		error: null,
	};
};