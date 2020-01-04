import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import IdentifierController from './app/controllers/IdentifierController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpQuestionController from './app/controllers/HelpQuestionController';
import HelpAnswerController from './app/controllers/HelpAnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/*
 * Student features
 */

// Identify student
routes.get('/identifiers/:id', IdentifierController.show);

routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/checkins', CheckinController.index);

routes.post('/students/:student_id/help-orders', HelpQuestionController.store);
routes.get('/students/:student_id/help-orders', HelpQuestionController.index);

/*
 * Authenticate user
 */
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);

/*
 * User features
 */
routes.post('/students', StudentController.store);
routes.get('/students/:id', StudentController.show);
routes.get('/students', StudentController.index);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', PlanController.store);
routes.get('/plans/:id', PlanController.show);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations/:id', RegistrationController.show);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

routes.get('/help-orders', HelpAnswerController.index);
routes.post('/help-orders/:id/answer', HelpAnswerController.store);

module.exports = routes;
