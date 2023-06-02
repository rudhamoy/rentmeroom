import { connect, connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

connection.on('connected', () => {
  console.log('MongoDB connected');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

export default connectDB;
