import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";
document.addEventListener("DOMContentLoaded", () => {
  //setApp
  CategoryView.setApp();
  ProductView.setApp();
  //view UI Update
  CategoryView.createCategoryList();
  ProductView.createProductList();
});
