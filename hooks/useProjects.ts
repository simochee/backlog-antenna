import { useQuery } from "@tanstack/react-query";
import { Backlog } from "backlog-js";
import type { BacklogProject } from "@/types/project";

/**
 * 指定されたスペースのプロジェクト一覧を取得するためのReact Query hook
 * @param spaceDomain 取得対象のスペースドメイン
 * @param apiKey API認証キー
 * @returns プロジェクト一覧のクエリ結果
 */
export const useProjects = (spaceDomain: string, apiKey: string) => {
	return useQuery({
		enabled: !!spaceDomain && !!apiKey,
		gcTime: 10 * 60 * 1000,
		queryFn: async (): Promise<BacklogProject[]> => {
			const backlog = new Backlog({
				apiKey,
				host: spaceDomain,
			});

			const projects = await backlog.getProjects();
			return projects;
		},
		queryKey: ["projects", spaceDomain] as const, // 5分間キャッシュ
		staleTime: 5 * 60 * 1000, // 10分間ガベージコレクション猶予
	});
};
