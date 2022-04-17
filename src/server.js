const express = require("express");
const mongoose = require(`mongoose`);
const cors = require(`cors`);
const routes = require(`./routes`);
const path = require(`path`);
const http = require(`http`);
const redis = require(`redis`);

const redisClient = redis.createClient();
const app = express();
const httpServer = http.Server(app);
const socketServer = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV != `production`) {
  require(`dotenv`).config();
}

socketServer.on(`connection`, (socket) => {
  const { userId } = socket.handshake.query;
  console.log(`Entering into redis ${userId}  socketId ${socket.id}`);
  redisClient.set(userId, socket.id);
  console.log(`Socket ${socket.id} io connected to ${userId} `);
});

app.use((req, res, next) => {
  req.socketServer = socketServer;
  req.redisClient = redisClient;
  return next();
});

app.use(cors());
app.use(express.json());

try {
  mongoose.connect(
    "mongodb+srv://tempUser:RGow4Mv2XF1hst59@cluster0.0lyxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log(`Mongo Db connection successful`);
} catch {
  console.log(`Mongo db connection faliled`);
}
app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);

httpServer.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
