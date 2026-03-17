import rpc from '@/lib/rpc'

export const getMessage = async () => {
	const { data, error } = await rpc.get()
	if (error) throw error
	return data
}
