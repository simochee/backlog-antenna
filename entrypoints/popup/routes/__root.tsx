import { createRootRoute, Outlet } from "@tanstack/react-router";
import { PopupLayout } from "@/components/PopupLayout";

export const Route = createRootRoute({
	component: () => (
		<PopupLayout>
			<Outlet />
		</PopupLayout>
	),
});
