const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');
const db = require('./db/connect');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);


db.initDb((err) => {
  if (err) console.error(err);
  else {
    app.listen(port, () => {
      console.log(` Server running on port ${port}`);
    });
  }
});
