import UsersService from "#root/adapters/UsersService";
import { NextFunction, Request, Response } from "express";

const injectSession = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.userSessionId) {
    const userSession = await UsersService.fetchUserSession({
      sessionId: req.cookies.userSessionId,
    });
    res.locals.userSession = userSession;
  }
  return next();
};
export default injectSession;
