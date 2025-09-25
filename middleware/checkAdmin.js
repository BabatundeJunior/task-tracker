// // middleware/checkAdmin.js
// const checkAdmin = (req, res, next) => {
//   const userRole = req.header('x-admin-role') || 'user'; 

//   if (userRole !== 'admin') {
//     return res.status(403).json({ message: 'Forbidden: Admins only' });
//   }

//   next();
// };

// module.exports = checkAdmin;
