import datastore from "../database/models";
import Helper from "../Utilities/utils";

const { User } = datastore;

/**
 * Create User Account
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */
const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const savedUser = await User.findOne({
      where: { email },
    });
    if (savedUser) {
      return res.status(409).json({
        error: `User with this email already exist, please login`,
      });
    }
    const hashedPassword = Helper.hashPassword(password);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    const { id } = newUser;
    const token = Helper.generateToken({ id, firstname, email });
    return res.status(201).json({
      status: "success",
      data: {
        id,
        firstname,
        message: "Account successfully created",
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Login a user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findIfUserExist = await User.findOne({
      where: { email },
    });
    if (!findIfUserExist) {
      return res.status(401).json({
        error: "Email or Pasword incorrect",
      });
    }
    const validPassword = Helper.verifyPassword(
      findIfUserExist.dataValues.password,
      password
    );
    if (validPassword) {
      const { id, firstname, email } = findIfUserExist.dataValues;
      const token = Helper.generateToken({ id, firstname, email });
      return res.status(200).json({
        status: "success",
        data: {
          firstname,
          message: `Account successfully signed in`,
          token: `Bearer ${token}`,
          id,
        },
      });
    }
    return res.status(401).json({
      status: "unauthorized",
      error: "Either email or password incorrect",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export default { createUser, loginUser };
