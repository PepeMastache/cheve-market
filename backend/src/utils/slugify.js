// backend/src/utils/slugify.js
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')                   // elimina acentos
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')        // reemplaza todo lo que no sea alfanumérico por guiones
    .replace(/^-+|-+$/g, '')            // quita guiones al inicio y final
    .substring(0, 30);                  // máximo 30 caracteres
}

module.exports = { slugify };
