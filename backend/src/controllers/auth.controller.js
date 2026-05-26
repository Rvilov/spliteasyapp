import bcrypt from 'bcrypt';
import pool from '../db/index.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
try{
    const { name, password, email } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if(result.rows.length > 0){
        res.status(400).json({ message: 'Usuario ya existe' });
        console.log('Usuario ya existe');
    }else{
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query( 
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
         [name, email, hashedPassword]
)
        res.status(200).json({ message: 'Usuario registrado' });
        console.log('Usuario no existe, se procede a registrar');
    }
  }catch(error){
    next(error);

  }
} 

export const login = async (req, res, next) =>{
    try{
         const { name, password, email } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(result.rows.length === 0){
            res.status(400).json({ message: 'Usuario no encontrado, registrate para poder iniciar sesion' });
        }else{
            const user = result.rows[0];
           const isPasswordValid =  await bcrypt.compare(password, user.password);
            
            if(isPasswordValid){
                 const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({message:'Bienvenido', token})
               
            }else{
                res.status(400).json({message:'Credenciales invalidas'});
            }


        
        }

    }catch(error){
        next(error);
    }

}