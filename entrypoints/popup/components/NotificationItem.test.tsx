import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mockNotifications } from "../../../src/test/helpers";
import NotificationItem from "./NotificationItem";

// getStatusTextをモック
vi.mock("../../../utils/backlog", () => ({
	getStatusText: vi.fn((reason: number) => {
		const statusMap: Record<number, string> = {
			1: "課題を担当",
			2: "課題にコメント",
		};
		return statusMap[reason] || "不明な通知";
	}),
}));

describe("NotificationItem", () => {
	it("未読の通知が適切に表示される", () => {
		const unreadNotification = mockNotifications[0]; // alreadyRead: false

		render(<NotificationItem notification={unreadNotification} />);

		// 未読インジケーターが表示される
		expect(screen.getByText("課題を担当")).toBeInTheDocument();

		// 課題サマリーが表示される
		expect(screen.getByText("テスト課題")).toBeInTheDocument();

		// プロジェクト情報が表示される
		expect(
			screen.getByText(/プロジェクト: テストプロジェクト \(TEST\)/),
		).toBeInTheDocument();

		// 課題キーが表示される
		expect(screen.getByText("課題: TEST-1")).toBeInTheDocument();

		// 送信者が表示される
		expect(screen.getByText("送信者: テストユーザー")).toBeInTheDocument();

		// 日時が表示される
		expect(screen.getByText(/日時:/)).toBeInTheDocument();
	});

	it("既読の通知が適切に表示される", () => {
		const readNotification = mockNotifications[1]; // alreadyRead: true

		render(<NotificationItem notification={readNotification} />);

		// ステータステキストが表示される
		expect(screen.getByText("課題にコメント")).toBeInTheDocument();

		// 課題サマリーが表示される
		expect(screen.getByText("テスト課題2")).toBeInTheDocument();

		// 既読の場合は背景色が異なることを確認
		const container = screen.getByText("テスト課題2").closest(".rounded");
		expect(container).toHaveClass("bg-white");
		expect(container).toHaveClass("border-gray-200");
	});

	it("未読の通知の場合、適切なスタイルが適用される", () => {
		const unreadNotification = mockNotifications[0];

		render(<NotificationItem notification={unreadNotification} />);

		const container = screen.getByText("テスト課題").closest(".rounded");
		expect(container).toHaveClass("bg-blue-50");
		expect(container).toHaveClass("border-blue-200");
	});

	it("プロジェクト情報がない場合でもエラーにならない", () => {
		const notificationWithoutProject = {
			...mockNotifications[0],
			project: null,
		};

		expect(() => {
			render(<NotificationItem notification={notificationWithoutProject} />);
		}).not.toThrow();
	});

	it("課題情報がない場合は「詳細なし」が表示される", () => {
		const notificationWithoutIssue = {
			...mockNotifications[0],
			issue: null,
			pullRequest: null,
		};

		render(<NotificationItem notification={notificationWithoutIssue} />);

		expect(screen.getByText("詳細なし")).toBeInTheDocument();
	});

	it("プルリクエスト情報がある場合はそのサマリーが表示される", () => {
		const notificationWithPR = {
			...mockNotifications[0],
			issue: null,
			pullRequest: {
				id: 1,
				summary: "テストプルリクエスト",
			},
		};

		render(<NotificationItem notification={notificationWithPR} />);

		expect(screen.getByText("テストプルリクエスト")).toBeInTheDocument();
	});
});
