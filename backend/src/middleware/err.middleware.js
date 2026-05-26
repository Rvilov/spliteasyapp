export const middlewareError = async (err, req, res, next) => {
  try {
    const status = err.status || 500;
    const message = err.message || "Error en el servidor";
    res.status(status).json({ message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
