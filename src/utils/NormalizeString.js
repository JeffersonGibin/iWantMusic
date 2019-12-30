
module.exports.normalizeString = (arg) => {
    const str = arg || ''
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}