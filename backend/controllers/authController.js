import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  console.log("🔁 Register API hit");

  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });
    await user.save();

    // Generate JWT token (just like in login)
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return token and user info
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', err });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // ⬇️ Add role to JWT payload
    const token = jwt.sign(
  { id: user._id, name: user.name, role: user.role }, // <-- Include role
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

res.json({
  token,
  user: {
    id: user._id,
    name: user.name,
    role: user.role // <-- Include role in response
  }
});

  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

