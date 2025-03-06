const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../middlewares/jwt")
const userService = require("../services/userService");
const { token } = require("morgan");

//createUser es el Register - http://localhost:3001/api/user/register
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = await createAccessToken({ id: user._id })
    res.cookie("token", token) //establezco una cookie en la respuesta,lo guarda en las cookies del navegador, y desde el front lo recupero como "token"
    // distints formas de devolver respuesta
    return res.json({
      // id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
    // res.json({
    //   message:"User creates successfully"
    // })
    // return res.status(201).json(user); -> antes de devolverlo, genero el token con jwt
  } catch (error) {
    return res.status(500).json({ messageCreateUser: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.id);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  console.log(password)
  try {
    // Verifico si el usuario existe en la base de datos
    const user = await userService.getUserByEmail(email);
    if (!user) return res.status(401).json({ message: "User not found", error: true });

    // El usuario existe -> Verifico si la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    //bcrypt.compare -> devuelve true/false //console.log(password) -> es un requestId:"sdsdsd" , signal:{}
    if (!isMatch) return res.status(401).json({ message: "Incorrect password", error: true });

    // Crear y devolver token JWT
    const token = await createAccessToken({ id: user._id })
    res.cookie("token", token)
    return res.json({
      // id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
    // const token = jwt.sign(
    //   { userId: user._id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1d" }
    // );
    //3h /1d  es la duración del token
    //console.log(res.status(200).json({ token })) .text o .send tb manda la info  (TCP unidireccional)
    // return res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  //y como lo redirecciono a que entre a la app ??
  //usar Redux acá
};

const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

const updatePassword = async (req, res) => {
  const { id, password } = req.params;
  try {
    await userService.updatePassword(id, password);
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//sirve para validar el perfil del usuario, a ver si sigue logeado y es auténtico
const profile = async (req, res) => {
  // res.status(500).json({message:"dentro de profile"})
  // console.log(req.user)
  const userFound = await userService.getUserById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "In Profile, user not found." })
  return res.json({
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt:userFound.updatedAt
  })
}
module.exports = {
  createUser,
  getUsers,
  getUserById,
  login,
  logout,
  updatePassword,
  deleteUser,
  profile
};
