import { Response } from 'miragejs';
import * as jwt from './jwt';
import dayjs from 'dayjs';

export const requiresAuth = function (request) {
  const encodedToken = request.requestHeaders.authorization;

  const decodedToken = jwt.verify(encodedToken);

  if (decodedToken) {
    const user = this.db.users.findBy({ email: decodedToken.email });

    if (user) {
      return user._id;
    }
  }

  return new Response(
    401,
    {},
    { errors: ['The token is invalid. Unauthorized access error.'] }
  );
};

export const formatDate = () => dayjs().format('YYYY-MM-DDTHH:mm:ssZ');