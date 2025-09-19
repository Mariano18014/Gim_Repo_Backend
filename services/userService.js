

class UserService {
    constructor () {
        this.model = new UserModel();
        this.validRoles = ["coach", "manager", "user"];
    }

    login = async ( email, password ) => {
        try {
            const user = await this.model.login( email, password );

            if (!user) {
                return null;
            }

            const passwordValid = user.password == password;

            if (!passwordValid) {
                return null;
            }

            const { password: _, ...userWithoutPassword } = user;

            return userWithoutPassword;
        } catch (error) {
            console.error("Error en UserService.login:", error);
            throw error;
        }
    }

    addUser = async ( name, lastname, email, dni, role, telephone ) => {
        const emailIsTaken = await this._isEmailTaken(email);
        if (emailIsTaken) {
            return null;
        }

        this._validateRole(role);

        const newUser = await this.model.create({
            name,
            lastname,
            email,
            dni,
            role,
            telephone
        });

        return newUser;
    }

    _isEmailTaken = async (email) => {
        const existingUser = await this.model.findByEmail(email);
        return !!existingUser; // true si ya existe, false si no
    }

    _validateRole = (role) => {
        if (!this.validRoles.includes(role)) {
            throw new Error("Rol inválido");
        }
    }
    
    getUsers = async ( id = null ) => {
        if (id) {
            const user = await this.model.findById();
            return user;
        } else {
            const users = await this.model.findAll();
            return users;
        }
    }
    
    editUser = async (id, updatedData) => {
        const existingUser = await this.model.findById(id);
            if (!existingUser) {
                return null;
            }

        const filteredData = this.#filterEditableFields(updatedData);

        if (filteredData.email && filteredData.email !== existingUser.email) {
            await this.#validateUniqueEmail(filteredData.email);
        }

        const updatedUser = await this.model.update(id, filteredData);
        return updatedUser;
    };

    #filterEditableFields(data) {
        const editableFields = ["name", "lastname", "email", "dni", "telephone"];
        const filteredData = {};
                for (const field of editableFields) {
                    if (data[field]) {
                        filteredData[field] = data[field];
                    }
                }
            return filteredData;
        }

    async #validateUniqueEmail(email) {
        const emailTaken = await this.model.findByEmail(email);
        if (emailTaken) { 
            throw new Error("El email ya está registrado.");
        }
    }

    deleteUser = async (id) => {
        const existingUser = await this.model.findById(id);
        if (!existingUser) {
            return null;
        }

        const deletedUser = await this.model.delete(id);
        return deletedUser;
    };

}

export default UserService;