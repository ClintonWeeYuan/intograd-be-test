process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const expect = require("chai").expect;
chai.use(chaiHttp);

module.exports = (testDescription, testsCallBack) => {
  describe(testDescription, () => {
    before(async () => {
      //set up the app and mongoose server.
      let mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri, {
        useNewURLParser: true,
        useUnifiedTopology: true,
      });
    });

    const clearDB = () => {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].deleteMany(() => {});
      }
    };

    beforeEach(async () => {
      //Clear db
      await clearDB();
    });

    after(async () => {
      //Clear DB and disconnect from server
      await clearDB();
      await mongoose.disconnect();
    });

    testsCallBack();
  });
};
