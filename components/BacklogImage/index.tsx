import { useCurrentSpace } from "@/hooks/useCurrentSpace";
import { useImageCache } from "@/hooks/useImageCache";

type Props = {
	path: `/api/v2/${string}`;
} & Omit<React.ComponentProps<"img">, "src">;

export const BacklogImage: React.FC<Props> = ({ path, alt = "", ...props }) => {
	const { spaceDomain, apiKey } = useCurrentSpace();
	const { data: src, isLoading } = useImageCache(path);

	// フォールバック：データがない場合は直接URLを使用
	const fallbackSrc = `https://${spaceDomain}${path}?apiKey=${apiKey}`;

	return (
		<img
			src={src || fallbackSrc}
			alt={alt}
			style={{
				opacity: isLoading ? 0.7 : 1,
				transition: "opacity 0.2s ease",
				...props.style,
			}}
			{...props}
		/>
	);
};
