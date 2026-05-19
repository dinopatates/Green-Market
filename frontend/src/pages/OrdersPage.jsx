import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");
    fetch(`${api_url}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setOrders(response.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentUser, navigate, api_url]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Mes commandes - Green Market</title>
      </Helmet>

      <div className="p-4 min-h-screen">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Mes commandes</h1>

          {loading ? (
            <p>Chargement...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Vous n'avez pas encore passé de commande</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-300 rounded-lg p-6"
                  style={{
                    backgroundImage: "url('/images/wood_texture.webp')",
                    backgroundSize: "repeat",
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Commande #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded font-semibold text-white ${
                      order.status === 'pending' ? 'bg-yellow-500' :
                      order.status === 'confirmed' ? 'bg-blue-500' :
                      order.status === 'shipped' ? 'bg-purple-500' :
                      'bg-green-500'
                    }`}>
                      {order.status === 'pending' ? 'En attente' :
                       order.status === 'confirmed' ? 'Confirmée' :
                       order.status === 'shipped' ? 'Expédiée' :
                       'Livrée'}
                    </span>
                  </div>

                  <div className="mb-4 border-t border-gray-300 pt-4">
                    <h4 className="font-semibold mb-2">Produits commandés:</h4>
                    <ul className="space-y-2">
                      {order.orderLines && order.orderLines.map((line) => (
                        <li key={line.id} className="flex justify-between text-sm">
                          <span>
                            {line.product?.name || 'Produit'} x {line.quantity}
                          </span>
                          <span className="font-semibold">
                            {(parseFloat(line.unit_price) * line.quantity).toFixed(2)}€
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end border-t border-gray-300 pt-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold">{parseFloat(order.total).toFixed(2)}€</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
