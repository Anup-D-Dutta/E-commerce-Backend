// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//     },
//     image: {
//         type: Array,
//         default: []
//     },
//     category: [
//         {
//             type: mongoose.Schema.ObjectId,
//             ref: 'category'
//         }
//     ],
//     subCategory: [
//         {
//             type: mongoose.Schema.ObjectId,
//             ref: 'subCategory'
//         }
//     ],
//     unit: {
//         type: String,
//         default: ""
//     },
//     stock: {
//         type: Number,
//         default: null
//     },
//     price: {
//         type: Number,
//         defualt: null
//     },
//     discount: {
//         type: Number,
//         default: null
//     },
//     description: {
//         type: String,
//         default: ""
//     },
//     more_details: {
//         type: Object,
//         default: {}
//     },
//     publish: {
//         type: Boolean,
//         default: true
//     }
// }, {
//     timestamps: true
// })

// //create a text index
// productSchema.index({
//     name: "text",
//     description: 'text'
// }, {
//     name: 10,
//     description: 5
// })


// const ProductModel = mongoose.model('product', productSchema)

// export default ProductModel

//-------------------------------------------------


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        default: []
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'subCategory'
        }
    ],
    unit: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        default: null
    },
    price: {  // ✅ Fixed typo here
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    },
    sizes: {
        type: [
            {
                size: { type: String, required: true },
                quantity: { type: Number, default: 0 },
            }
        ],
        default: []
    }


}, {
    timestamps: true
});

// ✅ Fixed index weight syntax
productSchema.index({ name: "text", description: "text" }, { weights: { name: 10, description: 5 } });

const ProductModel = mongoose.model('product', productSchema);

export default ProductModel;



// const mongoose = require('mongoose');

// const sizeSchema = new mongoose.Schema({
//   productType: {
//     type: String,
//     required: true,
//     enum: ['Shoes', 'Watch', 'Sunglass', 'Cloth'],
//   },
//   size: {
//     type: String,
//     required: true,
//   },
//   unit: {
//     type: String,
//     enum: ['US', 'EU', 'CM', 'Inches', 'UK', 'Generic'],
//     default: 'Generic',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//     },
//     image: {
//         type: Array,
//         default: []
//     },
//     category: [
//         {
//             type: mongoose.Schema.ObjectId,
//             ref: 'category'
//         }
//     ],
//     subCategory: [
//         {
//             type: mongoose.Schema.ObjectId,
//             ref: 'subCategory'
//         }
//     ],
//     unit: {
//         type: String,
//         default: ""
//     },
//     stock: {
//         type: Number,
//         default: null
//     },
//     price: {
//         type: Number,
//         default: null
//     },
//     discount: {
//         type: Number,
//         default: null
//     },
//     description: {
//         type: String,
//         default: ""
//     },
//     more_details: {
//         type: Object,
//         default: {}
//     },
//     publish: {
//         type: Boolean,
//         default: true
//     },
//     size: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Size'
//     }]
// }, {
//     timestamps: true
// });

// productSchema.index({ name: "text", description: "text" }, { weights: { name: 10, description: 5 } });

// const ProductModel = mongoose.model('product', productSchema);

// module.exports = mongoose.model('Size', sizeSchema);
// module.exports = ProductModel;
