import mongoose from "mongoose"
import User from "../schemas/auth.schemas"


export const login = async (email: string) => {
    return User.findOne({email}).lean()
}

