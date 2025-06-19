import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { saveRouterState } from "@/storages/router";

/**
 * ページ訪問状態を自動追跡するフック
 */
export const usePageTracking = () => {
	const location = useLocation();

	useEffect(() => {
		saveRouterState(location.pathname);
	}, [location.pathname]);
};
