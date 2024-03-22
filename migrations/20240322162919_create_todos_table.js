
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.table('todos', (table) => {
        table.enum('priority', ['low', 'normal', 'high']).defaultTo('low');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.table('todos', (table) => {
        table.dropColumn('priority');
    });
};
