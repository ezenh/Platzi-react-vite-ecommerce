const api = "https://dummyjson.com/products"

const fetchDataApi = async () => {
    try {
        const response = await fetch(`${api}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // console.log(data)
        return data

    } catch (error) {
        console.error(`Oh no, ocurrió un error: ${error}`);
        throw error
    }
}

export default fetchDataApi