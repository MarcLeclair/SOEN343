import * as jwt from "jsonwebtoken";
import { AdvicePool, beforeMethod } from 'kaop-ts';
import { UserManagement } from "../usermanagement";
import { User } from "../Models/user";

export class RoutingAdvice extends AdvicePool {

  static requireLoggedIn(meta) {
    RoutingAdvice.verifyUserOfType(this, meta, ["User"]);
  }

  static requireAdmin(meta) {
    RoutingAdvice.verifyUserOfType(this, meta, ["Admin"]);
  }

  static requireClient(meta) {
    RoutingAdvice.verifyUserOfType(this, meta, ["Client"]);
  }

  private static verifyUserOfType(self: any, meta: any, types: string[]): void {
    let headers = meta.args[0].headers;
    let res = meta.args[0].res;
    let token;
    let req = meta.args[0];

    try {
      token = headers.authorization.split(" ")[1];
    } catch(e) {
      console.log(e);
      res.send({data: false, error: e});
      self.stop();
      self.next();
    }

    jwt.verify(token, 'tasmanianDevil', function(err, verifiedJwt) {
      if(err) {
        console.log(err);
        console.log("Authentication Error: invalid authorization token");
        self.stop();
        res.status(401).send({data: false, error: err});
        self.next(); // deny access to decorated route
      } else {
        try {
          let user = UserManagement.getInstance().getUserById(verifiedJwt.id);
          if((types.indexOf("User") !== -1 || types.indexOf(user.getType()) !== -1) && user.token === token) {
            console.log("auth successful : " + user.getId());
            req.user = user;
            self.next();
          } else {
            console.log(`Authorization Error: invalid user id ${verifiedJwt.id} or token invalid`);
            self.stop();
            res.status(401).send({data: false, error: `invalid user id ${verifiedJwt.id} or token invalid`});
            self.next();
          }
        }
        catch(e) {
          console.log(e);
          self.stop();
          res.status(401).send({data: false, error: e});
          self.next();
        }
      }
    });
  }
}
