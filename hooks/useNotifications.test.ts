import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockNotifications } from "../src/test/helpers";
import { useNotifications } from "./useNotifications";

// WXT storageのモック
vi.mock("#imports", () => ({
	storage: {
		defineItem: vi.fn(() => ({
			getValue: vi.fn(),
			removeValue: vi.fn(),
			setValue: vi.fn(),
			watch: vi.fn(),
		})),
	},
}));

// useBacklogApiをモック
vi.mock("./useBacklogApi", () => ({
	useBacklogApi: vi.fn(),
}));

import { useBacklogApi } from "./useBacklogApi";

const mockUseBacklogApi = vi.mocked(useBacklogApi);

// テスト用のQueryClientProviderラッパー
const createWrapper = (queryClient: QueryClient) => {
	return ({ children }: { children: ReactNode }) =>
		createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useNotifications", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		vi.clearAllMocks();
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					gcTime: 0,
					retry: false,
				},
			},
		});
	});

	it("APIクライアントが利用可能な場合、通知一覧を取得する", async () => {
		const mockApi = {
			getNotifications: vi.fn().mockResolvedValue(mockNotifications),
		};

		mockUseBacklogApi.mockReturnValue({
			api: mockApi,
			error: null,
			isLoading: false,
			space: {
				apiKey: "test-key",
				displayName: "Test Space",
				id: "1",
				includeInBadgeCount: true,
				spaceDomain: "test.backlog.com",
			},
		});

		const { result } = renderHook(() => useNotifications(), {
			wrapper: createWrapper(queryClient),
		});

		// 初期状態の確認
		expect(result.current.isLoading).toBe(true);
		expect(result.current.items).toEqual([]);

		// API呼び出しの完了を待つ
		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		// 結果の確認
		expect(result.current.items).toEqual(mockNotifications);
		expect(result.current.error).toBeNull();
		expect(mockApi.getNotifications).toHaveBeenCalledWith({
			count: 5,
		});
	});

	it("APIクライアントが利用できない場合、クエリは実行されない", () => {
		mockUseBacklogApi.mockReturnValue({
			api: null,
			error: null,
			isLoading: false,
			space: null,
		});

		const { result } = renderHook(() => useNotifications(), {
			wrapper: createWrapper(queryClient),
		});

		expect(result.current.items).toEqual([]);
		expect(result.current.isLoading).toBe(false);
	});

	it("スペース情報がロード中の場合、適切な状態を返す", () => {
		mockUseBacklogApi.mockReturnValue({
			api: null,
			error: null,
			isLoading: true,
			space: null,
		});

		const { result } = renderHook(() => useNotifications(), {
			wrapper: createWrapper(queryClient),
		});

		expect(result.current.items).toEqual([]);
		expect(result.current.isLoading).toBe(false); // クエリ自体は無効化されているため
	});

	it("APIエラーが発生した場合、エラーが返される", () => {
		const apiError = new Error("API Key が無効です");

		mockUseBacklogApi.mockReturnValue({
			api: null,
			error: apiError,
			isLoading: false,
			space: null,
		});

		const { result } = renderHook(() => useNotifications(), {
			wrapper: createWrapper(queryClient),
		});

		expect(result.current.error).toBe(apiError);
	});

	it("minIdベースのページネーションが正しく動作する", async () => {
		// 5件のフルセットを返して次ページありの状態にする
		const firstPageData = Array.from({ length: 5 }, (_, i) => ({
			...mockNotifications[0],
			id: 10 - i,
		}));
		const secondPageData = Array.from({ length: 5 }, (_, i) => ({
			...mockNotifications[0],
			id: 5 - i,
		}));

		const mockApi = {
			getNotifications: vi
				.fn()
				.mockResolvedValueOnce(firstPageData)
				.mockResolvedValueOnce(secondPageData),
		};

		mockUseBacklogApi.mockReturnValue({
			api: mockApi,
			error: null,
			isLoading: false,
			space: {
				apiKey: "test-key",
				displayName: "Test Space",
				id: "1",
				includeInBadgeCount: true,
				spaceDomain: "test.backlog.com",
			},
		});

		const { result } = renderHook(() => useNotifications(), {
			wrapper: createWrapper(queryClient),
		});

		// 初回読み込み完了を待つ
		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.hasNextPage).toBe(true);
		expect(result.current.items).toHaveLength(5);

		// 次ページを読み込み
		result.current.fetchNextPage();

		await waitFor(() => {
			expect(result.current.isFetchingNextPage).toBe(false);
		});

		// minIdパラメーターが正しく設定されているか確認
		expect(mockApi.getNotifications).toHaveBeenNthCalledWith(1, {
			count: 5,
		});
		expect(mockApi.getNotifications).toHaveBeenNthCalledWith(2, {
			count: 5,
			minId: 5, // 前ページの最後のアイテムのID - 1
		});

		// 全データが結合されていることを確認
		expect(result.current.items).toHaveLength(10);
	});

	it("返される通知数が5件未満の場合、hasNextPageがfalseになる", async () => {
		const shortNotificationList = [mockNotifications[0]]; // 1件のみ

		const mockApi = {
			getNotifications: vi.fn().mockResolvedValue(shortNotificationList),
		};

		mockUseBacklogApi.mockReturnValue({
			api: mockApi,
			error: null,
			isLoading: false,
			space: {
				apiKey: "test-key",
				displayName: "Test Space",
				id: "1",
				includeInBadgeCount: true,
				spaceDomain: "test.backlog.com",
			},
		});

		const { result } = renderHook(() => useNotifications(), {
			wrapper: createWrapper(queryClient),
		});

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.hasNextPage).toBe(false);
		expect(result.current.items).toEqual(shortNotificationList);
	});
});
