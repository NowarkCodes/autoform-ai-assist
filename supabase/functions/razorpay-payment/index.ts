import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, orderId, paymentId, signature, amount } = await req.json();
    
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay credentials not configured');
    }

    console.log('Processing Razorpay request:', { action, orderId });

    // Get Razorpay Key ID
    if (action === 'get_key') {
      return new Response(
        JSON.stringify({ success: true, keyId: razorpayKeyId }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Razorpay order
    if (action === 'create_order') {
      const orderAmount = amount || 9900; // Default amount in paise (99 INR)
      
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`,
        },
        body: JSON.stringify({
          amount: orderAmount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            product: 'AI Form Filler Chrome Extension',
          },
        }),
      });

      const order = await response.json();
      console.log('Razorpay order created:', order.id);

      return new Response(
        JSON.stringify({ success: true, order }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify payment
    if (action === 'verify_payment') {
      // Create HMAC signature for verification
      const encoder = new TextEncoder();
      const keyData = encoder.encode(razorpayKeySecret);
      const messageData = encoder.encode(`${orderId}|${paymentId}`);
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
      const signatureArray = Array.from(new Uint8Array(signatureBuffer));
      const expectedSignature = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const isValid = expectedSignature === signature;
      console.log('Payment verification:', { orderId, paymentId, isValid });

      if (isValid) {
        // Fetch payment details
        const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
          headers: {
            'Authorization': `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`,
          },
        });

        const paymentDetails = await paymentResponse.json();

        return new Response(
          JSON.stringify({ 
            success: true, 
            verified: true,
            paymentDetails 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ success: false, verified: false, error: 'Invalid signature' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );

  } catch (error) {
    console.error('Error in razorpay-payment function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
