import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

  destination(req, file, callback) {

    callback(null, "src/uploads");

  },

  filename(req, file, callback) {

    const extensao = path.extname(file.originalname);

    const nomeArquivo =
      Date.now() + extensao;

    callback(null, nomeArquivo);
  }
});


// VALIDAR APENAS IMAGEM
const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  callback
) => {

  const tiposPermitidos = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp"
  ];

  if (tiposPermitidos.includes(file.mimetype)) {

    callback(null, true);

  } else {

    callback(new Error("Apenas imagens são permitidas"));
  }
};

export const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }

});