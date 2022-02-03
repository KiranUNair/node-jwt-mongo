import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name:{
        type: String
    }
})

export const ROLES = ["user", "moderator", "admin"];

export const Role = mongoose.model("Role", RoleSchema);