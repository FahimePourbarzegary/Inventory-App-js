const Products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2022-08-12T08:36:05.874Z",
  },
  {
    id: 2,
    title: "c#",
    category: "backend",
    createdAt: "2022-07-12T08:36:05.874Z",
  },
];
const categories = [
  {
    id: 1,
    title: "frontend",
    description: "the frontend of application",
    createdAt: "2022-08-12T08:36:05.874Z",
  },
  {
    id: 2,
    title: "backend",
    description: "the backend of application",
    createdAt: "2022-07-12T08:36:05.874Z",
  },
];
export default class Storage {
  //......Categories....
  //getAllCategories
  static getAllCategories() {
    // get Data From localStorage
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    // sorted Data
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  // save new Data or Edit exist Data
  static saveCategory(categoryToSave) {
    //getAllCategories
    const savedCategories = Storage.getAllCategories();
    //check Data new or exist
    const existedItem = savedCategories.find((c) => c.id == categoryToSave.id);

    if (existedItem) {
      //Edit
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      //new
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    //save to localStorage
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  //......Products.....
  //getAllProducts
  static getAllProducts(sort = "newest") {
    // get Data From localStorage
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    // sorted Data
    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
    return sortedProducts;
  }
  // save new Data or Edit exist Data
  static saveProduct(productToSave) {
    //getAllCategories
    const savedProducts = Storage.getAllProducts();
    //check Data new or exist
    const existedItem = savedProducts.find(
      (c) => c.id === parseInt(productToSave.id)
    );

    if (existedItem) {
      //Edit
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      //new
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    //save to localStorage
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
  static editProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id === parseInt(id));
    return filteredProducts;
  }
}
