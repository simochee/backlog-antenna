import { storage } from "#imports";

type LastVisitedPage = {
	spaceDomain: string;
	path: string;
	updatedAt: number;
};

const lastVisitedPage = storage.defineItem<LastVisitedPage | null>(
	"local:lastVisitedPage",
	{
		fallback: null,
	},
);

/**
 * 最後に訪問したページ情報を取得する
 * @returns 最後に訪問したページ情報、または null
 */
export const getLastVisitedPage = () => lastVisitedPage.getValue();

/**
 * 最後に訪問したページ情報を保存する
 * @param spaceDomain スペースドメイン
 * @param path ページパス（/notifications, /projects, /issues）
 */
export const saveLastVisitedPage = async (
	spaceDomain: string,
	path: string,
) => {
	await lastVisitedPage.setValue({
		path,
		spaceDomain,
		updatedAt: Date.now(),
	});
};

/**
 * 最後に訪問したページ情報をクリアする
 */
export const clearLastVisitedPage = async () => {
	await lastVisitedPage.setValue(null);
};
