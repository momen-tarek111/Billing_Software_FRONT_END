import { useContext, useState } from "react";
import "./CartSummary.css";
import { AppContext } from "../../context/AppContext";
import { createOrder, deleteOrder } from "../../Service/OrderService";
import PaymentForm from "./PaymentForm";
import toast from "react-hot-toast";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";

function CartSummary({ customerName, setCustomerName, mobileNumber, setMobileNumber }) {

    const { cartItems, clearCart } = useContext(AppContext);

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [showCardForm, setShowCardForm] = useState(false);
    const [savedOrder, setSavedOrder] = useState(null);
    const [showPopup,setShowPopup]=useState(false)
    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0.0
    );

    const tax = totalAmount * 0.01;
    const grandTotal = totalAmount + tax;

    const clearAll = () => {
        setCustomerName("");
        setMobileNumber("");
        clearCart();
    };

    const onCloseHandler=()=>{
        setShowPopup(false)
        setOrderDetails(null)
    }
    const completePayment = async (paymentMode) => {

        if (!customerName || !mobileNumber) {
            toast.error("Please enter customer details");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const orderData = {
            customerName,
            phoneNumber: mobileNumber,
            cartItems,
            subtotal: totalAmount,
            tax,
            grandTotal,
            paymentMethod: paymentMode.toUpperCase()
        };

        setIsProcessing(true);

        try {

            const response = await createOrder(orderData);

            if (response.status === 201) {

                const saved = response.data;

                if (paymentMode === "cash") {
                    toast.success("Cash received");
                    setOrderDetails(saved);
                }

                if (paymentMode === "card") {
                    setSavedOrder(saved);
                    setShowCardForm(true);
                }
            }

        } catch (error) {
            console.error(error);
            toast.error("Order creation failed");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCardSuccess = (paymentIntent) => {
        toast.success("Payment successful 🎉");
        setOrderDetails({
            ...savedOrder,
            paymentDetails: {
                paymentIntentId: paymentIntent.id,
                status: paymentIntent.status,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency
            }
        });

        setShowCardForm(false);
        // clearAll();
    };
    const placeOrder=()=>{
        console.log(orderDetails)
        setShowPopup(true)
        clearAll()
    }
    const handlePrintReceipt=()=>{
        window.print();
    }
    const handleCardFailure = async () => {
        if (savedOrder?.orderId) {
            await deleteOrder(savedOrder.orderId);
        }
        toast.error("Payment failed");
        setShowCardForm(false);
    };

    return (
        <div className="mt-2">

            {/* ===== SUMMARY ===== */}
            <div className="cart-summary-details">
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light cart-details-summary">Items:</span>
                    <span className="text-light cart-details-summary">${totalAmount.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light cart-details-summary">Tax (1%)</span>
                    <span className="text-light cart-details-summary">${tax.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light fw-bold cart-details-summary">Total:</span>
                    <span className="text-light fw-bold cart-details-summary">
                        ${grandTotal.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* ===== PAYMENT BUTTONS ===== */}
            {!showCardForm && (
                <>
                    <div className="d-flex gap-3 mt-3">
                        <button
                            onClick={() => completePayment("cash")}
                            disabled={isProcessing}
                            className="btn btn-success flex-grow-1"
                        >
                            {isProcessing ? "Processing..." : "Cash"}
                        </button>

                        <button
                            onClick={() => completePayment("card")}
                            disabled={isProcessing}
                            className="btn btn-primary flex-grow-1"
                        >
                            {isProcessing ? "Processing..." : "Card"}
                        </button>
                    </div>
                    <div className="d-flex gap-3 mt-3">
                            <button onClick={placeOrder} disabled={isProcessing || !orderDetails} className="btn btn-warning flex-grow-1">
                                Place Order
                            </button>
                    </div>
                </>
            )}
            {/* ===== STRIPE CARD FORM ===== */}
            {showCardForm && savedOrder && (
                <div className="mt-4">
                    <PaymentForm
                        orderData={savedOrder}
                        onSuccess={handleCardSuccess}
                        onFailure={handleCardFailure}
                    />
                </div>
            )}
            {showPopup&&(
                <ReceiptPopup 
                    orderDetails={{
                        ...orderDetails,
                        stripePaymentIntentId:orderDetails.paymentDetails?.paymentIntentId
                    }}
                    onClose={onCloseHandler}
                    onPrint={handlePrintReceipt}
                />
            )}
        </div>
    );
}

export default CartSummary;
