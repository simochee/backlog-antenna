import { storage } from "#imports";
import type {
	BacklogSpace,
	BacklogSpaceWithAuthorization,
} from "~/types/space";

const spaces = storage.defineItem<BacklogSpaceWithAuthorization[]>(
	"local:spaces",
	{ fallback: [] },
);

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
export const appendSpace = async (space: BacklogSpaceWithAuthorization) => {
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
export const setSpace = async (
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
