// middleware.ts (root project)
import { NextRequest, NextResponse } from 'next/server'

// ❌ Senarai bot yang nak block
const BLOCKED_BOTS = [
    // Scrapers & spam bots
    'AhrefsBot',
    'SemrushBot',
    'DotBot',
    'MJ12bot',
    'BLEXBot',
    'SearchmetricsBot',
    'PetalBot',
    'Bytespider',       // TikTok aggressive crawler
    'GPTBot',           // OpenAI scraper
    'CCBot',            // Common Crawl
    'ClaudeBot',
    'Amazonbot',
    'YandexBot',
    'Sogou',
    'serpstatbot',
    'DataForSeoBot',
    'megaindex',
    'BomboraBot',
    'Linguee',
    'newspaper',
    'python-requests',
    'Go-http-client',
    'Apache-HttpClient',
    'curl',
    'wget',
    'Scrapy',
    'HttpClient',
    'node-fetch',
    'axios',
    'libwww-perl',
    'okhttp',
]

// ✅ Bot yang JANGAN block (penting untuk SEO)
const ALLOWED_BOTS = [
    'Googlebot',
    'Bingbot',
    'Slurp',           // Yahoo
    'DuckDuckBot',
    'facebookexternalhit',  // Facebook preview
    'Twitterbot',           // Twitter/X preview
    'LinkedInBot',
    'WhatsApp',
    'TelegramBot',
    'Discordbot',
]

// Rate limiting store (in-memory, reset setiap deployment)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function isBlockedBot(userAgent: string): boolean {
    if (!userAgent || userAgent.length < 10) return true // UA kosong/terlalu pendek = suspicious

    const ua = userAgent.toLowerCase()

    // Check kalau allowed bot dulu
    for (const allowed of ALLOWED_BOTS) {
        if (ua.includes(allowed.toLowerCase())) return false
    }

    // Check kalau blocked bot
    for (const blocked of BLOCKED_BOTS) {
        if (ua.includes(blocked.toLowerCase())) return true
    }

    return false
}

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const windowMs = 10_000 // 10 saat
    const maxRequests = 20   // max 20 request per 10 saat

    const record = rateLimitMap.get(ip)

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
        return false
    }

    record.count++
    return record.count > maxRequests
}

function isSuspiciousRequest(req: NextRequest): {
    blocked: boolean
    reason: string
} {
    const ua = req.headers.get('user-agent') || ''
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || req.headers.get('x-real-ip')
        || 'unknown'

    // 1. No User-Agent atau terlalu pendek
    if (!ua || ua.length < 10) {
        return { blocked: true, reason: 'no-ua' }
    }

    // 2. Known bad bots
    if (isBlockedBot(ua)) {
        return { blocked: true, reason: 'blocked-bot' }
    }

    // 3. Rate limiting — terlalu banyak request
    if (isRateLimited(ip)) {
        return { blocked: true, reason: 'rate-limited' }
    }

    // 4. Suspicious headers pattern
    // Bot selalu takde accept-language
    const acceptLang = req.headers.get('accept-language')
    const accept = req.headers.get('accept')

    if (!acceptLang && !accept) {
        return { blocked: true, reason: 'no-headers' }
    }

    return { blocked: false, reason: '' }
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Skip untuk static files & API yang perlu
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff2?)$/)
    ) {
        return NextResponse.next()
    }

    const { blocked, reason } = isSuspiciousRequest(req)

    if (blocked) {
        // Option 1: Return 403
        // return new NextResponse('Forbidden', { status: 403 })

        // Option 2: Return 429 untuk rate limit
        if (reason === 'rate-limited') {
            return new NextResponse('Too Many Requests', { status: 429 })
        }

        // Option 3 (RECOMMENDED): Bagi page kosong — bot ingat site dah mati
        return new NextResponse(null, { status: 204 })
    }

    // Tambah header untuk tracking
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-bot-check', 'passed')
    return NextResponse.next({
        request: { headers: requestHeaders },
    })
}

export const config = {
    matcher: [
        /*
         * Match semua path KECUALI:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}