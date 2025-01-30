"use client";

import { useEffect, useRef, useState } from "react";
import dropin from "braintree-web-drop-in";

export default function BraintreePayment() {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const dropinContainer = useRef(null);

  useEffect(() => {
    async function initializeDropIn() {
      if (!dropinContainer.current) return;

      try {
        const res = await fetch("/api/token");
        const data = await res.json();
        setClientToken(data.clientToken);

        if (!data.clientToken) {
          alert("Error: No client token received");
          return;
        }

        if (instance) {
          await instance.teardown();
          setInstance(null);
        }

        const dropinInstance = await dropin.create({
          authorization: data.clientToken,
          container: dropinContainer.current,
          vaultManager: false, // Disable stored payment methods
          card: {
            cardholderName: { required: true },
            overrides: {
              fields: {
                number: { placeholder: "4111 1111 1111 1111" },
                cvv: { required: true, placeholder: "123" }, // ✅ Force CVV
                expirationDate: { placeholder: "MM/YY" },
              },
            },
          },
        });

        setInstance(dropinInstance);
      } catch (error) {
        console.error("Braintree Drop-in Error:", error);
        alert("Payment UI failed to load.");
      }
    }

    initializeDropIn();
  }, []);

  const handlePayment = async () => {
    if (!instance) {
      alert("Drop-in UI is not initialized");
      return;
    }

    try {
      const { nonce } = await instance.requestPaymentMethod();
      console.log("Generated Nonce:", nonce);

      if (!nonce) {
        alert("Error: No nonce received. Try again.");
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nonce, amount: "10.00" }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Payment successful!");
        instance.teardown();
        setInstance(null);
      } else {
        alert(`Payment failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment error. Try again.");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div ref={dropinContainer} style={{ minHeight: "250px" }}></div>
      <button onClick={handlePayment} disabled={!instance}>
        Pay
      </button>
    </div>
  );
}
