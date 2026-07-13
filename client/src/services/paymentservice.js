import api from '../utils/api';

export const paymentService = {
  createOrder: (plan) => api.post('/payments/create-order', { plan }),
  verify: (payload) => api.post('/payments/verify', payload),
  history: () => api.get('/payments/history'),
};

/**
 * Loads the Razorpay checkout script once and opens the payment modal.
 * Resolves with the verified user on success, rejects on cancel/failure.
 */
export function openRazorpayCheckout({ order, user, onSuccess, onDismiss }) {
  const loadScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  return loadScript().then((loaded) => {
    if (!loaded) throw new Error('Failed to load Razorpay checkout script');

    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: 'AI Startup Idea Validator',
      description: 'Plan upgrade',
      order_id: order.orderId,
      handler: async (response) => {
        const { data } = await paymentService.verify(response);
        onSuccess?.(data.data.user);
      },
      prefill: { name: user?.name, email: user?.email },
      theme: { color: '#6247ff' },
      modal: { ondismiss: () => onDismiss?.() },
    });
    rzp.open();
  });
}
