import { storage } from "#imports";
import type { BacklogProject } from "@/types/project";

/**
 * プロジェクトデータのキャッシュ情報
 */
export type ProjectCache = {
	data: BacklogProject[];
	updatedAt: number;
	spaceDomain: string;
};

/**
 * 全スペースのプロジェクトキャッシュ
 */
export type ProjectCaches = Record<string, ProjectCache>;

const projects = storage.defineItem<ProjectCaches>("local:projects", {
	fallback: {},
});

/**
 * 保存されているすべてのプロジェクトキャッシュを取得する
 * @returns すべてのスペースのプロジェクトキャッシュ情報
 */
export const getProjectCaches = () => projects.getValue();

/**
 * 指定されたスペースのプロジェクトキャッシュを取得する
 * @param spaceDomain 取得対象のスペースドメイン
 * @returns 指定されたスペースのプロジェクトキャッシュ、存在しない場合はundefined
 */
export const getProjectCache = async (
	spaceDomain: string,
): Promise<ProjectCache | undefined> => {
	const caches = await projects.getValue();
	return caches[spaceDomain];
};

/**
 * 指定されたスペースのプロジェクトデータをキャッシュに保存する
 * @param spaceDomain 保存対象のスペースドメイン
 * @param projectData プロジェクトデータ
 */
export const setProjectCache = async (
	spaceDomain: string,
	projectData: BacklogProject[],
) => {
	const currentCaches = await projects.getValue();
	currentCaches[spaceDomain] = {
		data: projectData,
		spaceDomain,
		updatedAt: Date.now(),
	};
	await projects.setValue(currentCaches);
};

/**
 * 指定されたスペースのプロジェクトキャッシュを削除する
 * @param spaceDomain 削除対象のスペースドメイン
 */
export const deleteProjectCache = async (spaceDomain: string) => {
	const currentCaches = await projects.getValue();
	delete currentCaches[spaceDomain];
	await projects.setValue(currentCaches);
};

/**
 * キャッシュが有効かどうかを判定する
 * @param cache キャッシュデータ
 * @param maxAge 最大有効期間（ミリ秒）、デフォルトは5分
 * @returns キャッシュが有効な場合true
 */
export const isCacheValid = (
	cache: ProjectCache | undefined,
	maxAge: number = 5 * 60 * 1000,
): boolean => {
	if (!cache) return false;
	return Date.now() - cache.updatedAt < maxAge;
};

/**
 * プロジェクトキャッシュの変更を監視する
 * @param callback キャッシュが変更された際に実行されるコールバック関数
 * @returns 監視を停止するための関数
 */
export const watchProjectCaches = (
	callback: (newCaches: ProjectCaches, oldCaches: ProjectCaches) => void,
) => {
	return projects.watch(callback);
};
