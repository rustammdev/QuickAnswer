import tokenServices from "../services/token.services.js";

const AuthMiddleware = async (req, res, next) => {
    const { accesToken, refreshToken } = req.cookies;

    if (!accesToken && !refreshToken) {
        return res.status(401).json({ message: 'No authorization' });
    }

    if (accesToken) {
        const userData = await  tokenServices.validateAccess(accesToken);
        if (userData) {
            req.user = userData;
            return next();
        }
    }

    if (refreshToken) {
        try {
            const userData = await  tokenServices.validateRefresh(refreshToken);
            if (userData) {
                const tokens = tokenServices.tokengenerate(payload);
                await tokenServices.saveToken(payload.user, tokens.refreshToken);

                res.cookie("accesToken", tokens.accessToken, { httpOnly: true, secure: true });
                res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, secure: true });
                req.user = userData;
                return next();
            }
        } catch (error) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    }
    return res.status(401).json({ message: 'No authorization' });
};

export default AuthMiddleware;