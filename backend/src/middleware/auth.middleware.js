import jwt from "jsonwebtoken";

export const middlewareAuth = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    if (bearer !== undefined) {
      //cuando no hay token devueve undefined , por eso la condicion

      const validtoken = jwt.verify(
        bearer.split(" ")[1],
        process.env.JWT_SECRET,
      );

      req.user = validtoken; // Podemos aqui acceder como objeto
      next();
    } else {
      res.status(401).json({ message: "No hay token" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en la autenticacion" });
  }
};
