import {Router} from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import {createTransaction, getTransactions} from '../controllers/transactions.controller.js';

const transactionRouter = Router();     

transactionRouter.use(verifyJWT);

transactionRouter.route('/transactions').post(createTransaction).get(getTransactions);

export {transactionRouter};