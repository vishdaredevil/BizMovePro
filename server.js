const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(bodyParser.json());
const dbURI='mongodb://localhost:27017/bizmovepro';;
mongoose.connect(dbURI)
    .then(()=> console.log('MongoDB connected'))
    .catch(err=> console.error('MongoDB connection error:', err));
const quoteSchema=new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    service: String,
    message: String,
    date:{type:Date ,default: Date.now}});
const bookingSchema=new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    service: String,
    message: String,
    date:{type:Date ,default: Date.now}});
const Quote=mongoose.model('Quote', quoteSchema);
const Booking=mongoose.model('Booking', bookingSchema);

app.get('/', (req, res) => {
    res.send('BizMovePro Backend is running');
});
app.post('/api/quote', (req, res) => {
    const newQuote = new Quote(req.body);
    newQuote.save()
        .then(() => res.status(200).json({ message: 'Quote created successfully' }))
        .catch(err => res.status(400).json({ error: 'Error creating quote' }));
});
app.post('/api/booking', (req, res) => {
  const newBooking = new Booking(req.body);
  newBooking.save()
    .then(() => res.status(200).json({ message: 'Booking received!' }))
    .catch(err => res.status(400).json({ error: 'Error saving booking.' }));
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user and hash password
        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
});
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check for user and password
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Create and return a JWT
        const payload = { userId: user.id };
        const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

