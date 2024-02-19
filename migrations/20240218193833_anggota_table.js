/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('keanggotaan', function(table) {
      table.increments('id').primary(); // Kolom ID sebagai primary key
      table.string('nik'); // Kolom NIK sebagai integer
      table.string('no_anggota'); // Kolom No. Anggota sebagai integer
      table.string('nama_lengkap'); // Kolom Nama Lengkap sebagai string
      table.string('gelar'); // Kolom Gelar sebagai string
      table.string('tempat_lahir'); // Kolom Tempat Lahir sebagai string
      table.date('tanggal_lahir'); // Kolom Tanggal Lahir sebagai tanggal
      table.binary('foto_ktp'); // Kolom Foto KTP sebagai binary/blob
      table.binary('pas_foto'); // Kolom Pas Foto sebagai binary/blob
      table.string('alamat'); // Kolom Alamat sebagai string
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Kolom created_at dengan nilai default saat ini
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // Kolom updated_at dengan nilai default saat ini
      table.timestamp('deleted_at').nullable(); // Kolom deleted_at dengan nilai nullabel
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('keanggotaan'); // Menghapus tabel jika sudah ada
  };
  