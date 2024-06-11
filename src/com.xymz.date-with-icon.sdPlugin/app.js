/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const myAction = new Action('com.xymz.icon-with-date.action');

myAction.onWillAppear(({ action, context, device, payload }) => {
	update(context);
});

myAction.onKeyUp(({ action, context, device, event, payload }) => {
	let url = payload["settings"]["url"];
	$SD.openUrl(url);
});

function update(context) {
	const svg = makeDateSvg();
	const icon = `data:image/svg+xml;base64,${btoa(svg)}`;
	$SD.setImage(context, icon);
}

function makeDateSvg() {
	const today = new Date();
	const day = String(today.getDate()).padStart(2, '0');

	const w = 100;
	const h = 100;
	const r = w / 2;
	const fontSize = 60;
	const fontFamily = 'Roboto, Noto Sans KR,Helvetica, Arial, sans-serif';
	const textColor = '#FFFFFF';

	const dateStr = `${day}`;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
			<rect width="100%" height="100%" fill="none" />
			<text x="${r}" y="${h / 1.45}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
					${dateStr}
			</text>
	</svg>`;
}
