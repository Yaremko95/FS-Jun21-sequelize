import Article from "./articles.js";
import Author from "./authors.js";
import Review from "./reviews.js";
//1. choose the type of relationship (1:1, 1:n, n:m)
// 1:n

// 2. understand what methods to use for this specific type of relationship
// hasMany & belongsTo

//3. understand for each association which model is TARGET & which model is SOURCE
// A.hasMany(B) => foreign key in the the TARGET B model

Author.hasMany(Article); // => authorId  Author.findAll({include: Article})
Article.belongsTo(Author); // => Article.findAll({include:Author})

Article.hasMany(Review);
Review.belongsTo(Article);

Author.hasMany(Review, { foreignKey: "author_id" });
Review.belongsTo(Author, { foreignKey: "author_id" });

export default { Article, Author, Review };
