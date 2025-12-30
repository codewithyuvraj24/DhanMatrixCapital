"use server"
import Parser from 'rss-parser'

export interface NewsItem {
    title: string
    link: string
    pubDate: string
    content: string
    source: string
    guid?: string
}

export async function getMarketNews(): Promise<NewsItem[]> {
    const parser = new Parser()

    // Using Yahoo Finance and Economic Times for a mix of global and Indian context
    const FEED_URL = 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms'

    try {
        const feed = await parser.parseURL(FEED_URL)
        return feed.items.slice(0, 6).map(item => ({
            title: item.title || 'Market Update',
            link: item.link || '#',
            pubDate: item.pubDate || new Date().toISOString(),
            content: item.contentSnippet?.slice(0, 100) + '...' || '',
            source: 'Economic Times',
            guid: item.guid || item.link
        }))
    } catch (error) {
        console.error("Error fetching news:", error)
        return []
    }
}
