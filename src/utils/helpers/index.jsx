Array.prototype.findById = function (id) {
    return this.find(el => el.id === id)
}