import tokenServices from '../services/token.services.js'

const AuthMiddleware = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies

    if (!accessToken && !refreshToken) {
        console.log('xato')
        // redirect login
        return res.status(401).json({
            status: 'fail',
            message: 'No authorization',
            authenticated: false,
        })
    }

    if (accessToken) {
        const userData = await tokenServices.validateAccess(accessToken)
        if (userData) {
            req.user = userData
            req.userId = userData.id
            return next()
        }
    }

    if (refreshToken) {
        try {
            const userData = await tokenServices.validateRefresh(refreshToken)
            if (userData) {
                const tokens = tokenServices.tokengenerate({
                    username: userData.username,
                    id: userData.id,
                })
                req.userId = userData.id
                await tokenServices.saveToken(userData.id, tokens.refreshToken)

                res.cookie('accessToken', tokens.accessToken, {
                    httpOnly: true,
                    maxAge: 1 * 24 * 60 * 60 * 1000,
                    secure: false, // HTTPS bilan ishlayotganda true qilib o'rnating
                    path: '/',
                    sameSite: 'Lax', // kross-domen so'rovlar uchun 'None' qilib o'rnating
                })

                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie'ni saqlash vaqti
                    secure: false, // HTTPS bilan ishlayotganda true qilib o'rnating
                    path: '/',
                    sameSite: 'Lax', // kross-domen so'rovlar uchun 'None' qilib o'rnating
                })

                // req orqali kelayotgan cookie fayllarni yangilash
                req.cookies.accessToken = tokens.accessToken
                req.cookies.refreshToken = tokens.refreshToken

                req.user = userData
                return next()
            }
            return res.status(401).json({
                status: 'fail',
                message: 'Refresh token expired.',
                authenticated: false,
            })
        } catch (error) {
            // redirect login
            return res.status(401).json({
                status: 'error',
                message: 'Invalid refresh token',
                authenticated: false,
            })
        }
    }
    // redirect login
    return res.status(401).json({
        status: 'fail',
        message: 'No authorization',
        authenticated: false,
    })
}

const userId = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies

    if (!accessToken && !refreshToken) {
        return next()
    }

    if (accessToken) {
        const userData = await tokenServices.validateAccess(accessToken)
        if (userData) {
            req.userId = userData.id
            return next()
        }
    }

    if (refreshToken) {
        try {
            const userData = await tokenServices.validateRefresh(refreshToken)
            if (userData) {
                req.userId = userData.id

                req.user = userData
                return next()
            }
            return next()
        } catch (error) {
            return next()
        }
    }
    next()
}

export { AuthMiddleware, userId }
