import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';

const authenticate =async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    const accessTokenSecret: string = `${process.env.ACCESS_TOKEN_SECRET}`;
    const userSession: string = req.cookies.userSession;
    const authHeader = req.headers.authorization;
    if(!authHeader) {res.status(401).json({message: 'Unauthorized'}); return;}
    try {
        const accessToken = authHeader.split(' ')[1];
        const decoded: any = await jwt.verify(accessToken, accessTokenSecret);
        if(JSON.stringify(decoded.user) !== JSON.stringify(userSession)) {res.status(401).json({message: 'Unauthorized'}); return;};
        req.decoded = decoded;
    } catch (error) {
        try {
            const refreshToken: string = req.cookies.refreshToken;
            const refreshTokenSecret: string = `${process.env.REFRESH_TOKEN_SECRET}`;
            if(refreshToken == null || refreshToken == '') { console.log('RefreshToken is not provided') ;res.status(401).json({message: 'Unauthorized'}); return; }
            const decoded: any = await jwt.verify(refreshToken, refreshTokenSecret);
            if(JSON.stringify(decoded.user) !== JSON.stringify(userSession)) {console.log('user and userSession is not matching'); res.status(401).json({message: 'Unauthorized'}); return;};
            
            const newAccessToken = jwt.sign({ user: userSession }, accessTokenSecret, {expiresIn: '30s'});
            const newRefreshToken = jwt.sign({ user: userSession }, refreshTokenSecret, {expiresIn: '1day'});

            req.accessToken = newAccessToken;
            req.decoded = decoded;
            res.cookie('refreshToken', newRefreshToken, {httpOnly: true});
        } catch (error) {
            res.clearCookie('authorization');
            res.clearCookie('refreshToken');
            res.clearCookie('userSession');
            console.log(error);
            res.status(401).json({message: 'Unauthorized'});
            return;
        };
    };
    next();
};

export default authenticate;