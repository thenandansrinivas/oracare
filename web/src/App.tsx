import { useEffect, useState } from 'react'
import PulseDot from './components/pulseDot'
import { Badge } from './components/ui/badge'
import { Card } from './components/ui/card'
import { getMessage } from './utils/msg'

const App = () => {
	const [msg, setMsg] = useState({})

	useEffect(() => {
		getMessage().then(setMsg).catch(console.error)
	}, [])

	return (
		<Card className='m-5 p-10 font-semibold text-3xl text-amber-300'>
			<pre>{JSON.stringify(msg, null, 2)}</pre>
			<div className='mt-4 flex items-center gap-2'>
				<Badge variant='outline'>
					<PulseDot online={Object.keys(msg).length > 0} />
					{Object.keys(msg).length > 0 ? 'ONLINE' : 'OFFLINE'}
				</Badge>
			</div>
		</Card>
	)
}

export default App
