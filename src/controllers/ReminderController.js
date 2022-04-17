const Event = require("../model/event");
const User = require("../model/user");
const { use } = require("../routes");

/*
 * Controller responsible reminding users of events
 */
module.exports = {
  async remind(req, resp) {
    const { eventId } = req.params;
    const { user_id } = req.headers;
    console.log(
      `ReminderController::rimind - Setting reminder for event ${eventId} for user ${user_id}`
    );

    try {
      const event = await Event.findById(eventId);
      const evtDate = event.date;
      const remainingTime = evtDate - new Date().getTime();
      console.log(
        `event date ${evtDate} remaining time before the event ${remainingTime}`
      );
      req.redisClient.get(user_id, function(err, res) {
        console.log(`Redis get for userId ${user_id} returned ${res}`);
        setTimeout(timerTimedout, 3000, eventId, res, req.socketServer);
      });
    } catch (error) {
      console.log(`Setting up reminder for ${eventId} failed`);
    }
  },
};

const timerTimedout = (eventId, sockId, sockServer) => {
  console.log(`timer timed out`);
  if (sockId) {
    sockServer.to(sockId).emit("Reminder", { event: eventId });
  }
};
