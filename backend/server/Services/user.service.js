import datastore from "../database/models";

/**
 * @param {string}
 * @returns {string} newUser
 */
const createAUser = async (newUser) => {
  try {
    const addUser = await datastore.User.create(newUser);
    return addUser;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {string} email
 * @returns {string} savedUser
 */
const findAUser = async (email) => {
  try {
    const savedUser = await datastore.User.findOne({
      where: { email },
    });
    return savedUser;
  } catch (error) {
    console.log(error);
  }
};

export default { createAUser, findAUser };
