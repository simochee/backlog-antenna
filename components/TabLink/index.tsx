import { browser } from "wxt/browser";

type Props = { href: string } & Omit<React.ComponentProps<"a">, "href">;

export const TabLink: React.FC<Props> = ({ href, onClick, ...props }) => {
	const handleClick: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
		onClick?.(e);

		if (e.defaultPrevented) {
			return;
		}

		e.stopPropagation();

		const [tab] = await browser.tabs.query({ url: href });

		if (tab?.id) {
			await browser.tabs.update(tab.id, { active: true });
		} else {
			await browser.tabs.create({ url: href });
		}
	};

	return <a href={href} onClick={handleClick} {...props} />;
};
