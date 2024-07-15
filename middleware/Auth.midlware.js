import tokenServices from "../services/token.services.js";

const AuthMiddleware = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        // redirect login
        return res.status(401).json({ message: 'No authorization', ok : false});
    }

    if (accessToken) {
        const userData = await  tokenServices.validateAccess(accessToken);
        if (userData) {
            req.user = userData;
            return next();
        }
    }

    if (refreshToken) {
        try {
            const userData = await  tokenServices.validateRefresh(refreshToken);
            if (userData) {
                const tokens = tokenServices.tokengenerate({email: userData.email, id: userData.id});
                await tokenServices.saveToken(userData.id, tokens.refreshToken);

                res.cookie("accessToken", tokens.accessToken, { httpOnly: true, secure: true });
                res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, secure: true });

                req.user = userData
                return next();
            }
        } catch (error) {
            // redirect login
            return res.status(401).json({ message: 'Invalid refresh token', ok : false});
        }
    }
    // redirect login
    return res.status(401).json({ message: 'No authorization', ok : false});
};

export default AuthMiddleware;