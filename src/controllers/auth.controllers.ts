import { UserType } from './../schemas/auth.schemas';
import { Request, Response, NextFunction } from "express";
import * as loginService from "../services/auth.services"
import * as jwtService from "../middleware/jwt.middleware"

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const existingUser = await loginService.login(email)

        if (!existingUser || password != existingUser.password) {
            res.status(401).json({ message: "Invalid email or password" });
            return
        }

        const token = jwtService.createToken(email, existingUser.role)

        return res.status(200).json({
            token
        });
    } catch (err) {
        next(err)
    }
    
}

