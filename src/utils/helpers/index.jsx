Array.prototype.findById = function (id) {
	return this.find((el) => el.id === id);
};
Array.prototype.removeById = function (id) {
	return this.filter((task) => task.id !== id);
};
