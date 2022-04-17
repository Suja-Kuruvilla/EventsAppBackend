const User = require(`../model/user`);
const bCrypt = require(`bcrypt`);

module.exports = {
  async login(req, resp) {
    const { email, passWord } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return resp.status(200).json({
          message: "no email. Do you want to sing-in instead?",
        });
      }

      if (bCrypt.compare(user.passWord, passWord)) {
        const userResp = {
          _id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        return resp.json(userResp);
      } else {
        resp.status(200).json({
          message: "Email or password does not match",
        });
      }
    } catch (error) {
      throw Error(`error while authenticating user ${error}`);
    }
  },
};
