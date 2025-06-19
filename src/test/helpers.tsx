import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

/**
 * テスト用のQueryClientを作成
 */
export const createTestQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			mutations: {
				retry: false,
			},
			queries: {
				gcTime: 0,
				retry: false,
			},
		},
	});
};

/**
 * QueryClientProviderでラップするテストレンダラー
 */
export const renderWithQueryClient = (
	ui: ReactElement,
	options: RenderOptions & { queryClient?: QueryClient } = {},
) => {
	const { queryClient = createTestQueryClient(), ...renderOptions } = options;

	const Wrapper = ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	return render(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * TanStack Routerでラップするテストレンダラー
 */
export const renderWithRouter = (
	ui: ReactElement,
	options: { initialEntries?: string[]; queryClient?: QueryClient } = {},
) => {
	const { initialEntries = ["/"], queryClient = createTestQueryClient() } =
		options;

	// テスト用ルートを作成
	const rootRoute = createRootRoute({
		component: () => ui,
	});

	const indexRoute = createRoute({
		component: () => ui,
		getParentRoute: () => rootRoute,
		path: "/",
	});

	const router = createRouter({
		history: createMemoryHistory({ initialEntries }),
		routeTree: rootRoute.addChildren([indexRoute]),
	});

	const Wrapper = ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);

	return render(<div />, { wrapper: Wrapper });
};

/**
 * テスト用のモックスペースデータ
 */
export const mockSpaces = [
	{
		apiKey: "test-api-key-1",
		displayName: "テストスペース1",
		id: "1",
		includeInBadgeCount: true,
		spaceDomain: "test.backlog.com",
	},
	{
		apiKey: "test-api-key-2",
		displayName: "テストスペース2",
		id: "2",
		includeInBadgeCount: false,
		spaceDomain: "example.backlog.jp",
	},
];

/**
 * テスト用のモック通知データ
 */
export const mockNotifications = [
	{
		alreadyRead: false,
		content: "テスト課題が作成されました",
		created: "2024-01-01T09:00:00Z",
		id: 1,
		issue: {
			id: 1,
			issueKey: "TEST-1",
			summary: "テスト課題",
		},
		project: {
			id: 1,
			name: "テストプロジェクト",
			projectKey: "TEST",
		},
		reason: 1,
		sender: {
			id: 1,
			name: "テストユーザー",
		},
	},
	{
		alreadyRead: true,
		content: "コメントが追加されました",
		created: "2024-01-01T10:00:00Z",
		id: 2,
		issue: {
			id: 2,
			issueKey: "TEST-2",
			summary: "テスト課題2",
		},
		project: {
			id: 1,
			name: "テストプロジェクト",
			projectKey: "TEST",
		},
		reason: 2,
		sender: {
			id: 2,
			name: "テストユーザー2",
		},
	},
];
