import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

class UserRoute {
    constructor () {
        this.controller = new UserController();
    }

    start() {
        router.post('/login', this.controller.login);
        router.post('/add-user', this.controller.addUser);
        router.get('/get-user/:id?', this.controller.getUsers);
        router.put('/edit-user/:id', this.controller.editUser);
        router.delete('/delete-user/:id', this.controller.deleteUser);

        return router;
    }

}

export default UserRoute;