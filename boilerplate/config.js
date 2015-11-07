var servers = {
	LOCAL: "localhost",
	LAN: "",
	DEVELOPMENT: "",
	PRODUCTION: ""
};

module.exports = {
	CONDUX_SERVER: servers.LOCAL,
	API_SERVER: servers.LOCAL,
	PORT: process.env.PORT || 3030
};
