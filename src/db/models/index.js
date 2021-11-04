import Product from "./products.js";
import Review from "./reviews.js";
import User from "./user.js"
import Category from "./category.js"
import ProductJoinCategory from "./productCategory.js"


//hasMany => 
//belongsTo => 

Product.hasMany(Review, { onDelete: "CASCADE" }); // creates ProductID as foreign key in Reviews
Review.belongsTo(Product, { onDelete: "CASCADE" }); // creates ReviewID as foreign key in Reviews
// CASCADE => 

Product.belongsToMany(Category, {through : {model: ProductJoinCategory, unique: false}} );
Category.belongsToMany(Product, {through : {model: ProductJoinCategory, unique: false}} );

//A Joint table is made with products and category with each taking 1 cell
            // unique: false is used to remove the primary key automatically made by using "through"


// For USER TO REVIEW
User.hasMany(Review, { onDelete: "CASCADE" }); // creates ProductID as foreign key in Reviews
Review.belongsTo(User, { onDelete: "CASCADE" }); // creates ReviewID as foreign key in Reviews



export default { Product, Review, Category, User, ProductJoinCategory };