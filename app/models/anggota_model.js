const knex = require("../config/knex");

class AnggotaModel {
    constructor() {
      // Kosongkan konstruktor karena tidak memerlukan inisialisasi khusus
    }
  
    async addAnggota(nik, namaLengkap, gelar, tempatLahir, tanggalLahir, fotoKtp, pasFoto, alamat) {
      try {
        const lastId = await this.lastID()
        const newAnggota = await knex('keanggotaan').insert({
          id: lastId[0]["id"] + 1,
          nik,
          no_anggota: nik,
          nama_lengkap: namaLengkap,
          gelar,
          tempat_lahir: tempatLahir,
          tanggal_lahir: tanggalLahir,
          foto_ktp: fotoKtp,
          pas_foto: pasFoto,
          alamat
        });
        return newAnggota;
      } catch (error) {
        throw error;
      }
    }

    async lastID(){
      try {
        const lastId = await knex("keanggotaan").max({id: "id"});
        return lastId;
      } catch (error) {
        throw error;
      }
    }

    async findAll(){
        try {
            const users = await knex.select("*").from("keanggotaan").whereNot("id", 20000);
            return users;
        } catch (error) {
            throw error;
        }
    }
  
    async getAnggotaByID(id) {
      try {
        const anggota = await knex('keanggotaan').where('id', id).where("deleted_at", null).first();
        return anggota;
      } catch (error) {
        throw error;
      }
    }
    
    async checkNIK(nik){
      try {
        const results = await knex("keanggotaan").where("nik", nik)
        return results.length > 0;
      } catch (error) {
        throw error;
      }
    }

    async softDelete(id){
      try {
        const idToDelete = await knex("keanggotaan").update("deleted_at", new Date().getDay())
        return idToDelete;
      } catch (error) {
        throw error;
      }
    }
    async hardDelete(id){
      try {
        const idToDelete = await knex("keanggotaan").delete().where("id", id);
        return idToDelete;
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = AnggotaModel;