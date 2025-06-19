/**
 * お知らせリーズン番号に対応する日本語テキストを返す
 * @param reason Backlog APIから取得したお知らせのリーズン番号
 * @returns 日本語のリーズンテキスト
 */
export function getNotificationReasonText(reason: number): string {
	switch (reason) {
		case 1:
			return "課題が担当されました";
		case 2:
			return "課題にコメントがありました";
		case 3:
			return "課題が追加されました";
		case 4:
			return "課題が更新されました";
		case 5:
			return "ファイルが追加されました";
		case 6:
			return "プロジェクトにユーザーが追加されました";
		case 9:
			return "その他";
		case 10:
			return "プルリクエストが担当されました";
		case 11:
			return "プルリクエストにコメントが追加されました";
		case 12:
			return "プルリクエストが追加されました";
		case 13:
			return "プルリクエストが更新されました";
		default:
			return "不明な通知";
	}
}