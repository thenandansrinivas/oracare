const PulseDot = ({ online }: { online: boolean }) => (
	<span
		className='relative flex h-1 w-1'
		role='status'
		aria-label={online ? 'Online' : 'Offline'}
	>
		{online && (
			<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
		)}
		<span className={`relative inline-flex h-1 w-1 rounded-full ${online ? 'bg-green-500' : 'bg-gray-400'}`} />
	</span>
)

export default PulseDot
