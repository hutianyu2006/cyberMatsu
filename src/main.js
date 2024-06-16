import planck from "planck/with-testbed"

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").style.display = "none";
    let world = planck.World(
        {
            "gravity": new planck.Vec2(0, -10)
        }
    );
    let platform = world.createBody(
        {
            type: "static",
            position: new planck.Vec2(0.0, -20.0),
            angle: 0.0
        }
    );
    platform.createFixture(
        {
            shape: new planck.Edge(new planck.Vec2(-100, 0), new planck.Vec2(+100, 0)),
            restitution: 0.2
        }
    );
    let barrier1 = world.createBody(
        {
            type: "static",
            position: new planck.Vec2(-100.0, -10.0),
            angle: 0.0
        }
    );
    barrier1.createFixture(
        {
            shape: new planck.Edge(new planck.Vec2(0, 0), new planck.Vec2(0, 100)),
            restitution: 0.2
        }
    );
    let barrier2 = world.createBody(
        {
            type: "static",
            position: new planck.Vec2(100.0, -10.0),
            angle: 0.0
        }
    );
    barrier2.createFixture(
        {
            shape: new planck.Edge(new planck.Vec2(0, 0), new planck.Vec2(0, 100)),
            restitution: 0.2
        }
    );
    let coin = world.createBody(
        {
            type: "dynamic",
            position: new planck.Vec2(1, 28.0+Math.random()*4),
            angle: Math.random() * Math.PI,
        }
    );
    coin.createFixture(
        {
            shape: new planck.Box(2, 0.05),
            density: 8,
            friction: 0.6,
            restitution: 0.2
        }
    );
    let coin2 = world.createBody(
        {
            type: "dynamic",
            position: new planck.Vec2(-1, 28.0 + Math.random() * 4),
            angle: Math.random() * Math.PI,
        }
    );
    coin2.createFixture(
        {
            shape: new planck.Box(2, 0.05),
            density: 8,
            friction: 0.6,
            restitution: 0.2
        }
    );
    coin.setAngularVelocity((Math.random()*5) * Math.PI);
    coin2.setAngularVelocity((-Math.random()*5) * Math.PI);
    let waitForResult = new Promise((resolve) => {
        let interval = setInterval(() => {
            if (coin.getLinearVelocity().y != 0 || coin.getLinearVelocity().x != 0 || coin.getAngularVelocity() != 0 || coin2.getLinearVelocity().y != 0 || coin2.getLinearVelocity().y != 0 || coin2.getAngularVelocity() != 0) {
                return;
            }
            let results = [];
            let result = false;
            if (Math.round(coin.getAngle() % (2 * Math.PI) * (180 / Math.PI)) == 0 || Math.round(coin.getAngle() % (2 * Math.PI) * (180 / Math.PI)) == 360) {
                results[0] = true;
            }
            else if (Math.round(coin.getAngle() % (2 * Math.PI) * (180 / Math.PI)) == 180) {
                results[0] = false;
            }
            if (Math.round(coin2.getAngle() % (2 * Math.PI) * (180 / Math.PI)) == 0 || Math.round(coin2.getAngle() % (2 * Math.PI) * (180 / Math.PI)) == 360) {
                results[1] = true;
            }
            else if (Math.round(coin2.getAngle() % (2 * Math.PI) * (180 / Math.PI)) == 180) {
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
    let testbed = planck.Testbed.mount();
    testbed.start(world);
    waitForResult.then((result) => {
        localStorage.setItem("result", result);
        window.location.href = window.location.origin + "/result.html";
    });
});