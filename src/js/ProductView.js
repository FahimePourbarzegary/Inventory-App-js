import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#add-new-product");
class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
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
    this.createProductList();
    document.querySelector("#product-title").value = "";
    document.querySelector("#product-quantity").value = "";
    document.querySelector("#product-category").value = "";
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  createProductList() {
    let result = ``;
    this.products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
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
              class="border px-2 py-0.5 rounded-2xl border-red-500 text-red-500" data-id=${
                item.id
              }
            >
              delete
            </button>
          </div>
        </div>`;
    });
    const productDOM = document.getElementById("products-list");
    productDOM.innerHTML = result;
  }
}
export default new ProductView();
