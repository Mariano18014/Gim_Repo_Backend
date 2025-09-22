import UserService from "../services/userService.js";

class UserController {
    constructor () {
        this.service = new UserService();
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            
            if (!this.#validateLoginFields({ email, password })) {
                return res.status(400).json({ error: "El mail y la contraseña son obligatorios." });
            }

            const user = await this.service.login(email, password);

            if(!user) {
                return res.status(401).json({ error: "Credenciales incorrectas." });
            }

            res.status(200).json({ message: "Inicio de sesión exitoso", user });

        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    #validateLoginFields({ email, password }) {
        return !!(email && password);
    }

    addUser = async (req, res)  => {
        try {
            const { name, lastname, email, dni, role, telephone } = req.body;

            if (!this.#validateNewUserFields({ name, lastname, email, dni, role, telephone })) {
                return res.status(400).json({ error: "Todos los campos son obligatorios." });
            }

            const user = await this.service.addUser(name, lastname, email, dni, role, telephone);
            
            if(!user) {
                return res.status(400).json({ error: "El email ya está registrado." });
            }

            res.status(201).json({ message: "Usuario agregado con éxito", user });

        } catch (error) {
            console.error("Error en addUser:", error);
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    #validateNewUserFields({ name, lastname, email, dni, role, telephone }) {
        return !!(name && lastname && email && dni && role && telephone);
    }

    getUsers = async (req, res) => {
        try {
            const { id } = req.params;

            const users = await this.service.getUsers(id);

            if (this.#isEmptyResult(users)) {
                return res.status(400).json({ error: "Usuario no encontrado." });
            }

            res.status(201).json({ message: id? "Usuario encontrado con éxito" : "Usuarios obtenidos con éxito.", users });

        } catch (error) {
            console.error("Error en getUsers:", error);
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    #isEmptyResult(result) {
        return !result || (Array.isArray(result) && result.length === 0);
    }

    editUser = async (req, res) => {
        try {
        const { id } = req.params;
        const { name, lastname, email, dni, telephone } = req.body;

        if (!this.#validateEditableFields({ name, lastname, email, dni, telephone })) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        const updateUser = await this.service.editUser(id, {
            name, 
            lastname, 
            email, 
            dni, 
            telephone
        });

        if (!updateUser) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        res.status(200).json({ message: "Usuario actualizado con éxito", user: updatedUser });

        } catch (error) {
            console.error("Error en editUser:", error);
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    #validateEditableFields({ name, lastname, email, dni, telephone }) {
        if (!name || !lastname || !email || !dni || !telephone) {
            return false;
        }
        return true;
    }

    deleteUser = async (req, res) => {
        try {
        const { id } = req.params;

        const userDelete = await this.service.deleteUser(id);

        if (!userDelete) {
            return res.status(404).json({ error: "El usuario no fue encontrado o ya fue eliminado." });
        }

        res.status(200).json({ message: "Usuario eliminado con éxito.", userDelete });

        } catch (error) {
            console.error("Error en deleteUser:", error);
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}

export default UserController;