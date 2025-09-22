import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos
    process.env.DB_USER, // Usuario
    process.env.DB_PASSWORD, // Contraseña
    {
        host: process.env.DB_HOST,
        dialect: "mssql",
        port: process.env.DB_PORT || 1433, // Puerto por defecto SQL Server
        logging: false,
        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true, // Para dev local
            },
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

// Probar conexión
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conectado a la base de datos SQL Server con Sequelize");
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error);
    }
})();

export default sequelize;