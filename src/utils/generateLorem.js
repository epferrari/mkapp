var lorem = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in enim a risus gravida tincidunt. Phasellus tempus purus odio, sed pulvinar nibh interdum at. Integer pellentesque dignissim erat, at luctus elit congue a. Cras orci ipsum, finibus at pellentesque eu, tristique ac ligula. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ornare, erat non semper pharetra, nibh orci tempor turpis, vitae placerat lacus mauris sed augue. Sed venenatis at tortor rhoncus semper. Suspendisse potenti.",
	"Cras justo sem, tempus eu varius et, posuere ac ligula. Cras mauris eros, tempus vel augue et, facilisis placerat urna. Maecenas leo nulla, vestibulum tempus leo id, auctor dapibus nisi. Aenean nec vehicula leo. Ut varius risus eu tellus congue ullamcorper. Vivamus ut sagittis odio. Sed ac felis vestibulum, ultrices augue quis, porttitor purus. In nisl felis, commodo eu imperdiet id, porttitor quis mauris. Quisque condimentum consectetur tortor lacinia consectetur. Donec aliquet venenatis nisl eget ullamcorper. Sed at vulputate arcu, vitae mollis sapien. Quisque vitae leo non nisl tincidunt pretium non a magna.",
	"Curabitur velit purus, lobortis elementum suscipit sed, luctus id ipsum. Donec ornare, sem vel congue molestie, sapien neque volutpat nisl, eget sodales magna est ut ligula. Morbi eu dolor bibendum, semper purus in, ullamcorper sapien. Proin tincidunt lectus sit amet sollicitudin sodales. Aliquam et mauris molestie, condimentum velit bibendum, fermentum erat. Aliquam facilisis nulla massa, vel vulputate erat semper mattis. Sed mollis turpis non maximus lobortis. Donec sed tortor sem.",
	"Morbi euismod diam elit, vel sodales eros congue ornare. Integer dignissim est eget diam laoreet tincidunt. Nullam hendrerit convallis sollicitudin. Morbi molestie volutpat ipsum, quis vestibulum tortor ornare at. Etiam dapibus porttitor nunc at fringilla. Nulla facilisi. Pellentesque tempor finibus elit a venenatis. Donec diam tellus, bibendum eget diam quis, auctor porta sapien.",
	"Suspendisse vitae augue sed risus tristique malesuada non vitae mauris. Nam auctor, neque vel convallis viverra, orci tortor commodo augue, at dapibus ante libero in libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam in consectetur ipsum, vel convallis libero. Integer et rutrum nunc. Sed mollis id tellus at condimentum. Integer sit amet odio tincidunt, tincidunt ligula at, suscipit lorem. Vivamus finibus sodales luctus. Nullam et iaculis eros. Sed vulputate, sapien sit amet efficitur tempus, erat augue auctor enim, at viverra nibh sem sit amet lectus. Maecenas fringilla lobortis dui, porta rhoncus ex. Sed volutpat maximus purus in vestibulum."
];

export default function(n){
	let a = [];
	while(n--){
		a.push('<p>' + lorem[n % 5 + 1] + '</p>');
	}
	return a.join('');
}
