import planck from "planck/with-testbed"

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").style.display = "none";
    let world = planck.World(
        {
            "gravity": new planck.Vec2(0, -9.8015)
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
            restitution: 0.6
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
            restitution: 0.6
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
            restitution: 0.6
        }
    );
    let coin = world.createBody(
        {
            type: "dynamic",
            position: new planck.Vec2(1.0, 10.0),
            angle: 0.0,
        }
    );
    coin.createFixture(
        {
            shape: new planck.Box(2, 0.05),
            density: 8.2,
            friction: 0.4,
            restitution: 0.6
        }
    );
    let coin2 = world.createBody(
        {
            type: "dynamic",
            position: new planck.Vec2(-1.0, 20.0),
            angle: 0.0,
        }
    );
    coin2.createFixture(
        {
            shape: new planck.Box(2, 0.05),
            density: 8.2,
            friction: 0.4,
            restitution: 0.6
        }
    );
    coin.setLinearVelocity(new planck.Vec2(Math.random() * 2 + 5, 0));
    coin.setAngularVelocity((5 + Math.random()) * Math.PI);
    coin2.setLinearVelocity(new planck.Vec2(Math.random() * 2 - 5, 0));
    coin2.setAngularVelocity((-5 - Math.random()) * Math.PI);
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