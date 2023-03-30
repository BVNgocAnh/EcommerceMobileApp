import express from "express";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51M9t4hKFAxqQdTRCEwq5rPnP28DKE1nxwsL5s1GusvkmFAAlcfNGStl5GXAvhbu0QvshDDAn6ddppeeBNQRijVQi00o0b0ZeWx"
);
const router = express.Router();

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

export default router;
