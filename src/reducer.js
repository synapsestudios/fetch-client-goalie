module.exports = (state = false, action) => action.type === 'REQUIRE_UPDATE' ? true : state;
