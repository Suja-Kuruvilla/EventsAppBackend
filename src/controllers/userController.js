const user = require(`../model/user`);
const bCrypt = require(`bcrypt`);

/*
 * Controller responsible for registering new users
 * into the system
 */
module.exports = {
  async store(req, resp) {
    try {
      //Names of the parameter have to be exactly same as what is sent from the server
      const { firstName, lastName, email, passWord } = req.body;
      console.log(firstName, lastName, email, passWord);
      const isExist = await user.findOne({ email });

      if (!isExist) {
        const hashedPwd = await bCrypt.hash(passWord, 10);
        const docCreated = await user.create({
          firstName,
          lastName,
          email,
          passWord: hashedPwd,
        });
        return resp.json({
          firstName: docCreated.firstName,
          lastName: docCreated.lastName,
          _id: docCreated.id,
          email: docCreated.email,
        });
      }
      return resp.status(400).json({
        message: `email already exists`,
      });
    } catch (err) {
      throw Error(`Error while registering user : ${err}`);
    }
  },

  async getUserById(req, resp) {
    const { usedId } = req.params;
    try {
      const user = await user.findById(userId);
      return resp.json(user);
    } catch (error) {
      return resp.status(400).json({
        message: `User ID does not exist. Do you want to register instead?`,
      });
    }
  },
};
