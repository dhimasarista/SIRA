/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); // Kolom ID sebagai primary key
      table.string('username').unique(); // Kolom Username sebagai string unik
      table.string('passowrd').unique();
      table.integer('anggota_id').unsigned(); // Kolom anggota_id sebagai integer unsigned
      table.foreign('anggota_id').references('id').inTable('keanggotaan'); // Kunci asing ke tabel anggota
      table.boolean('is_user').defaultTo(true); // Kolom is_user sebagai boolean default true
      table.boolean('is_superuser').defaultTo(false); // Kolom is_superuser sebagai boolean default false
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
    return knex.schema.dropTableIfExists('users'); // Menghapus tabel jika sudah ada
  };
  