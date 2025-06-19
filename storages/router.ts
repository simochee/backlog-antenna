import { storage } from "#imports";

type RouterState = {
	path: string;
	updatedAt: number;
};

const routerState = storage.defineItem<RouterState | null>("local:router", {
	fallback: null,
});

/**
 * 最後に訪問したページのパス情報を取得する
 * @returns 最後に訪問したページのパス情報、または null
 */
export const getRouterState = () => routerState.getValue();

/**
 * 現在のページパス情報を保存する
 * @param path 完全なページパス（/{spaceDomain}/notifications など）
 */
export const saveRouterState = async (path: string) => {
	await routerState.setValue({
		path,
		updatedAt: Date.now(),
	});
};

/**
 * ルーター状態をクリアする
 */
export const clearRouterState = async () => {
	await routerState.setValue(null);
};
