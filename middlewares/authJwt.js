import { Role, ROLES } from '../models/role.js';
import { User } from '../models/user.js';
import jsonwebtoken from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
      }

    jsonwebtoken.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
    // const decodedVal = await jsonwebtoken.verify(token, process.env.SECRET);
    // req.userId = decodedVal.id;
    //next();
        
    } catch (err) {
        console.error(err);
        res.status(401).send({ message: "Unauthorized!" })
    }
    
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId).catch(err => res.status(500).send({message: err}));
    const roles = await Role.find({_id: {$in: user.roles}}).catch(err => res.status(500).send({message: err}));
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          return next();
        }
      }    
    return res.status(403).send({ message: "Require Admin Role!" });
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById({_id: req.userId}).catch(err => {return res.status(500).send({message: err})});
  const roles = await Role.find({_id: {$in: user.roles}}).catch(err => {return res.status(500).send({message: err})});
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      return next();
    }
  }    
return res.status(403).send({ message: "Require Moderator Role!" });
}