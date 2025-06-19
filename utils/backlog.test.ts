import { describe, expect, it } from "vitest";
import { getStatusText } from "./backlog";

describe("getStatusText", () => {
	it("課題関連のステータスが正しく返される", () => {
		expect(getStatusText(1)).toBe("課題を担当");
		expect(getStatusText(2)).toBe("課題にコメント");
		expect(getStatusText(3)).toBe("課題を追加");
		expect(getStatusText(4)).toBe("課題を更新");
		expect(getStatusText(5)).toBe("ファイルを追加");
		expect(getStatusText(6)).toBe("メンバーを追加");
		expect(getStatusText(9)).toBe("その他");
	});

	it("プルリクエスト関連のステータスが正しく返される", () => {
		expect(getStatusText(10)).toBe("プルリクエストを担当");
		expect(getStatusText(11)).toBe("プルリクエストにコメント");
		expect(getStatusText(12)).toBe("プルリクエストを追加");
		expect(getStatusText(13)).toBe("プルリクエストを更新");
	});

	it("未定義のステータスコードは不明な通知として返される", () => {
		expect(getStatusText(0)).toBe("不明な通知");
		expect(getStatusText(7)).toBe("不明な通知");
		expect(getStatusText(8)).toBe("不明な通知");
		expect(getStatusText(14)).toBe("不明な通知");
		expect(getStatusText(999)).toBe("不明な通知");
		expect(getStatusText(-1)).toBe("不明な通知");
	});
});
