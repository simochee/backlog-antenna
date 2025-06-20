import clsx from "clsx";
import { useCurrentSpace } from "@/hooks/useCurrentSpace";

type Props = {
	path: `/api/v2/${string}`;
} & Omit<React.ComponentProps<"img">, "src">;

export const BacklogImage: React.FC<Props> = ({
	path,
	alt = "",
	className,
	...props
}) => {
	const { spaceDomain, apiKey } = useCurrentSpace();

	/**
	 * 画像がエラーになったら透明な png に置き換える
	 */
	const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
		e.currentTarget.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`;
	};

	return (
		<img
			{...props}
			src={`https://${spaceDomain}${path}?apiKey=${apiKey}`}
			alt={alt}
			className={clsx("bg-gray-200", className)}
			onError={handleError}
		/>
	);
};
