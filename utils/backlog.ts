/**
 * 通知ステータスに対応する表示テキストを返す
 * @param reason Backlog APIから取得した通知のステータス番号
 * @returns 日本語のステータステキスト
 */
export function getStatusText(reason: number): string {
	switch (reason) {
		case 1:
			return "課題を担当";
		case 2:
			return "課題にコメント";
		case 3:
			return "課題を追加";
		case 4:
			return "課題を更新";
		case 5:
			return "ファイルを追加";
		case 6:
			return "メンバーを追加";
		case 9:
			return "その他";
		case 10:
			return "プルリクエストを担当";
		case 11:
			return "プルリクエストにコメント";
		case 12:
			return "プルリクエストを追加";
		case 13:
			return "プルリクエストを更新";
		default:
			return "不明な通知";
	}
}
