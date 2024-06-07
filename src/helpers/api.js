import  axiosClient  from "./axiosClient";

const apiProducts = {
    getProducts(skip, keyword, limit) {
        const url = `/products/search?q=${keyword}&skip=${skip}&limit=${limit}`
        return axiosClient.get(url)
    },
    getSingleProduct(id) {
        const url = `products/${id}`
        return axiosClient.get(url)
    },
    getCategories() {
        const url = `/products/category-list`
        return axiosClient.get(url)
    },
    getCategorySingle(name) {
        const url = `/products/category/${name}`
        return axiosClient.get(url)
    }
}

export default apiProducts