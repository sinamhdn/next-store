import mongoose from 'mongoose';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

interface IReview {
  user: mongoose.Types.ObjectId;
  name: string;
  rating?: number;
  comment: string;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

interface IProduct {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  reviews: mongoose.Types.ArraySubdocument;
  featuredImage?: string;
  isFeatured: boolean;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, /*required: true,*/ unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    featuredImage: { type: String },
    isFeatured: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("validate", function (next) {
  if (this.isNew) {
    this.slug = slugify(this.name, { lower: true }) + '-' + uuidv4();
  }
  next();
});

// productSchema.pre("insertMany", function (next, docs) {
//   console.log('______________________oNew Itemo_________________________');
//   for (let doc of docs) {
//     if (doc.isNew) {
//       console.log('______________________New Item_________________________');
//       doc.slug = slugify(doc.name, { lower: true }) + '-' + uuidv4();
//     }
//   }
//   next();
// });

// productSchema.pre("save", function (next) {
//   console.log('----------------------oNew Itemo-----------------------');
//   if (this.isNew) {
//     console.log('----------------------New Item-----------------------');
//     this.slug = slugify(this.name, { lower: true }) + '-' + uuidv4();
//   }
//   next();
// });

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;