export const allAccess = (req, res) => {
    return res.status(200).send("Public Content.");
  };
  
export const userBoard = (req, res) => {
    return res.status(200).send("User Content.");
  };
  
export const adminBoard = (req, res) => {
    return res.status(200).send("Admin Content.");
    
  };
  
export const moderatorBoard = (req, res) => {
    res.status(200).send({message: "Moderator Content."});
    };