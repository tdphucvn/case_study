import jwt from 'jsonwebtoken';
import User from '../model/User';
import { Request, Response, NextFunction} from 'express';

const authenticate =async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    const accessTokenSecret: string = `${process.env.ACCESS_TOKEN_SECRET}`;
    // get the client ID from cookies
    const userId: string = req.cookies.id;
    // find the client in the database
    const user = await User.findById(userId);
    // get the accessToken from the header of the request
    const authHeader = req.headers.authorization;
    if(!authHeader) {res.status(401).json({message: 'Unauthorized'}); return;}
    try {
        const accessToken = authHeader.split(' ')[1];
        // verify the accessToken
        const decoded: any = await jwt.verify(accessToken, accessTokenSecret);
        // check if the client is the person to whom the accessToken belongs
        if(JSON.stringify(decoded.user) !== JSON.stringify(user)) {res.status(401).json({message: 'Unauthorized'}); return;};
        req.decoded = decoded;
    } catch (error) {
        // if the accessToken fails to verify
        try {
            // get the refreshToken that is stored in the HTTP only cookies
            const refreshToken: string = req.cookies.refreshToken;
            const refreshTokenSecret: string = `${process.env.REFRESH_TOKEN_SECRET}`;
            if(refreshToken == null || refreshToken == '') { console.log('RefreshToken is not provided') ;res.status(401).json({message: 'Unauthorized'}); return; }
            // verify the refreshToken
            const decoded: any = await jwt.verify(refreshToken, refreshTokenSecret);            
            // Creating new tokens
            const newAccessToken = jwt.sign({ user: user }, accessTokenSecret, {expiresIn: '30s'});
            const newRefreshToken = jwt.sign({ user: user }, refreshTokenSecret, {expiresIn: '1day'});

            req.accessToken = newAccessToken;
            req.decoded = decoded;

            //setting the new refreshToken in cookies
            res.cookie('refreshToken', newRefreshToken, {httpOnly: true});
        } catch (error) {
            // fail to verify
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