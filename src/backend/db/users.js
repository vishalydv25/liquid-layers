import { v4 as uuid } from "uuid";
import bcyrpt from "bcryptjs";
import { formatDate } from "../utils/authUtils";

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: bcyrpt.hashSync("adarshBalika123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Test",
    lastName: "User",
    email: "test@gmail.com",
    password: bcyrpt.hashSync("test123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sanchi",
    lastName: "Sharma",
    email: "sanchi@gmail.com",
    password: bcyrpt.hashSync("sanchi1234", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
