import Box2D from "box2d.js"
import twojs from "two.js"

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").style.display = "none";
    let gravity = new Box2D.b2Vec2(0.0, -10.0);
    let world = new Box2D.b2World(gravity);
    let bdPlatform = new Box2D.b2BodyDef();
    let platform = world.CreateBody(bdPlatform);
    let shapePlatform = new Box2D.b2EdgeShape();
    shapePlatform.Set(new Box2D.b2Vec2(-100.0, 0.0), new Box2D.b2Vec2(100.0, 0.0));
    platform.CreateFixture(shapePlatform, 0.2);
    let bdBarrier1 = new Box2D.b2BodyDef();
    let barrier1 = world.CreateBody(bdBarrier1);
    let shapeBarrier1 = new Box2D.b2EdgeShape();
    shapeBarrier1.Set(new Box2D.b2Vec2(0.0, 0.0), new Box2D.b2Vec2(0.0, 100.0));
    barrier1.CreateFixture(shapeBarrier1, 0.2);
    let bdBarrier2 = new Box2D.b2BodyDef();
    let barrier2 = world.CreateBody(bdBarrier2);
    let shapeBarrier2 = new Box2D.b2EdgeShape();
    shapeBarrier2.Set(new Box2D.b2Vec2(0.0, 0.0), new Box2D.b2Vec2(0.0, 100.0));
    barrier2.CreateFixture(shapeBarrier2, 0.2);
    let bdCoin = new Box2D.b2BodyDef();
    bdCoin.set_type(Box2D.b2_dynamicBody);
    bdCoin.set_position(new Box2D.b2Vec2(1.0, 28.0 + Math.random() * 4));
    bdCoin.set_angle(Math.random() * Math.PI);
    let coin = world.CreateBody(bdCoin);
    let shapeCoin = new Box2D.b2PolygonShape();
    shapeCoin.SetAsBox(1.0, 0.05);
    coin.CreateFixture(shapeCoin, 8.0);
    let bdCoin2 = new Box2D.b2BodyDef();
    bdCoin2.set_type(Box2D.b2_dynamicBody);
    bdCoin2.set_position(new Box2D.b2Vec2(-1.0, 28.0 + Math.random() * 4));
    bdCoin2.set_angle(Math.random() * Math.PI);
    let coin2 = world.CreateBody(bdCoin2);
    let shapeCoin2 = new Box2D.b2PolygonShape();
    shapeCoin2.SetAsBox(1.0, 0.05);
    coin2.CreateFixture(shapeCoin2, 8.0);
    coin.SetAngularVelocity((Math.random() * 6) * Math.PI);
    coin2.SetAngularVelocity((-Math.random() * 6) * Math.PI);
    let waitForResult = new Promise((resolve) => {
        let interval = setInterval(() => {
            if (coin.GetLinearVelocity().get_y() != 0 || coin.GetLinearVelocity().get_x() != 0 || coin.GetAngularVelocity() != 0 || coin2.GetLinearVelocity().get_y() != 0 || coin2.GetLinearVelocity().get_y() != 0 || coin2.GetAngularVelocity() != 0) {
                return;
            }
            let results = [];
            let result = false;
            if (Math.round(coin.GetAngle() % (2 * Math.PI) * (180 / Math.PI)) == 0 || Math.round(coin.GetAngle() % (2 * Math.PI) * (180 / Math.PI)) == 360) {
                results[0] = true;
            }
            else if (Math.round(coin.GetAngle() % (2 * Math.PI) * (180 / Math.PI)) == 180) {
                results[0] = false;
            }
            if (Math.round(coin2.GetAngle() % (2 * Math.PI) * (180 / Math.PI)) == 0 || Math.round(coin2.GetAngle() % (2 * Math.PI) * (180 / Math.PI)) == 360) {
                results[1] = true;
            }
            else if (Math.round(coin2.GetAngle() % (2 * Math.PI) * (180 / Math.PI)) == 180) {
                results[1] = false;
            }
            if (results[0] && results[1]) {
                window.location.reload();
            }
            if (!results[0] && results[1]) {
                result = true;
            }
            if (results[0] && !results[1]) {
                result = true;
            }
            if (!results[0] && !results[1]) {
                result = false;
            }
            clearInterval(interval);
            resolve(result);
        }, 100);
    });
    //Make a testbed ourselves!
    let scale = 30;

    let timeStep = 1 / 60;
    let velocityIterations = 6;
    let positionIterations = 2;

    var params = {
        fullscreen: true,
    }
    var elem = document.createElement('div');
    document.body.appendChild(elem);
    var two = new twojs(params).appendTo(elem);

    elem.classList.add('bg-neutral-800');
    elem.classList.add('w-full');
    elem.classList.add('h-full');

    let twoPlatform = two.makeRectangle(window.innerWidth / 2, 930, 200 * scale, 0.05 * scale);
    twoPlatform.fill = 'white';
    twoPlatform.stroke = 'white';
    twoPlatform.linewidth = 0;
    let twoBarrier1 = two.makeRectangle(window.innerWidth / 2 - 100 * scale, window.innerHeight - 10 * scale, 0.05 * scale, 100 * scale);
    twoBarrier1.fill = 'white';
    twoBarrier1.stroke = 'white';
    twoBarrier1.linewidth = 0;
    let twoBarrier2 = two.makeRectangle(window.innerWidth / 2 + 100 * scale, window.innerHeight - 10 * scale, 0.05 * scale, 100 * scale);
    twoBarrier2.fill = 'white';
    twoBarrier2.stroke = 'white';
    twoBarrier2.linewidth = 0;
    let twoCoin1 = two.makeRectangle(coin.GetPosition().get_x() * scale + window.innerWidth / 2, window.innerHeight - coin.GetPosition().get_y() * scale, 2 * scale, 0.05 * scale);
    twoCoin1.fill = 'white';
    twoCoin1.stroke = 'white';
    twoCoin1.linewidth = 0;
    let twoCoin2 = two.makeRectangle(coin2.GetPosition().get_x() * scale + window.innerWidth / 2, window.innerHeight - coin2.GetPosition().get_y() * scale , 2 * scale, 0.05 * scale);
    twoCoin2.fill = 'white';
    twoCoin2.stroke = 'white';
    twoCoin2.linewidth = 0;
    let render = () => {
        twoCoin1.translation.set(coin.GetPosition().get_x() * scale + window.innerWidth / 2, window.innerHeight - coin.GetPosition().get_y() * scale);
        twoCoin1.rotation = coin.GetAngle();
        twoCoin2.translation.set(coin2.GetPosition().get_x() * scale + window.innerWidth / 2, window.innerHeight - coin2.GetPosition().get_y() * scale);
        twoCoin2.rotation = coin2.GetAngle();
        console.log(window.innerHeight - coin.GetPosition().get_y() * scale);
        two.update();
    }

    let animate = () => {
        world.Step(timeStep, velocityIterations, positionIterations);
        render();
        requestAnimationFrame(animate);
    }
    animate();

    waitForResult.then((result) => {
        localStorage.setItem("result", result);
        window.location.href = window.location.origin + "/result.html";
    });
});