import Product from "./products.js";
import Review from "./reviews.js";


//hasMany => 
//belongsTo => 

Product.hasMany(Review, { onDelete: "CASCADE" }); // creates ProductID as foreign key in Reviews
Review.belongsTo(Product, { onDelete: "CASCADE" }); // creates ReviewID as foreign key in Reviews
// CASCADE => 

export default { Product, Review };