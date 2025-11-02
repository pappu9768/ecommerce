import express from 'express';
import { login, signup } from '../controllers/user.controllers.js';
import { loginValidation, signupValidation } from '../middlewares/user.validation.js';
import { userAuthorization } from '../middlewares/user.authorization.js';
import { isAdmin } from '../middlewares/forIsAdmin.js';
import { createProductFromAdmin, deleteProduct, getAllProducts, updateProduct} from '../controllers/user.adminController.js'
import { multerUpload } from '../middlewares/multer.middleware.js';

const router = express.Router();

//public route
router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login)

//normal route
router.get('/allproducts',userAuthorization,getAllProducts);


//admin routes
router.post('/adminDashboard',userAuthorization,isAdmin,multerUpload.single("productImage"),createProductFromAdmin)

// router.post('/adminDashboard',userAuthorization,isAdmin,)
router.delete('/adminDashboard/:id',userAuthorization,isAdmin,deleteProduct)
router.put('/adminDashboard/:id',userAuthorization,isAdmin,updateProduct)


export default router