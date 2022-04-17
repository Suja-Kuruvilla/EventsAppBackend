const Registration = require(`../model/registration`);

module.exports = {
  async reject(req, resp) {
    const { registerId } = req.params;

    try {
      const reg = await Registration.findById(registerId);
      reg.approved = false;
      await reg.save();
      return resp.json(reg);
    } catch (error) {
      resp.status(400).json({
        message: `Reg with the specified Id doesn't exists ${error}`,
      });
    }
  },
};
