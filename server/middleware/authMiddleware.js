import jwt from 'jsonwebtoken';

const authenticated = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || header === '') return res.status(403).json({ status: 403, error: 'FORBIDDEN' });

    const token = jwt.verify(header, `${req.body.password}`);
    req.user = token;
    next();
  } catch {
    return res.status(401).json({ status: 401, error: 'UNAUTHORIZED!' });
  }
};

export default authenticated;