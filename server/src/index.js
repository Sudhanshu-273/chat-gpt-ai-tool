const { response } = require("express");
const express = require("express");
const cors = require("cors");
const path = require('path');

const OPENAI_API_KEY = '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';

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



// openai.listEngines().then((response) => {
//     console.log(response);
// });





const app = express();

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.use(cors());

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({
        message: "pong"
    })
})


app.post("/chat", (req, res) => {
    const question = req.body.question;

    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
    }).then((response) => {
        console.log({response});
        return response?.data?.choices?.[0]?.text;
    }).then((answer) => {
        console.log({answer});
        const array = answer?.split("\n").filter((value) => value).map((value) => value.trim());
        return array;

    }).then((answer) => {
        res.json({
            answer: answer,
            prompt: question,
        })
    })


    console.log({ question })

})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
