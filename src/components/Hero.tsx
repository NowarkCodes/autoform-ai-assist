import { Button } from "@/components/ui/button";
import { Download, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Hero = () => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast({
          title: "Error",
          description: "Failed to load payment gateway",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Get Razorpay Key ID from backend
      const { data: keyData, error: keyError } = await supabase.functions.invoke('razorpay-payment', {
        body: { action: 'get_key' },
      });

      if (keyError || !keyData.success) {
        toast({
          title: "Configuration Error",
          description: "Payment gateway not configured. Please contact support.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Create order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('razorpay-payment', {
        body: { action: 'create_order', amount: 9900 }, // 99 INR
      });

      if (orderError || !orderData.success) {
        throw new Error('Failed to create order');
      }

      const order = orderData.order;

      // Initialize Razorpay
      const options = {
        key: keyData.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'AI Form Filler',
        description: 'Chrome Extension Purchase',
        order_id: order.id,
        handler: async (response: any) => {
          // Verify payment
          const { data: verifyData, error: verifyError } = await supabase.functions.invoke('razorpay-payment', {
            body: {
              action: 'verify_payment',
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
          });

          if (verifyError || !verifyData.success || !verifyData.verified) {
            toast({
              title: "Payment Failed",
              description: "Payment verification failed",
              variant: "destructive",
            });
            setIsProcessing(false);
            return;
          }

          setIsPaymentVerified(true);
          toast({
            title: "Payment Successful!",
            description: "You can now download the extension",
          });
          setIsProcessing(false);
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
        theme: {
          color: '#6B46C1',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your extension download will begin shortly",
    });
    // Add actual download link here
    window.open('https://chrome.google.com/webstore', '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Fill Forms Instantly with AI-Powered Suggestions
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/90 sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Accelerate your form filling with AI-powered suggestions. Save time, reduce errors, and enhance productivity.
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            {!isPaymentVerified ? (
              <Button 
                variant="hero" 
                size="xl" 
                className="gap-2"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                <Download className="h-5 w-5" />
                {isProcessing ? 'Processing...' : 'Pay & Download Extension'}
              </Button>
            ) : (
              <Button 
                variant="hero" 
                size="xl" 
                className="gap-2"
                onClick={handleDownload}
              >
                <CheckCircle2 className="h-5 w-5" />
                Download Extension
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
    </section>
  );
};
