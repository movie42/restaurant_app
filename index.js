import app from "./server";
import mongodb, { MongoClient } from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./api/dao/restaurantsDAO";

dotenv.config();

const mongoClient = mongodb.MongoClient;

const PORT = process.env.PORT || 8000;

mongoClient
  .connect(process.env.RESTREVIEW_DB_URI, {
    writeConcern: { wtimeout: 2500 },
    poolSize: 50,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    app.listen(
      PORT,
      console.log(`SERVER is RUNNING, http://localhost:${PORT}`)
    );
  });
