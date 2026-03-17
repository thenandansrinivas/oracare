import { useEffect, useState } from 'react'
import { getMessage } from './utils/msg'

const App = () => {
	const [msg, setMsg] = useState('')

	useEffect(() => {
		getMessage().then(setMsg)
	}, [])

	return <div className='m-5 p-10 font-semibold text-3xl text-amber-300'>{msg}</div>
}

export default App
