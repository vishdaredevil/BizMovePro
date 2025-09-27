const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Moved up for cleanliness
const jwt = require('jsonwebtoken'); // Moved up for cleanliness

const app = express();
const PORT = process.env.PORT || 5000;

// =======================================================
// 1. MIDDLEWARE - MUST BE APPLIED FIRST
// =======================================================

// CORS Configuration - Allows Netlify frontend to connect
const CLIENT_ORIGIN = 'https://bizmovepro.netlify.app';

app.use(cors({
    origin: CLIENT_ORIGIN,
    // Ensure OPTIONS is included for the CORS preflight check
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', 
    credentials: true,
    optionsSuccessStatus: 204
}));

// Body Parser for handling JSON data
app.use(bodyParser.json());

// =======================================================
// 2. DATABASE CONNECTION
// =======================================================

// MongoDB connection uses the DATABASE_URL environment variable from Render
const dbURI = process.env.DATABASE_URL; 
mongoose.connect(dbURI)
    .then(()=> console.log('MongoDB connected'))
    .catch(err=> console.error('MongoDB connection error:', err));
    
// =======================================================
// 3. MONGOOSE SCHEMAS AND MODELS
// =======================================================

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
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Quote=mongoose.model('Quote', quoteSchema);
const Booking=mongoose.model('Booking', bookingSchema);
const User = mongoose.model('User', userSchema);


// =======================================================
// 4. ROUTE HANDLERS - MUST BE DEFINED BEFORE app.listen
// =======================================================

app.get('/', (req, res) => {
    res.send('BizMovePro Backend is running');
});

// Quote and Booking API Routes
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

// User Registration Route
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
        console.error('Registration error:', err);
        res.status(500).send('Server error');
    }
});

// User Login Route
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
        
        // Create and return a JWT using the environment variable secret
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Server error');
    }
});


// =======================================================
// 5. START THE SERVER - MUST BE THE LAST BLOCK
// =======================================================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
