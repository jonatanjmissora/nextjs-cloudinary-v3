import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useTransformStore from "@/lib/zustand-transform"

export default function transformMenu10() {
	const { setFormat } = useTransformStore()

	return (
		<ToggleGroup
			type="single"
			defaultValue="auto"
			className="flex gap-1 w-full px-4"
			onValueChange={setFormat}
		>
			<ToggleGroupItem value="auto" aria-label="Toggle auto">
				auto
			</ToggleGroupItem>
			<ToggleGroupItem value="webp" aria-label="Toggle webp">
				.webp
			</ToggleGroupItem>
			<ToggleGroupItem value="jpg" aria-label="Toggle jpg">
				.jpg
			</ToggleGroupItem>
			<ToggleGroupItem value="png" aria-label="Toggle png">
				.png
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
