import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../openapi.json' assert { type: "json" };

const app = express();

const options = {
  customJs: ['/custom.js', 'https://example.com/other-custom.js']
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// other routes and middleware

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

