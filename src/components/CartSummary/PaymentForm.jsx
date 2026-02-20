import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { createStripePayment, verifyPayment } from "../../Service/PaymentService";

function PaymentForm({ orderData, onSuccess }) {

    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        try {

            // 1️⃣ Create PaymentIntent from backend
            const response = await createStripePayment({
                amount: Math.round(orderData.grandTotal * 100),
                currency: "usd"
            });

            const clientSecret = response.data.clientSecret;

            // 2️⃣ Confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: orderData.customerName
                    }
                }
            });

            if (result.error) {
                toast.error(result.error.message);
            } 
            else if (result.paymentIntent.status === "succeeded") {
                try {
                    await verifyPayment({paymentIntentId:result.paymentIntent.id,orderId:orderData.orderId});
                    onSuccess(result.paymentIntent);
                } catch (error) {
                    console.error(error)
                    toast.error("Error Happened when verify payment")
                }
            }

        } catch (error) {
            console.error(error);
            toast.error("Payment failed");
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginBottom: "10px"
            }}>
                <CardElement />
            </div>

            <button 
                type="submit"
                disabled={!stripe || processing}
                className="btn btn-primary w-100"
            >
                {processing ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
}

export default PaymentForm;
