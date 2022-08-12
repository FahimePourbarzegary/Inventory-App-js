const categories = [
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
      return new Date(a.createdAt) > new Data(b.createdAt) ? -1 : 1;
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
}