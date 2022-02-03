import { Role, ROLES } from '../models/role.js';
import { User } from '../models/user.js';

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({userName: req.body.userName}).catch(err => res.status(500).send({message: err}));
        if(user){
            res.satus(400).send({message: `Failure: UserName is already in use`});
            return;
        }

        const email = await User.findOne({email: req.body.email}).catch(err => res.status(500).send({message:err}));
        if(email){
            res.status(400).send({message: `Failure: Email already in use`});
            return;
        }
        next();
    } catch (err) {
        console.error(err);
    }
}

export const checkRolesExisted = (req, res, next) => {
  try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
      }
    }  
    next();    
  } catch (err) {
   console.error(err);
  }
};