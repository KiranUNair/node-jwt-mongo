import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Role, ROLES } from "../models/role.js";
import { User } from "../models/user.js";

export const signUp = async (req, res) => {
    try { 
        let roles;     
        if (req.body.roles) {
            roles = await Role.find({name: {$in: req.body.roles}}).catch(err => res.status(500).send({message: err}));
            roles = roles.map(role => role._id);            
        }
        else{
            const role = await Role.findOne({name: "user"}).catch(err => res.status(500).send({message: err}));
            roles = [role._id];
        }
        await User.create({ userName: req.body.username, 
                            email: req.body.email, 
                            password: bcrypt.hashSync(req.body.password, 8), 
                            roles: roles
                        }).catch(err => res.status(500).send({message: err}));
        return res.send({message: `User was registered successfully`});
                
    } catch (err) {
        console.error(`Error Message: ${err}`);
    }
}

export const signIn = async(req, res) => {
    try {        
        const user = await User.findOne({userName: req.body.username}).populate("roles","-__v").catch(err => res.status(500).send({message: err}));
        if(!user)
            return res.status(404).send({message: `User not found!`});
        

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
            });
        }
        const token = jsonwebtoken.sign({id: user._id}, process.env.SECRET, {expiresIn: 86400});
        const authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        return res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
    } catch (err) {
        console.error(err);
    }
}
