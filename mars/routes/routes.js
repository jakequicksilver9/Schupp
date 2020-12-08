const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const fileController = require('../controllers/fileController');

 
router.post('/signup', userController.signup);
 
router.post('/login', userController.login);
 
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
 
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
// router.get('/users', userController.allowIfLoggedin, userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.get('/approve/:userId', userController.allowIfLoggedin,  userController.approveUser);
 
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);


//files
router.post('/upload/:userId', fileController.upload);

router.get('/files', userController.allowIfLoggedin, fileController.getFiles);

 
module.exports = router;