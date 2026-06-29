import React from 'react';

const STATUS_OPTIONS = ['pending', 'confirmed', 'fulfilled', 'cancelled'];

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  fulfilled: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const OrdersTable = ({ orders, onStatusChange, isUpdating }) => {
  if (!orders.length) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-white">
        <p className="text-gray-500">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Sent Via</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <details>
                    <summary className="cursor-pointer font-mono text-xs text-blue-600 hover:text-blue-700">
                      {order.invoiceNumber}
                    </summary>
                    <ul className="mt-2 space-y-1 text-xs text-gray-600">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.quantity}× {item.name}
                          {item.variant ? ` (${item.variant})` : ''} — Tsh {(item.unitPrice * item.quantity).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </details>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{order.customer?.name}</div>
                  <div className="text-xs text-gray-500">{order.customer?.phone}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  Tsh {(order.totalPrice || 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 capitalize">{order.sentVia || 'none'}</td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order._id, e.target.value)}
                    disabled={isUpdating}
                    className={`text-xs font-semibold rounded-lg px-2 py-1.5 border-0 focus:ring-2 focus:ring-blue-500 ${STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-700'}`}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;