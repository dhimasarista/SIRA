const UserModel = require("../app/models/user_model");
const user = new UserModel();

// Unit Test menggunakan Jest
const test = async () => {
    const data = await user.getUserByUsername("admin");
    console.log(data["password"]);
}

test();