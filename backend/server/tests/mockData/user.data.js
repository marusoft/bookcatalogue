export const createUserDetails = [
  {
    firstname: "abumuaiz1",
    lastname: "abdullahit",
    email: "ab@gmail.com",
    password: "abu123",
  },
  {
    firstname: "abumuaiz2",
    lastname: "abdullahie",
    email: "abu@gmail.com",
    password: "abu123",
  },
  {
    firstname: "abumuaiz3",
    lastname: "abdullahim",
    email: "abu1@gmail.com",
    password: "abu123",
  },
];

export const wrongCreateUserDetails = [
  // undefined email
  {
    firstname: "abumuaiz1",
    lastname: "abdullahit",
    password: "abu123",
  },

  // email contain space
  {
    firstname: "abumuaiz1",
    lastname: "abdullahit",
    email: "alimi@aa",
    password: "abu123",
  },
  // invalid email format
  {
    firstname: "",
    lastname: "abdullahithhh",
    email: "abgmaifdf@gmail.com",
    password: "abu123",
  },
  // existing user email
  {
    firstname: "abumuaiz1",
    lastname: "abdullahit",
    email: "ab@gmail.com",
    password: "abu123",
  },
  // undefined firstname
  {
    firstname: "abumuai2",
    lastname: "",
    email: "abu@gmail.com",
    password: "abu123",
  },
  // spaced firstname
  {
    firstname: "abum uaiz1",
    lastname: "abdullahit",
    email: "ab@gmail.com",
    password: "abu123",
  },

  // undefined lastname
  {
    firstname: "abumuaiz1",
    email: "ab@gmail.com",
    password: "abu123",
  },
  // spaced lastname
  {
    firstname: "abumuaiz1",
    lastname: "abdul  lahit",
    email: "ab@gmail.com",
    password: "abu123",
  },

  // password undefined
  {
    firstname: "alimi1",
    lastname: "kehinde1",
    email: "kmurphy1@gmail.com",
  },
];

export const invalidSigninDetails = [
  // empty email
  {
    email: "",
    password: "quidax21",
  },
  // user email not existent
  {
    email: "kmurphy1@gmail.com",
    password: "",
  },
  // empty password
  {
    email: "kmurphy1@gmail.com",
  },
  // password incorrect
  {
    email: "kmu@gmail.com",
    password: "quidax0921",
  },
];
