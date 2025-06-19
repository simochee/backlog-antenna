import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { saveRouterState } from "@/storages/router";

/**
 * ページ訪問状態を自動追跡するフック
 */
export const usePageTracking = () => {
	const location = useLocation();

	useEffect(() => {
		// 有効なパスの場合のみ保存
		const isValidPath = /^\/[^/]+\/(notifications|projects|issues)$/.test(
			location.pathname,
		);
		if (isValidPath) {
			saveRouterState(location.pathname);
		}
	}, [location.pathname]);
};
