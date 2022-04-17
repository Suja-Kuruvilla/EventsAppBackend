const { set } = require("mongoose");
const Event = require(`../model/event`);
/*
 * Controller responsible for handling 'Get'
 * requests for events
 */
module.exports = {
  async getEventById(req, res) {
    const { eventId } = req.params;
    try {
      const event = await Event.findById(eventId);

      if (event) {
        return res.json(event);
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: `EventId ${eventId} does not exist!` });
    }
  },

  async getAllEvents(req, res) {
    console.log(`Checking AWS API - Dashboard GetAllEvents`);
    const { sport } = req.params;
    const query = sport ? { sport } : {};

    try {
      const events = await Event.find(query);

      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "We do have any events yet" });
    }
  },

  async getUserSpecificEvents(req, res) {
    const { user_id } = req.headers;
    console.log(user_id);

    try {
      const events = await Event.find({ user: user_id });
      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: `We do have any events for user ${user_id}` });
    }
  },

  async getAllSports(req, res) {
    //console.log(`getAllSports`);

    try {
      const events = await Event.find();
      var sports = [];

      if (events) {
        for (let i = 0; i < events.length; i++) {
          sports.push(events[i].sport);
        }
        return res.json(sports);
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: `We do have any events for ${sprt}` });
    }
  },
};
