import React, { useState, useEffect } from "react";
import axios from "axios";

interface WishlistItem {
  wishlist_id: number;
  product_name: string;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/1/wish-list"
        );
        setWishlistItems(response.data.wishListItems);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/1/wishlist/${productId}`);
      setWishlistItems(
        wishlistItems.filter((item) => item.wishlist_id !== productId)
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlistItems.map((item) => (
          <li key={item.wishlist_id}>
            {item.product_name}
            <button onClick={() => removeFromWishlist(item.wishlist_id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
