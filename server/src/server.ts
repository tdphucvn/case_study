if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: '.env'});
};

const PORT: string | number = process.env.PORT || 5000;
 
import express, {Application} from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// import path from 'path';

const app: Application = express();

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


import noteRoutes from './routes/noteRoutes';

app.use('/api/v1/note', noteRoutes);

// app.use(express.static(path.join(__dirname, 'build')))

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const uri: string = `${process.env.DB_CONNECTION}`;
mongoose.connect(uri).then(() => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}).catch (err => {
    console.log('Access denied');
    console.error(err);
});