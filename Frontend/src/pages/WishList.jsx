import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlists,
  clearWishListMsg,
} from "../redux-store/slices/wishlistSlice";
import { NavLink } from "react-router-dom";
import { MdDeleteOutline, MdFavoriteBorder } from "react-icons/md";
import { LuMinus } from "react-icons/lu";
import { addCart, getCart } from "../redux-store/slices/cartSlice";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-hot-toast";
import { removeWishlist } from "../redux-store/slices/wishlistSlice";
import { clearCartMsg } from "../redux-store/slices/cartSlice";
const WishList = () => {
  const dispatch = useDispatch();
  const { error, successMsg } = useSelector((state) => state.cart);
  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg);
      dispatch(clearCartMsg());
    }
    if (error) {
      toast.error(error);
      dispatch(clearCartMsg());
    }
  }, [error, successMsg, dispatch]);

  const { loading, wishListData } = useSelector((state) => state.wishlist);

  // 👉 per item state
  const [cartState, setCartState] = useState({});

  useEffect(() => {
    dispatch(getWishlists());
  }, [dispatch]);

  // helpers
  const updateItem = (id, changes) => {
    setCartState((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...changes },
    }));
  };
  console.log("cstate", cartState);

  if (!wishListData || wishListData.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-3">
        <h3 className="font-bold text-xl">Wishlist</h3>
        <p className="text-gray-500">Your wishlist is empty</p>
        <NavLink to="/" className="text-red-500 font-semibold">
          Continue Shopping
        </NavLink>
      </div>
    );
  }

  // delete wishlist product
  const removeHnadler = (id)=>{
    dispatch(removeWishlist(id));
    dispatch(getWishlists())
  }


  return (
    <div className="w-full min-h-screen px-4 py-6">
      <h2 className="flex justify-center items-center gap-3 text-2xl font-bold mb-6">
        <MdFavoriteBorder /> Wishlist
      </h2>

      {/* responsive wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Size</th>
              <th className="p-3">Color</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {wishListData.map((item, index) => {
              const product = item.productId;
              const state = cartState[item._id] || {
                qty: 1,
                size: "",
                color: "",
              };

              const price = Math.ceil(
                product.oprice - (product.oprice * product.discount) / 100
              );

              return (
                <tr key={item._id} className="border-b">
                  {/* index */}
                  <td className="p-3">{index + 1}</td>

                  {/* product */}
                  <td className="p-3 flex gap-3 items-center min-w-[220px]">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-14 w-14 object-cover rounded"
                    />
                    <div>
                      <h5 className="font-semibold">{product.title}</h5>
                      <p className="text-gray-500 text-xs">
                        {product.category} / {product.brand}
                      </p>
                    </div>
                  </td>

                  {/* quantity */}
                  <td className="p-3">
                    <div className="flex items-center gap-2 border rounded px-2 py-1 w-fit">
                      <IoIosAdd
                        className="cursor-pointer"
                        onClick={() =>
                          updateItem(item._id, { qty: state.qty + 1 })
                        }
                      />
                      <span>{state.qty}</span>
                      <LuMinus
                        className="cursor-pointer"
                        onClick={() =>
                          state.qty > 1 &&
                          updateItem(item._id, { qty: state.qty - 1 })
                        }
                      />
                    </div>
                  </td>

                  {/* size */}
                  <td className="p-3">
                    <select
                      className="border rounded px-2 py-1"
                      value={state.size}
                      onChange={(e) =>
                        updateItem(item._id, { size: e.target.value })
                      }
                    >
                      <option value="">Size</option>
                      {product?.sizes?.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* color */}
                  <td className="p-3">
                    <select
                      className="border rounded px-2 py-1"
                      value={state.color}
                      onChange={(e) =>
                        updateItem(item._id, { color: e.target.value })
                      }
                    >
                      <option value="">Color</option>
                      {product?.colors?.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* price */}
                  <td className="p-3 font-semibold">${price}</td>

                  {/* action */}
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const current = cartState[item._id];
                          
                          
                          if (!current?.size || !current?.color) {
                            toast.error("Please select size and color");
                            return;
                          }

                          dispatch(
                            addCart({
                              productId: product._id,
                              color: current.color,
                              quantity: current.qty,
                              size: Number(current.size),
                            })
                          )
                        }}
                        className="bg-black text-white px-3 py-2 rounded text-xs hover:opacity-80"
                      >
                        Add to Cart
                      </button>
                      <button onClick={()=>removeHnadler(item._id)} className="border p-2 rounded hover:bg-gray-100">
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
