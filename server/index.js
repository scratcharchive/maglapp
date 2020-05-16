
const fs = require('fs');
const express = require("express");
const app = express();
const cors = require('cors');
const util = require('util');

let somethingChanged = false;
class SequentialActionManager {
    constructor() {
        this.actions = [];
    }
    submitAction(action) {
        somethingChanged = true;
        this.actions.push(action);
    }
    retrieveActions(startIndex) {
        return this.actions.slice(startIndex);
    }
}
const globalSequentialActionManager = new SequentialActionManager();

app.use(express.json())
app.use(cors());

app.get('/probe', async (req, res) => {
    await sleepMsec(1000);
    res.json({ success: true });
});

app.post('/submitSequentialAction', async (req, res) => {
    const reqData = req.body;
    globalSequentialActionManager.submitAction(reqData.action);
    res.json( {success: true} );
})

app.post('/retrieveSequentialActions', async (req, res) => {
    const reqData = req.body;
    const timer = new Date();
    while (true) {
        const actions = globalSequentialActionManager.retrieveActions(reqData.startIndex);
        if (actions.length > 0) {
            res.json( {success: true, actions: actions} );
            return;
        }
        const elapsed = (new Date()) - timer;
        if (elapsed > (req.timeoutMsec || 1000)) {
            res.json( {success: true, actions: []} );
            return;
        }
        await sleepMsec(500);
    }
})

function sleepMsec(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);
    let actions;
    try {
        actions = JSON.parse(await readFile(process.env.ACTIONS_FILE));
    }
    catch(err) {
        console.error('Error loading actions file.');
        actions = [];
    }
    for (let action of actions) {
        globalSequentialActionManager.submitAction(action);
    }
    app.listen(16201, () => {
       console.log("Server running on port 16201");
    });
    while (true) {
        // save every 10 seconds
        const actions = globalSequentialActionManager.retrieveActions(0);
        if (somethingChanged) {
            await writeFile(process.env.ACTIONS_FILE, JSON.stringify(actions, null, 4));
        }
        await sleepMsec(10000);
    }
}
main();
