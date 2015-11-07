import conduxAdminClient from './client.js';

var adminActions = conduxAdminClient.createActions([
	"actionA",
	"actionB",
	"actionC",
	"actionD"
]);

export default adminActions;
