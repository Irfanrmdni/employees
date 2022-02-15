/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('employees', function (table) {
        table.increments('id_employee', 6).notNullable();
        table.integer('nip', 10).notNullable();
        table.string('name', 55).notNullable();
        table.string('tempat_lahir').notNullable();
        table.date('tanggal_lahir').notNullable();
        table.enu('jenis_kelamin', ['pria', 'wanita']).defaultTo('pria').notNullable();
        table.enu('status_nikah', ['menikah', 'belum menikah']).defaultTo('belum menikah').notNullable();
        table.enu('agama', ['islam', 'katolik', 'hindu', 'buddha', 'konghucu', 'protestan']).defaultTo('islam').notNullable();
        table.string('telepon', 12).notNullable();
        table.text('alamat').notNullable();
        table.timestamps(true, true);

        table.primary('id_employee');
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('employees');
};
