const db = require("../data/db-config");

module.exports = {
    find,
    findById,
    findSteps,
    add
}

function find() {
    return db('schemes');
}

function findById(id){
    return db('schemes')
        .where({ id })
        .first();
}

function findSteps(id){
    return db('schemes as s')
        .join("steps as st", "s.id", "st.scheme_id")
        .select("st.id", "s.scheme_name", "st.step_number", "st.instructions")
        .where({ scheme_id: id });
}

function add(updatedScheme){
    return db('schemes')
        .insert(updatedScheme)
        .then(([id]) => findById(id))
}