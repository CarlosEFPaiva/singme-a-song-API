import express from 'express';
import cors from 'cors';

import * as recommendationsController from './controllers/recommendationsController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/recommendations', recommendationsController.createNewRecommendation);
app.post('/recommendations/:id/:vote', recommendationsController.evaluateRecommendation);

export default app;
