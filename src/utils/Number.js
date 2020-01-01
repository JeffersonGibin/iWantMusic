
module.exports.formatNumber = (number) => {
    let n = parseFloat(number)

    return !isNaN(n) && n.toFixed(2)
}