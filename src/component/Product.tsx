import { useDispatch, useSelector } from 'react-redux';
import { PostProducts, useGetProductsQuery } from '../service/get';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { addToCart, setProducts, setSearchQuery } from '../feature/cartSlice'; 
import Loading from './LoadingSpinner';
import { RootState } from '../app/store'; 

const Product = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const searchQuery = useSelector((state: RootState) => state.cart.searchQuery); 
    const allProducts = useSelector((state: RootState) => state.cart.products) || [];
    const { data = [], isFetching } = useGetProductsQuery({ page }, { skip: page === 0 }); 
    const [loading, setLoading] = useState(false); 

    
    useEffect(() => {
        if (data.length > 0) {
            
            dispatch(setProducts([...allProducts, ...data])); 
        }
        setLoading(false); 
    }, [data, dispatch]);

    const handleAddToCart = (product: PostProducts) => {
        dispatch(addToCart(product));
        toast.success("Product added successfully");
    };

    const handleInfiniteScroll = () => {
        const isBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 1;
        if (isBottom && !isFetching && !loading && !searchQuery) {
            setLoading(true);
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => window.removeEventListener('scroll', handleInfiniteScroll);
    }, [isFetching, loading, searchQuery]); 

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        dispatch(setSearchQuery(query)); 
        setLoading(true); 
        if (query === '') {
            setPage(1); 
        }
    };

    
    const filteredProducts = searchQuery
        ? allProducts.filter((product: PostProducts) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).sort((a, b) => {
            if (a.title.toLowerCase().startsWith(searchQuery.toLowerCase())) return -1;
            if (b.title.toLowerCase().startsWith(searchQuery.toLowerCase())) return 1;
            return 0;
        })
        : allProducts; 

    return (
        <div>
            <div className='container justify-center pt-10 w-full lg:w-[700px] flex mx-auto'>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        className='mx-auto flex items-center justify-center bg-slate-200 outline-none rounded-md w-full lg:w-[500px] h-[50px] px-4'
                        type="text"
                        placeholder='Search here....'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>
            <div className="container grid grid-cols-1 lg:grid-cols-4 items-center gap-32 mx-w-xl mx-auto p-2 py-10">
                {
                    filteredProducts.length > 0 ? (
                        filteredProducts.map((product: PostProducts) => (
                            <div
                                key={product.id}
                                className="w-full mx-auto lg:w-[400px] h-[500px] shadow-md p-10 rounded-md"
                                data-testid='product-item'
                            >
                                <img className="h-[200px] w-[220px]" src={product.image} alt={product.title} />
                                <div className='mt-4 h-[200px]'>
                                    <h1 className="font-semibold text-xl">{product.title}</h1>
                                    <p>Price: ${product.price}</p>
                                    <p>Category: {product.category}</p>
                                    <button onClick={() => handleAddToCart(product)} className="btn mt-4 w-full bg-green-950 text-white p-2 rounded-md">Add to cart</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full">No products found.</div>
                    )
                }
            </div>
            <div className='container mx-auto z-10 flex justify-center items-center' data-testid="loading-spinner">
                {loading && <Loading />}
            </div>
        </div>
    );
};

export default Product;
