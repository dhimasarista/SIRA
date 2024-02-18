const knex = require("../config/knex");

class AnggotaModel {
    constructor() {
      // Kosongkan konstruktor karena tidak memerlukan inisialisasi khusus
    }
  
    async addAnggota(nik, noAnggota, namaLengkap, gelar, tempatLahir, tanggalLahir, fotoKtp, pasFoto, alamat) {
      try {
        const newAnggota = await knex('keanggotaan').insert({
          nik,
          no_anggota: noAnggota,
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

    async findAll(){
        try {
            const users = await knex.select("*").from("keanggotaan").whereNot("id", 1);
            return users;
        } catch (error) {
            throw error;
        }
    }
  
    async getAnggotaByNIK(nik) {
      try {
        const anggota = await knex('keanggotaan').where('nik', nik).first();
        return anggota;
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = AnggotaModel;