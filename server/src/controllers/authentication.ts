import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/interfaces';
import User from '../model/User';
import { Request, Response } from 'express';

const saltRounds: number = 10;

export const loginRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const credentials = req.body as Pick<IUser, "username" | "password" >;
        const user = await User.findOne({username: credentials.username});
        if(user == null) throw new Error("User not found");
        const validPassword = await bcrypt.compare(credentials.password, user.password);
        if(!validPassword) throw new Error("Invalid Password");
        
        const token = assigningTokens(user, res); // assign new tokens after being successfully logged in

        res.json({message: 'Succesfully logged in', auth: true, id: user._id, acessToken: token[0], refreshToken: token[1]});
    } catch (error: any) {
        res.status(401).json({message: error.message});
    }; 
};

export const registerRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const credentials = req.body as Pick<IUser, "username" | "email" | "password">; // Receiving the data from the user and checking if it is valid
        const usernameExist = await User.findOne({username: credentials.username}); //Checking if the username already exists
        if(usernameExist) throw new Error("Username is already used");
        const emailExists = await User.findOne({email: credentials.email}); //Checking if the email is already being used
        if(emailExists) throw new Error("Email is already used");
        const salt: string = await bcrypt.genSalt(saltRounds); //Generating the salt for hashing
        const hashedPassword: string = await bcrypt.hash(credentials.password, salt) //Hashing the password
        const user: IUser = new User({ //Creating the user
            username: credentials.username,
            email: credentials.email,
            password: hashedPassword
        });
        await user.save(); //Saving the new user

        const token = assigningTokens(user, res);

        res.json({message: 'Thank your for signing up', auth: true, id: user._id, acessToken: token[0], refreshToken: token[1]});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    };
};

export const logoutRequest = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('authorization'); 
    res.clearCookie('refreshToken');
    res.clearCookie('id');

    res.status(200).json({message: 'Logged Out'});
};

const assigningTokens = (user: IUser, response: Response) => {
    const accessSecretToken: string = `${process.env.ACCESS_TOKEN_SECRET}`;
    const refreshSecretToken: string = `${process.env.REFRESH_TOKEN_SECRET}`;
    const newAccessToken: string = jwt.sign({ user_id: user._id }, accessSecretToken, {expiresIn: '30s'}); //Creating an access token with JWT
    const newRefreshToken: string = jwt.sign({ user_id: user._id }, refreshSecretToken, {expiresIn: '1day'}); //Creating a refresh token with JWT
    
    response.cookie('authorization', newAccessToken,  { httpOnly: true, secure: true}); // Using cookie to store Access token
    response.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true}); // Using cookie to store Refresh token
    response.cookie('id', user.id, { httpOnly: true, secure: true}); // Using cookie to store data about the user

    return [newAccessToken, newRefreshToken];
};