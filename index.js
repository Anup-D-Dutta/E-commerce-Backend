import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'
import wishlistRoutes from './route/wishlistRoutes.js'

const app = express()
// app.use(cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL
// }))

// const allowedOrigins = [
//     // process.env.FRONTEND_URL,  
//     // "https://e-commerce-frontend-sand-five.vercel.app",
//     "http://localhost:5174",
//     "http://localhost:5173"

// ];

// app.use(cors({
//     credentials: true,
//     origin: allowedOrigins
// }));

const allowedOrigins = [
    "http://localhost:5173", // for local dev
    "https://e-commerce-frontend-dol5ao2cq-anup-duttas-projects.vercel.app",
    "https://e-commerce-frontend-3ce3z0mbu-anup-duttas-projects.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));


app.use(express.json())
app.use(cookieParser())
// app.use(morgan())
app.use(morgan('combined'))  // or 'dev', 'tiny'
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = 5080 || process.env.PORT

app.get("/env", (req, res) => {
    res.json({
        frontendUrl: process.env.FRONTEND_URL,
    });
});


app.get("/", (request, response) => {
    ///server to client
    response.json({
        message: "Server is running " + PORT
    })
})

app.use('/api/user', userRouter)
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/category", categoryRouter)
app.use("/api/file", uploadRouter)
app.use("/api/subcategory", subCategoryRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use('/api/order', orderRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running", PORT)
    })
})

