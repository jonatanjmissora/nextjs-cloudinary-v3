import { CloudinaryAsset } from '@/lib/types'
import Image from 'next/image'
import { DashboardFileMenu } from './dashboard-file-menu'
import { DashboardFileInfo } from './dashboard-file-info'

export const FilesListList = ({sortedFolders}: {sortedFolders: CloudinaryAsset[]}) => {

	return (
		<article className={`w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 my-3`}>
			{sortedFolders?.map(asset => (
				<div key={asset.public_id} className={`w-full h-full relative group border-2 p-2 flex items-center gap-20 rounded-lg hover:border-orange-500/50 overflow-hidden`}>
					<Image
						src={asset.secure_url}
						alt={asset.public_id}
						width={300}
						height={300}
						quality={100}
						priority
						objectFit="cover"
						className={`ml-8 w-[150px] h-[150px] object-cover`}
					/>
					<DashboardFileMenu asset={asset} view="list"/>
					<DashboardFileInfo asset={asset} view="list"/>
				</div>
			))}
		</article>

	)
}
