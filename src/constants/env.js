// Envs
let dev = false;
let devserver = "http://192.168.1.152:8082/";
let deploy = "http://35.232.199.110:8082/";


let env = {
  server:dev?devserver:deploy,
  dev:dev,
  itemImageSource:'public/items/',
  categoryImageSource:'public/categories/',
  subCategoriesImageSource:'public/subCategories/'

};

export default env;