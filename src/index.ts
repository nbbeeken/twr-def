import * as PIXI from 'pixi.js';

PIXI.utils.skipHello();
window.scrollTo(0, 0);
const main = document.getElementById('main') as HTMLDivElement;
const app = new PIXI.Application({
	resizeTo: main,
	backgroundColor: 0x1099bb,
	resolution: window.devicePixelRatio ?? 1,
});

main.appendChild(app.view);
const graphics = new PIXI.Graphics();

graphics.beginFill(0xde3249);
graphics.drawRect(0, 0, 100, 100);
graphics.endFill();

const rectangleTexture = app.renderer.generateTexture(graphics);
const rectangle = new PIXI.Sprite(rectangleTexture);

rectangle.anchor.set(0.5);
rectangle.x = app.screen.width / 2;
rectangle.y = app.screen.height / 2;

rectangle.interactive = true;
rectangle.buttonMode = true;

let clicks = 0;
let shrink = false;
rectangle.on('pointerdown', () => {
	clicks += 1;
	if (clicks % 10 === 0) shrink = !shrink;
	rectangle.scale.x *= shrink ? 0.75 : 1.25;
	rectangle.scale.y *= shrink ? 0.75 : 1.25;
});

app.stage.addChild(rectangle);

// Listen for animate update
app.ticker.add((delta) => {
	// just for fun, let's rotate mr rabbit a little
	// delta is 1 if running at 100% performance
	// creates frame-independent transformation
	rectangle.rotation += 0.03 * delta;
});
