import React, { useState } from "react";
import { IoMdClose, IoMdAdd, IoMdRemove, IoMdTrash } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { formatTZS } from "../utils/currency";
import { createOrder, markOrderSent } from "../http";

// Same WhatsApp number used by the Nespresso Accessories "Enquire" button.
const WHATSAPP_NUMBER = "255764437845";

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQty, totalPrice, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sentInvoice, setSentInvoice] = useState(null);

  const canSubmit = items.length > 0 && name.trim() && phone.trim() && !submitting;

  const handleSendOrder = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        customer: { name: name.trim(), phone: phone.trim() },
        items: items.map((item) => ({
          name: item.name,
          unitPrice: item.price,
          quantity: item.qty,
        })),
      };

      const response = await createOrder(payload);
      const result = response.data;

      if (!result.success) {
        throw new Error(result.message || "Could not create the order.");
      }

      const order = result.data;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        result.whatsappMessage
      )}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      // Best-effort — don't block the user on this; the order already
      // exists either way.
      markOrderSent(order._id).catch(() => {});

      setSentInvoice(order.invoiceNumber);
      clearCart();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Something went wrong sending your order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
            <p className="mt-10 text-center text-gray-500">
              {sentInvoice
                ? `Your cart is empty. Last order sent — invoice ${sentInvoice}.`
                : "Your cart is empty."}
            </p>
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

          {items.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-4">
              <p className="text-sm font-semibold text-gray-700">Your details</p>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#000080]"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#000080]"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-5 py-4">
          <div className="mb-3 flex items-center justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span>{formatTZS(totalPrice)}</span>
          </div>

          <button
            onClick={handleSendOrder}
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaWhatsapp className="text-xl" />
            {submitting ? "Sending…" : "Send Order via WhatsApp"}
          </button>

          <p className="mt-2 text-center text-xs text-gray-400">
            We'll open WhatsApp with your order ready to send — nothing is charged here.
          </p>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;