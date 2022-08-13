import Storage from "./Storage.js";
import CategoryView from "./CategoryView.js";
const addNewProductBtn = document.querySelector("#add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");
const productEditWrapper = document.querySelector("#product-edit-wrapper");
const titleOfEdit = document.querySelector("#product-title-edit");
const quantitiyOfEdit = document.querySelector("#product-quantity-edit");
const categoryOfEdit = document.querySelector("#product-category-edit");
const editBtn = document.querySelector("#edit-product");
class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    editBtn.addEventListener("click", (e) => this.editProduct(e));
    this.products = [];
    this.idOfEdit = null;
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = document.querySelector("#product-title").value;
    const quantity = document.querySelector("#product-quantity").value;
    const category = document.querySelector("#product-category").value;
    if (!title || !quantity || !category) return;
    Storage.saveProduct({ title, quantity, category });
    this.products = Storage.getAllProducts();
    //update
    this.createProductList(this.products);
    document.querySelector("#product-title").value = "";
    document.querySelector("#product-quantity").value = "";
    document.querySelector("#product-category").value = "";
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  createProductList(products) {
    let result = ``;
    let allQuantity = 0;
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      allQuantity += parseInt(item.quantity);
      result += `<div class="flex items-center justify-between mb-8" >
          <span class="text-slate-400">${item.title}</span>
          <div class="flex items-center gap-x-3">
            <span class="text-slate-400">${new Date().toLocaleDateString(
              "en-US"
            )}</span>
            <span
              class="block px-3 py-0.5 text-slate-400 rounded-2xl text-sm border border-slate-400"
              >${selectedCategory.title}</span
            >
            <span
              class="flex items-center justify-center w-7 h-7 rounded-full border-2 border-slate-300 bg-slate-500 text-slate-300"
              >${item.quantity}</span
            >
            <button
              class="delete-product border px-2 py-0.5 rounded-2xl border-red-500 text-red-500" data-product-id=${
                item.id
              }
            >
              delete
            </button>
             <button
              class="edit-product border px-2 py-0.5 rounded-2xl border-green-500 text-green-500" data-product-id=${
                item.id
              }
            >
              edit
            </button>
          </div>
        </div>`;
    });
    const productDOM = document.getElementById("products-list");
    productDOM.innerHTML = result;

    const deleteBtn = [...document.querySelectorAll(".delete-product")];
    deleteBtn.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });

    const editBtn = [...document.querySelectorAll(".edit-product")];
    editBtn.forEach((item) => {
      item.addEventListener("click", (e) => this.openEditProduct(e));
    });

    const allQuantityValue = document.querySelector("#all-quantity-value");
    allQuantityValue.innerHTML = allQuantity;
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductList(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductList(this.products);
  }
  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductList(this.products);
  }
  openEditProduct(e) {
    console.log(e.target.dataset.productId);
    const item = Storage.editProduct(e.target.dataset.productId);
    console.log(item[0]);
    productEditWrapper.classList.remove("hidden");
    CategoryView.createCategoryList();
    this.idOfEdit = item[0].id;
    titleOfEdit.value = item[0].title;
    quantitiyOfEdit.value = item[0].quantity;
    categoryOfEdit.value = item[0].category;
  }
  editProduct(e) {
    e.preventDefault();
    const title = titleOfEdit.value;
    const quantity = quantitiyOfEdit.value;
    const category = categoryOfEdit.value;
    const id = this.idOfEdit;
    if (!title || !quantity || !category) return;
    Storage.saveProduct({ id, title, quantity, category });
    this.products = Storage.getAllProducts();
    //update
    this.createProductList(this.products);
    titleOfEdit.value = "";
    quantitiyOfEdit.value = "";
    categoryOfEdit.value = "";
    productEditWrapper.classList.add("hidden");
  }
}
export default new ProductView();
