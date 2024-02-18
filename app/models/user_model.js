const knex = require("../config/knex");

class UserModel {
    constructor() {
      // Kosongkan konstruktor karena tidak memerlukan inisialisasi khusus
    }
  
    async addUser(username, anggotaId, isUser = true, isSuperuser = false) {
      try {
        const newUser = await knex('users').insert({
          username,
          anggota_id: anggotaId,
          is_user: isUser,
          is_superuser: isSuperuser
        });
        return newUser;
      } catch (error) {
        throw error;
      }
    }

    async findAll(){
        try {
            const user = (await knex("users")).find()
            return user;
        } catch (error) {
            throw error;
        }
    }
  
    async getUserByUsername(username) {
      try {
        const user = await knex('users').where('username', username).first();
        return user;
      } catch (error) {
        throw error;
      }
    }
  }

  module.exports = UserModel;
