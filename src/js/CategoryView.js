import Storage from "./Storage.js";

const titleOfCategory = document.querySelector("#category-title");
const descriptionOfCategory = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = titleOfCategory.value;
    const description = descriptionOfCategory.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    //update DOM
    this.createCategoryList();
    titleOfCategory.value = "";
    descriptionOfCategory.value = "";
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoryList() {
    let result = `<option class="bg-slate-500 text-slate-400" value="selectCategory">
                  Select a Category
                </option>`;
    this.categories.forEach((item) => {
      result += `<option class="bg-slate-500 text-slate-400" value=${item.id}>
                  ${item.title}
                </option>`;
    });
    const categoryDOM = document.querySelector("#product-category");
    categoryDOM.innerHTML = result;
  }
}
export default new CategoryView();
