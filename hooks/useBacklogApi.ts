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
			error: new Error(`スペース ${spaceDomain} が見つかりません`),
			isLoading: false,
			space: null,
		};
	}

	if (!space) {
		return {
			api: null,
			error: null,
			isLoading,
			space: null,
		};
	}

	const api = new Backlog({
		apiKey: space.apiKey,
		host: space.spaceDomain,
	});

	return {
		api,
		error: null,
		isLoading: false,
		space,
	};
};
