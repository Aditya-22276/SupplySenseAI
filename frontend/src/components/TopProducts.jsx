import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Trophy,
  Crown,
  Package,
  TrendingUp,
} from "lucide-react";

function TopProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    try {
      const response = await api.get(
        "/inventory/top-products"
      );

      setProducts(response.data);
    } catch (error) {
      console.error(
        "Top Products API Error:",
        error
      );
    }
  };

  return (
    <div
      className="
      bg-slate-900/80
      backdrop-blur-xl
      border border-slate-800
      rounded-3xl
      p-6
      h-[520px]
      "
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Top Products
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Highest performing inventory items
          </p>
        </div>

        <div
          className="
          px-4 py-2
          rounded-full
          bg-cyan-500/10
          border border-cyan-500/30
          text-cyan-300
          text-sm
          "
        >
          Best Sellers
        </div>

      </div>

      {/* Product List */}

      <div className="space-y-4 overflow-y-auto h-[400px] pr-2">

        {products.map((item, index) => {

          const progress =
            (item.current_stock / 1000) * 100;

          return (
            <div
              key={index}
              className="
              bg-slate-800/50
              border border-slate-700
              rounded-2xl
              p-4

              hover:border-cyan-500/40
              hover:shadow-lg
              hover:shadow-cyan-500/10

              transition-all
              "
            >

              <div className="flex justify-between items-center">

                {/* Left */}

                <div className="flex items-center gap-4">

                  {/* Rank */}

                  <div
                    className={`
                    w-10 h-10
                    rounded-xl
                    flex items-center justify-center
                    font-bold text-sm

                    ${
                      index === 0
                        ? "bg-yellow-500/20 text-yellow-300"
                        : index === 1
                        ? "bg-slate-600/30 text-slate-300"
                        : index === 2
                        ? "bg-orange-500/20 text-orange-300"
                        : "bg-slate-700 text-slate-300"
                    }
                    `}
                  >
                    #{index + 1}
                  </div>

                  {/* Product Icon */}

                  <div
                    className="
                    w-12 h-12
                    rounded-xl

                    bg-gradient-to-br
                    from-cyan-500/20
                    to-violet-500/20

                    border border-slate-700

                    flex items-center justify-center
                    "
                  >
                    <Package
                      size={22}
                      className="text-cyan-300"
                    />
                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <h3 className="text-white font-semibold text-lg">
                        {item.product_name}
                      </h3>

                      {index === 0 && (
                        <Crown
                          size={18}
                          className="text-yellow-400"
                        />
                      )}

                    </div>

                    <p className="text-slate-400 text-sm">
                      Inventory Performance
                    </p>

                  </div>

                </div>

                {/* Right */}

                <div className="text-right">

                  <div className="flex items-center gap-2 justify-end">

                    <TrendingUp
                      size={16}
                      className="text-emerald-400"
                    />

                    <span className="text-cyan-400 font-bold text-xl">
                      {item.current_stock}
                    </span>

                  </div>

                  <p className="text-slate-500 text-xs">
                    Units Available
                  </p>

                </div>

              </div>

              {/* Progress */}

              <div className="mt-4">

                <div
                  className="
                  h-2
                  bg-slate-700
                  rounded-full
                  overflow-hidden
                  "
                >
                  <div
                    className="
                    h-full

                    bg-gradient-to-r
                    from-cyan-500
                    via-sky-500
                    to-violet-500

                    rounded-full
                    "
                    style={{
                      width: `${Math.min(
                        progress,
                        100
                      )}%`,
                    }}
                  />
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopProducts;