import express from "express"
import UserRoute from "./routes/userRoute";

const app = express.app();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/route/user', new UserRoute().start());
//app.use('', );

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`Server listening on. http://localhost:${PORT}`));

server.on('error', error  => console.log(`Error in server, ${error.message}`));