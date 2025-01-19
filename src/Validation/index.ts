
export const ProductValidation = (Product: { title: string, description: string, price: string, imageURL: string }) => {

    const URLValidation =
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

    const errors: { title: string, description: string, price: string, imageURL: string } = {
        title: '',
        description: '',
        price: "",
        imageURL: '',
    }
    // trim check if he white space 
    if (!Product.title.trim() || Product.title.length < 6 || Product.title.length > 80) {
        errors.title = "Product Title must be Between 6 and 80 characters"
    }

    if (!Product.description.trim() || Product.description.length < 10 || Product.description.length > 1000) {
        errors.description = "Product description must be Between 10 and 1000 characters"
    }

    if (!Product.price.trim() || isNaN(Number(Product.price))) {
        errors.price = "Valid  price is required "
    }

    if (!Product.imageURL.trim() || !URLValidation.test(Product.imageURL)) {
        errors.imageURL = "Valid image URL is required "
    }

    return errors;
}