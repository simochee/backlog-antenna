import { useLocation, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { saveLastVisitedPage } from "@/storages/lastVisited";

/**
 * ページ訪問状態を自動追跡するフック
 */
export const usePageTracking = () => {
	const location = useLocation();
	const params = useParams({ from: "/$spaceDomain" });

	useEffect(() => {
		// スペースページの場合のみ追跡
		if (params.spaceDomain) {
			const path = location.pathname.replace(`/${params.spaceDomain}`, "");
			// 有効なパスの場合のみ保存
			if (["/notifications", "/projects", "/issues"].includes(path)) {
				saveLastVisitedPage(params.spaceDomain, path);
			}
		}
	}, [location.pathname, params.spaceDomain]);
};
