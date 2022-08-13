import Storage from "./Storage.js";

const titleOfCategory = document.querySelector("#category-title");
const descriptionOfCategory = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const addCategoryToggler = document.querySelector("#toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const categoryCancelBtn = document.querySelector("#cancel-categoryBtn");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    addCategoryToggler.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    categoryCancelBtn.addEventListener("click", (e) =>
      this.cancelAddCategory(e)
    );
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
    categoryWrapper.classList.add("hidden");
    addCategoryToggler.classList.remove("hidden");
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
    const categoryEdit = document.querySelector("#product-category-edit");
    categoryDOM.innerHTML = result;
    categoryEdit.innerHTML=result;
  }
  toggleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.remove("hidden");
    addCategoryToggler.classList.add("hidden");
  }
  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    addCategoryToggler.classList.remove("hidden");
  }
}
export default new CategoryView();
