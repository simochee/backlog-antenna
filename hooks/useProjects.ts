import { useQuery } from "@tanstack/react-query";
import { Backlog } from "backlog-js";
import {
	getProjectCache,
	isCacheValid,
	setProjectCache,
} from "@/storages/projects";
import type { BacklogProject } from "@/types/project";

/**
 * 指定されたスペースのプロジェクト一覧を取得するためのReact Query hook
 * ローカルストレージを使用してキャッシュを永続化する
 * @param spaceDomain 取得対象のスペースドメイン
 * @param apiKey API認証キー
 * @returns プロジェクト一覧のクエリ結果
 */
export const useProjects = (spaceDomain: string, apiKey: string) => {
	return useQuery({
		enabled: !!spaceDomain && !!apiKey,
		gcTime: 0,
		initialData: async () => {
			// 初期データとしてローカルストレージのキャッシュを使用
			const cache = await getProjectCache(spaceDomain);
			return isCacheValid(cache) ? cache?.data : undefined;
		},
		queryFn: async (): Promise<BacklogProject[]> => {
			// まずローカルストレージのキャッシュを確認
			const cache = await getProjectCache(spaceDomain);

			// キャッシュが有効な場合はそれを返す
			if (isCacheValid(cache)) {
				return cache?.data;
			}

			// キャッシュが無効または存在しない場合はAPIから取得
			const backlog = new Backlog({
				apiKey,
				host: spaceDomain,
			});

			const projects = await backlog.getProjects();

			// 取得したデータをローカルストレージにキャッシュ
			await setProjectCache(spaceDomain, projects);

			return projects;
		}, // 5分間キャッシュ
		queryKey: ["projects", spaceDomain] as const, // メモリキャッシュは即座に削除（ローカルストレージを使用するため）
		staleTime: 5 * 60 * 1000,
	});
};
