const express = require("express");
const app = express();
const cors = require('cors');

class SequentialActionManager {
    constructor() {
        this.actions = [];
    }
    submitAction(action) {
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

app.listen(16201, () => {
 console.log("Server running on port 16201");
});
