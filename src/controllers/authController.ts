import { Request, Response } from 'express';
import { encrypt, decrypt } from '../config/encryption';
import { supabase } from '../config/supabase';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const uniqueid = req.body.uniqueid || 'JFKlnUZyyu0MzMbl';
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);

  try {
    const { message } = req.body;
    const decrypted = decrypt(message);
    const payload = JSON.parse(decrypted);

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', payload.email)
      .single();

    const isValidPassword = data && await bcrypt.compare(payload.password, data.password);

    if (error || !data || !isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const responsePayload = JSON.stringify({
      token: uuidv4(),
      email: data.email,
      name: data.name
    });

    const encryptedMessage = encrypt(responsePayload);

    res.json({
      uniqueid,
      timestamp,
      code: '200',
      message: encryptedMessage
    });
  } catch (err) {
    const encryptedError = encrypt('Login failed');

    res.status(500).json({
      uniqueid,
      timestamp,
      code: '500',
      message: encryptedError
    });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const uniqueid = req.body.uniqueid || 'JFKlnUZyyu0MzMbl';
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);

  try {
    const { message } = req.body;
    const decrypted = decrypt(message);
    const payload = JSON.parse(decrypted);

    const { name, email, password, birthdate  } = payload;

    if (!email || !password || !name || !birthdate ) {
      throw new Error('Missing required fields');
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from('users').insert([{
      name,
      email,
      password: hashedPassword,
      birthdate
    }]);

    if (error) throw error;

    const responsePayload = JSON.stringify({
      message: 'Register successful',
      email
    });

    const encryptedMessage = encrypt(responsePayload);

    res.json({
      uniqueid,
      timestamp,
      code: '200',
      message: encryptedMessage
    });
  } catch (err) {
    console.error('Register error:', err);
    const encryptedError = encrypt('Register failed');

    res.status(500).json({
      uniqueid,
      timestamp,
      code: '500',
      message: encryptedError
    });
  }
};
