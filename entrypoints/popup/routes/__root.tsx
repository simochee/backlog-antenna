import { createRootRoute, Navigate, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NotFound } from "@/components/NotFound";
import { PopupLayout } from "@/components/PopupLayout";
import { usePageTracking } from "@/hooks/usePageTracking";

export const Route = createRootRoute({
	component: () => {
		usePageTracking();

		return (
			<>
				<PopupLayout>
					<Outlet />
				</PopupLayout>
				<TanStackRouterDevtools />
			</>
		);
	},
	notFoundComponent: () => {
		const {
			items: [space],
		} = useSpaces();

		if (space?.spaceDomain) {
			return (
				<Navigate
					params={{ spaceDomain: space.spaceDomain }}
					to="/$spaceDomain/notifications"
				/>
			);
		}

		return <NotFound />;
	},
});
