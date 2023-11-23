import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next)=> {
    const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(false);
  }

  const token = authHeader.substring(7);
    jwt.verify(token, 'abc-xyz', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Phiên đăng nhập hết hạn' });
      }
  
      req.user = user;
      next();
    });
  }
  