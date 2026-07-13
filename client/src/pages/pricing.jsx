import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authstore';
import { paymentService, openRazorpayCheckout } from '../services/paymentservice';

const plans = [
  {
    id: 'free', name: 'Free', price: '$0', period: 'forever',
    features: ['3 ideas / month', '1 export / month', 'All 9 AI analysis modules', 'Community support'],
  },
  {
    id: 'pro', name: 'Pro', price: '₹999', period: '/ month', highlighted: true,
    features: ['25 ideas / month', '25 exports / month', 'All 9 AI analysis modules', 'PDF & PPTX exports', 'Priority support'],
  },
  {
    id: 'enterprise', name: 'Enterprise', price: '₹4,999', period: '/ month',
    features: ['Unlimited ideas', 'Unlimited exports', 'All 9 AI analysis modules', 'Team seats (coming soon)', 'Dedicated support'],
  },
];

export default function Pricing() {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleSubscribe = async (planId) => {
    if (planId === 'free') return navigate('/register');
    if (!user) return navigate('/login');

    setLoadingPlan(planId);
    try {
      const { data } = await paymentService.createOrder(planId);
      await openRazorpayCheckout({
        order: data.data,
        user,
        onSuccess: (updatedUser) => {
          updateUser(updatedUser);
          toast.success(`You're now on the ${planId} plan!`);
        },
        onDismiss: () => toast('Payment cancelled'),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not start checkout');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="section-heading">Simple, transparent pricing</h1>
        <p className="mt-3 text-gray-600">Start free. Upgrade when you're validating ideas every week.</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl border p-8 ${
              plan.highlighted ? 'border-brand-300 bg-gradient-to-b from-brand-50 to-white shadow-glow' : 'border-gray-100 bg-white shadow-soft'
            }`}
          >
            {plan.highlighted && (
              <span className="badge absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white">
                <Sparkles className="h-3 w-3" /> Most Popular
              </span>
            )}
            <h3 className="font-display text-lg font-semibold text-gray-900">{plan.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-4xl font-extrabold text-gray-900">{plan.price}</span>
              <span className="text-sm text-gray-500">{plan.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loadingPlan === plan.id || user?.plan === plan.id}
              className={`mt-8 w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}
            >
              {user?.plan === plan.id ? 'Current Plan' : loadingPlan === plan.id ? 'Loading...' : plan.id === 'free' ? 'Get Started' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
