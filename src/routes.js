const express = require(`express`);
const multer = require(`multer`);

const userController = require("./controllers/userController");
const eventController = require(`./controllers/eventsController`);
const dashboardController = require(`./controllers/dashboardController`);
const loginController = require(`./controllers/loginController`);
const uploadConfig = require(`./config/upload`);
const registrationController = require("./controllers/registrationController");
const approvalController = require(`./controllers/approvalController`);
const rejectionController = require(`./controllers/rejectionController`);
const reminderController = require(`./controllers/ReminderController`);

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get(`/status`, (req, resp) => {
  resp.send({ status: 200 });
});

//loginController
routes.post(`/login`, loginController.login);

//registrationController
routes.post(`/register/:eventId`, registrationController.register);
routes.get(`/register/:registrationId`, registrationController.rgistrationById);

//approvalController
routes.post(`/register/:registerId/approvals`, approvalController.approve);
routes.post(`/register/:registerId/rejections`, rejectionController.reject);

//DashboardController
routes.get(`/dashboard/sports`, dashboardController.getAllSports);
routes.get(`/dashboard/events`, dashboardController.getUserSpecificEvents);
routes.get(`/dashboard/:sport`, dashboardController.getAllEvents);
routes.get(`/dashboard/`, dashboardController.getAllEvents);

routes.post(`/remind/:eventId`, reminderController.remind);

routes.get(`/event/:eventId`, dashboardController.getEventById);

//EventController
routes.post(`/event`, upload.single("thumbnail"), eventController.createEvent);
routes.delete(`/event/:eventId`, eventController.deleteEvent);

//UserController
routes.get(`/user/:userId`, userController.getUserById);
routes.post(`/register`, userController.store);

module.exports = routes;
