import { Link, NavLink } from "react-router-dom";


const Nav = () => {
    return (
        <div className="w-full bg-cyan-950 text-white  fixed mt-0 z-50">
            <div className="flex justify-between px-10 py-4">
                <div>
                    <Link to="/" onFocus={window.location.reload}><h1 className="font-serif text-2xl text-yellow-600">Pixfar Shop</h1></Link>
                </div>
                <div>
                    <ul className="flex gap-4 font-serif text-2xl">
                        <NavLink to="/"  className={({ isActive }) => isActive ? "text-yellow-300" : "text-white"}><li>Home</li></NavLink>
                        <NavLink to="/cart"  className={({ isActive }) => isActive ? "text-yellow-300" : "text-white"}><li>Cart</li></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Nav;