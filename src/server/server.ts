import cors from "cors";
import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`listen port to ${PORT}`);
});
