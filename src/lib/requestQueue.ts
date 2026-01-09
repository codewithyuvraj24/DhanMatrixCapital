
type CacheEntry<T> = {
    data: T
    timestamp: number
}

const cache = new Map<string, CacheEntry<any>>()
const pendingRequests = new Map<string, Promise<any>>()

export async function cachedFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlSeconds: number = 60
): Promise<T> {
    const now = Date.now()
    const cached = cache.get(key)

    if (cached && (now - cached.timestamp < ttlSeconds * 1000)) {
        return cached.data
    }

    if (pendingRequests.has(key)) {
        return pendingRequests.get(key)
    }

    const promise = fetcher().then(data => {
        cache.set(key, { data, timestamp: Date.now() })
        pendingRequests.delete(key)
        return data
    }).catch(err => {
        pendingRequests.delete(key)
        throw err
    })

    pendingRequests.set(key, promise)
    return promise
}
