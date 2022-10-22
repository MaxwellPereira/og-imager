// server.js
require("dotenv").config();
const express = require("express");
const generateImage = require("./utils/generateImage");
const { getCompiledHTML } = require("./utils/compileTemplate");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { symplaApi } = require("./services/sympla-api");

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.get("/teste", async (req, res) => {
  const {
    data: {
      data,
      pagination: { total_page },
    },
  } = await symplaApi.get(`/events/1606667/participants`, {
    params: {
      fields: "id",
      page_size: 200,
    },
  });

  if (total_page === total_page) {
    console.log("sss");
  }

  const promises = [...Array(total_page + 1).keys()]
    .filter((n) => n > 0)
    .map((page) => {
      return symplaApi.get(`/events/1606667/participants`, {
        params: {
          page_size: 200,
          page,
        },
      });
    });

  const resolve = await Promise.all(promises);

  res.json({ resolve });
});

app.get("/imgs/:id/ticket", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      data: { data },
    } = await symplaApi.get(`/events/1606667/participants/ticketNumber/${id}`);
    const numberId = data.id - 118790000;
    console.log(numberId);
    const zeroString = [...Array(9 - numberId.toString().length).keys()].reduce(
      (n, c) => n + "0",
      [""]
    );
    const compiledHTML = getCompiledHTML({
      title: `${data.first_name} ${data.last_name}`,
      ticketNumber: `#${zeroString}${numberId}`,
    });

    res.statusCode = 200;

    res.setHeader("Content-Type", `text/html`);
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    );
    res.end(compiledHTML);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error!");
  }
});

app.get("/imgs/:id/ticket.png", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      data: { data },
    } = await symplaApi.get(`/events/1606667/participants/ticketNumber/${id}`);
    const numberId = data.id - 118790000;
    console.log(numberId);
    const zeroString = [...Array(9 - numberId.toString().length).keys()].reduce(
      (n, c) => n + "0",
      [""]
    );
    const compiledHTML = getCompiledHTML({
      title: `${data.first_name} ${data.last_name}`,
      ticketNumber: `#${zeroString}${numberId}`,
    });

    const image = await generateImage({
      width: req.query.width,
      height: req.query.height,
      content: compiledHTML,
    });

    res.statusCode = 200;

    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    );
    res.end(image);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error!");
  }
});

app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
