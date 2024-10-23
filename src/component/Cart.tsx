import { useDispatch, useSelector } from 'react-redux';
import { removeCart } from '../feature/cartSlice';
import toast from 'react-hot-toast';
import { PostProducts } from '../service/get';
import {RootState} from '../app/store'

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    
    
    const totalPrice = cartItems.reduce((sum: number, item: PostProducts) => sum + item.price, 0);
    
    const handleRemoveCart = (id: number) => {
        dispatch(removeCart(id));
        toast.success("Deleted successfully");
    }

    return (
        <div className='container mx-auto mt-10 mx-w-xl h-screen'>
            
            <div className='container mx-auto justify-center items-center flex flex-col lg:flex-row gap-20'>
                <div className='bg-fuchsia-950 w-64 h-24 rounded-md flex items-center justify-center text-white text-xl font-mono p-2'>
                    <span>Total Items:</span> {cartItems?.length}
                </div>
                <div className='bg-fuchsia-950 w-64 h-24 rounded-md flex items-center justify-center text-white text-xl font-mono p-2'>
                    <span>Total Price:</span> ${totalPrice.toFixed(2)}
                </div>
            </div>

           
            <div className=' mt-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((cart: PostProducts, idx:number) => (
                                <tr key={idx} className=''>
                                    <td>
                                        <img className='h-32' src={cart.image} alt={cart.title} />
                                    </td>
                                    <td>
                                    {cart.title}
                                    </td>
                                    <td>
                                   ${cart.price.toFixed(2)}
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => handleRemoveCart(cart.id)} 
                                            className='btn bg-red-950 text-white p-2 rounded-md'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;
