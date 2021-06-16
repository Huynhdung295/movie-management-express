const express = require("express");
const app = express();

app.use(express.json());

const port = 3000;
const err = "Not Found!";
// Set data JSON

// Data movie
let dataMovie = [
  {
    id: "1",
    name: "Ối Trời Ơi! Chuyến Phiêu Lưu Đầy 'Thú' Vị...",
    totalMovieTime: "86 phút",
    poster:
      "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster-2_1_.jpg",
    trailer: "https://youtu.be/wB5wCPQh0OI",
  },
  {
    id: "2",
    name: "TURU: Gà Tây Mê Quẩy",
    totalMovieTime: "79 phút",
    poster:
      "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_ga_tay_me_quay_9_1_.jpg",
    trailer: "https://youtu.be/Nwu5deGbHAs",
  },
];
// Movie management
// ----------------- Get list movies
app.get("/get-list", (req, res) => {
  if (dataMovie) {
    res.status(200).send(dataMovie);
  } else {
    res.status(404).send(err);
  }
});
// ----------------- Add movie
app.post("/", (req, res) => {
  const { name, totalMovieTime, poster, trailer } = req.body;
  const dataNewMovie = {
    id: Math.random().toString(),
    name,
    totalMovieTime,
    poster,
    trailer,
  };
  console.log(req.body);
  dataMovie = [...dataMovie, dataNewMovie];
  res.status(201).send(dataNewMovie);
});
// ----------------- Get detail movie
app.get("/get-detail/:id", (req, res) => {
  const { id } = req.params;
  const detail = dataMovie.find((movie) => movie.id === id);
  if (detail) {
    res.status(200).send(detail);
  } else {
    res.status(404).send(err);
  }
});
// ----------------- Update movie
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, totalMovieTime, poster, trailer } = req.body;
  const index = dataMovie.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    const dataOldMovie = dataMovie[index];
    const updateMovie = {
      ...dataOldMovie,
      name,
      totalMovieTime,
      poster,
      trailer,
    };
    dataMovie[index] = updateMovie;
    res.status(200).send(updateMovie);
  } else {
    res.status(404).send(err);
  }
});
// ----------------- Delete movie
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = dataMovie.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    const deleteMovie = dataMovie[index];
    dataMovie.splice(index, 1);
    res.status(200).send(deleteMovie);
  } else {
    res.status(404).send(err);
  }
});



app.listen(port, () => {
  console.log(`Port ${port} loading...`);
});
