import React from "react";
import { IoMdClose, IoMdAdd, IoMdRemove, IoMdTrash } from "react-icons/io";
import { useCart } from "../context/CartContext";
import { formatTZS } from "../utils/currency";

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQty, totalPrice } = useCart();

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col bg-white text-[#000080] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose} aria-label="Close cart">
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 border-b border-gray-100 pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="font-semibold text-gray-800">{item.name}</span>
                    <span className="text-sm text-gray-500">{formatTZS(item.price)}</span>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="rounded-full border border-gray-300 p-1"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <IoMdRemove />
                      </button>
                      <span className="w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="rounded-full border border-gray-300 p-1"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <IoMdAdd />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-gray-400 hover:text-red-500"
                        aria-label={`Remove ${item.name}`}
                      >
                        <IoMdTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-gray-200 px-5 py-4">
          <div className="mb-3 flex items-center justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span>{formatTZS(totalPrice)}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full rounded-full bg-[#000080] py-3 font-semibold text-white disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;