const Registration = require(`../model/registration`);

module.exports = {
  async register(req, resp) {
    const { userId } = req.headers;
    const { eventId } = req.params;
    const { date } = req.body;

    const regi = await Registration.create({
      user: userId,
      event: eventId,
      date,
    });

    await regi.populate(`user`);

    return resp.json(regi);
  },

  async rgistrationById(req, resp) {
    const { registrationId } = req.params;

    try {
      const reg = await Registration.findById(registrationId)
        .populate(`user`)
        .populate(`event`)
        .exec();
      return resp.json(reg);
    } catch {
      return resp.status(400).json({
        message: `Registration with this Id doesn't exists`,
      });
    }
  },
};
