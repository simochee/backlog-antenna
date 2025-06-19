import { storage } from "#imports";

const routerState = storage.defineItem<{ path: string | null }>(
	"local:router",
	{
		fallback: { path: null },
	},
);

/**
 * 最後に訪問したページのパス情報を取得する
 * @returns 最後に訪問したページのパス情報、または null
 */
export const getRouterState = async () => {
	const state = await routerState.getValue();
	return state.path;
};

/**
 * 現在のページパス情報を保存する
 * @param path 完全なページパス
 */
export const saveRouterState = async (path: string) => {
	await routerState.setValue({ path });
};
