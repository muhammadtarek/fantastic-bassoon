const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if (!token) 
    res.status(401).json({data : null , message : "Access denied , Please login" , errors : "Access denied"});
  try {
      const decoded = jwt.verify(token,'jwtPrivateKey');
      console.log(decoded);
      req.user = decoded;
      next();
  }
  catch (ex) {
    res.status(400).json({data : null , message : "Access denied , Please login" , errors : "Access denied"});
  }
   
}
module.exports = auth;