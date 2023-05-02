import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, customer) => {
      if (err) res.status(403).json("Token is not valid!");
      req.customer = customer;
      next();
    });
  } else {
    return res.status(401).json("You're not authenticated!");
  }
};

export const verifyTokenAndAuthorization = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.customer.id === req.params.id || req.customer.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
