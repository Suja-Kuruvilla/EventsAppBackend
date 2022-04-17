const Event = require("../model/event");
const User = require("../model/user");

module.exports = {
  async createEvent(req, res) {
    //console.log(req.file);
    const { title, description, price, sport, date } = req.body;
    const { user_id } = req.headers;
    const { filename } = req.file || {};
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    console.log(date, `Converted `, Date.parse(date));

    const event = await Event.create({
      title,
      description,
      date,
      price: parseFloat(price),
      user: user_id,
      thumbnail: filename,
      sport,
    });

    await event.populate(`user`);
    return res.status(200).json(event);
  },

  async deleteEvent(req, resp) {
    const { eventId } = req.params;
    console.log(eventId);

    try {
      await Event.findByIdAndDelete(eventId);
      return resp.status(204).send();
    } catch (error) {
      return resp.status(400).json({
        message: `Event with this id is not present hello`,
      });
    }
  },
};
