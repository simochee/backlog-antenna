import { storage } from "#imports";
import type { BacklogSpace } from "@/types/space";
import { getInitialSpaces } from "@/utils/initialSpaces";

const spaces = storage.defineItem<BacklogSpace[]>("local:spaces", {
	fallback: getInitialSpaces(),
});

/**
 * 保存されているすべてのBacklogスペースを取得する
 * @returns 保存されているBacklogスペースの配列
 */
export const getSpaces = () => spaces.getValue();

/**
 * 新しいBacklogスペースを追加する
 * @param space 追加するBacklogスペース情報
 * @throws 同じスペースドメインが既に存在する場合
 */
export const appendSpace = async (space: BacklogSpace) => {
	const currentSpaces = await spaces.getValue();

	if (currentSpaces.some((s) => s.spaceDomain === space.spaceDomain)) {
		throw new Error(`Space with key ${space.spaceDomain} already exists.`);
	}

	await spaces.setValue([...currentSpaces, space]);
};

/**
 * 既存のBacklogスペース情報を更新する
 * @param spaceDomain 更新対象のスペースドメイン
 * @param space 更新するBacklogスペース情報
 * @throws 指定されたスペースドメインが存在しない場合
 */
export const updateSpace = async (
	spaceDomain: string,
	space: Omit<BacklogSpace, "spaceDomain">,
) => {
	const currentSpaces = await spaces.getValue();
	const index = currentSpaces.findIndex((s) => s.spaceDomain === spaceDomain);

	if (index === -1) {
		throw new Error(`Space with key ${spaceDomain} does not exist.`);
	}

	currentSpaces[index] = { ...currentSpaces[index], ...space };
	await spaces.setValue(currentSpaces);
};

/**
 * 指定されたスペースドメインのBacklogスペースを削除する
 * @param spaceDomain 削除対象のスペースドメイン
 * @throws 指定されたスペースドメインが存在しない場合
 */
export const deleteSpace = async (spaceDomain: string) => {
	const currentSpaces = await spaces.getValue();
	const index = currentSpaces.findIndex((s) => s.spaceDomain === spaceDomain);

	if (index === -1) {
		throw new Error(`Space with key ${spaceDomain} does not exist.`);
	}

	const updatedSpaces = currentSpaces.filter((_, i) => i !== index);
	await spaces.setValue(updatedSpaces);
};

/**
 * Backlogスペース配列の変更を監視する
 * @param callback スペース配列が変更された際に実行されるコールバック関数
 * @returns 監視を停止するための関数
 */
export const watchSpaces = (
	callback: (newSpaces: BacklogSpace[], oldSpaces: BacklogSpace[]) => void,
) => {
	return spaces.watch(callback);
};
