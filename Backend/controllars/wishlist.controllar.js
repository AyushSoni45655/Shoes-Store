import WishListModal from "../modal/wishlist.modal.js";

 const toggleWishList = async (req, res) => {
  try {
    
        // 🔴 SAFETY CHECK
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized user",
      });
    }
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId ) {
      return res.status(400).json({ success: false, msg: "Product ID is required" });
    }

    // Check if already in wishlist
    const existing = await WishListModal.findOne({  userId,productId });

    if (existing) {
      await WishListModal.findByIdAndDelete(existing._id);
      return res.status(200).json({ success: true, msg: "Removed from wishlist" });
    }

    // Add to wishlist
     await WishListModal.create({  userId,productId });
    return res.status(201).json({ success: true, msg: "Added to wishlist" });

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
 const removeWishList = async (req, res) => {
  try {
    const userId = req.user.id;
    const  {id} = req.params;

    if (!id) {
      return res.status(400).json({ success: false, msg: "Wishlist ID is required" });
    }

    // Delete only if the item belongs to current user
    const deleted = await WishListModal.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Wishlist item not found or unauthorized" });
    }

    return res.status(200).json({ success: true, msg: "Removed from wishlist" });

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

 const getWishList = async (req, res) => {
  try {
    
    const wishlist = await WishListModal.find({ userId: req.user.id })
      .populate("productId"); 

    if (!wishlist.length) {
      return res.status(200).json({ success: true, msg: "No items found", wishlist: [] });
    }

    return res.status(200).json({ success: true, msg: "Wishlist fetched", wishlist,wishlistLength:wishlist.length });

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};


export {removeWishList,toggleWishList,getWishList}