import dotenv from "dotenv";
import Helper from "../../Utilities/utils";

dotenv.config();

const password = process.env.PASSWORD;
const hashedPassword = Helper.hashPassword(password);


export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          firstname: "alimi1",
          lastname: "kehinde1",
          email: "kmurphy1@gmail.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "alimi2",
          lastname: "kehinde2",
          email: "kmurphy2@gmail.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "alimi3",
          lastname: "kehinde3",
          email: "kmurphy3@gmail.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],

      {}
    ),

  down: (queryInterface) =>
    queryInterface.bulkDelete("Users", null, {}),
};
