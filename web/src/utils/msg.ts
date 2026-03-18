import rpc from '@/lib/rpc'

export const getMessage = async () => {
	const { data, error } = await rpc.live.get()
	if (error) throw error
	return data
}
