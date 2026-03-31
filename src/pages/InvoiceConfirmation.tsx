import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Download, Home } from "lucide-react";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

// EmailJS configuration - same as contact page
const EMAILJS_SERVICE_ID = "service_ytteklz";
const EMAILJS_TEMPLATE_ID = "template_6dr5yvp";
const EMAILJS_PUBLIC_KEY = "IEmeJ5e8HtipqemG7";

interface InvoiceData {
  id: string;
  customerName: string;
  usdAmount: number;
  btcAddress: string;
}

interface PaymentData {
  btcPrice: number;
  btcAmount: number;
  lockedAt: string;
}

interface CompanyInfo {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  taxId: string;
  supportEmail: string;
}

const InvoiceConfirmation = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    // Fetch company info
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch("/secrets/company-info.json");
        if (response.ok) {
          const data = await response.json();
          setCompanyInfo(data);
        }
      } catch (error) {
        console.error("Failed to load company info:", error);
      }
    };

    fetchCompanyInfo();
  }, []);

  useEffect(() => {
    const state = location.state as {
      invoice: InvoiceData;
      payment: PaymentData;
    } | null;

    if (state && state.invoice && state.payment) {
      setInvoice(state.invoice);
      setPayment(state.payment);

      // Send confirmation email
      sendConfirmationEmail(state.invoice, state.payment);
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  const sendConfirmationEmail = async (
    invoiceData: InvoiceData,
    paymentData: PaymentData
  ) => {
    try {
      const templateParams = {
        fullName: invoiceData.customerName,
        email: "support@pod21.xyz", // You may want to collect customer email
        message: `Payment Attempt Registered\n\nInvoice ID: ${invoiceData.id}\nUSD Amount: $${invoiceData.usdAmount.toFixed(
          2
        )}\nBTC Amount: ${paymentData.btcAmount.toFixed(
          8
        )} BTC\nBTC Price: $${paymentData.btcPrice.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}\nBitcoin Address: ${invoiceData.btcAddress}\nPayment Time: ${new Date(
          paymentData.lockedAt
        ).toLocaleString()}`,
        submit_date: new Date().toLocaleString(),
      };

      // TEMPORARILY DISABLED TO CONSERVE EMAILJS CREDITS
      // TODO: Re-enable before pushing to production
      // const result = await emailjs.send(
      //   EMAILJS_SERVICE_ID,
      //   EMAILJS_TEMPLATE_ID,
      //   templateParams,
      //   EMAILJS_PUBLIC_KEY
      // );

      // console.log("Confirmation email sent:", result.text);
      console.log("Email sending disabled for testing. Template params:", templateParams);
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const maskBitcoinAddress = (address: string): string => {
    if (address.length <= 14) return address;
    const start = address.substring(0, 8);
    const end = address.substring(address.length - 6);
    return `${start}...${end}`;
  };

  if (!invoice || !payment) {
    return null;
  }

  const paymentTime = new Date(payment.lockedAt);
  const formattedTime = paymentTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <div className="min-h-screen bg-bgPrimary text-boneWhite py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Confirmation Container */}
        <div className="bg-bgSecondary rounded-lg border border-stroke p-8 sm:p-12">
          {/* Success Header */}
          <div className="text-center mb-12 pb-8 border-b border-stroke">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Check className="text-black" size={32} />
              </div>
            </div>
            <h1 className="text-h2 font-kanit mb-4 text-primary-100">
              Payment Registered
            </h1>
            <p className="text-textBody text-body-lg">
              Thank you, {invoice.customerName}! Your payment attempt has been registered.
            </p>
          </div>

          {/* Registration Details */}
          <div className="mb-12 pb-8 border-b border-stroke">
            <div className="bg-primary-10/20 border border-primary-30 rounded-lg p-4 mb-6">
              <p className="text-boneWhite text-body-sm">
                <span className="font-semibold">Status:</span> Payment attempt registered and pending verification. A final confirmation email will be sent to your inbox once the funds have been received and verified in the wallet.
              </p>
            </div>

            {/* Billing From Section */}
            {companyInfo && (
              <div className="mb-8 pb-8 border-b border-stroke">
                <p className="text-body-sm-semiBold text-primary-100 mb-4 uppercase tracking-wider">
                  Billing From
                </p>
                <div className="text-body-lg">
                  <p className="text-boneWhite font-medium">{companyInfo.name}</p>
                  <p className="text-textBody">{companyInfo.address.street}</p>
                  <p className="text-textBody">{companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}</p>
                  <p className="text-textBody mt-4">Tax ID: {companyInfo.taxId}</p>
                </div>
              </div>
            )}

            <p className="text-body-sm-semiBold text-primary-100 mb-6 uppercase tracking-wider">
              Payment Details
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Invoice Details */}
              <div className="bg-bgPrimary rounded-lg p-6">
                <p className="text-textBody text-body-sm mb-4 uppercase tracking-wider">
                  Invoice Details
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-textBody text-body-xs mb-1">
                      Invoice Number
                    </p>
                    <p className="text-boneWhite text-body-lg-medium font-kanit">
                      {invoice.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-textBody text-body-xs mb-1">
                      Customer Name
                    </p>
                    <p className="text-boneWhite text-body-lg-medium">
                      {invoice.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-textBody text-body-xs mb-1">
                      Payment Date & Time
                    </p>
                    <p className="text-boneWhite text-body-lg-medium">
                      {formattedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* USD Amount */}
              <div className="bg-bgPrimary rounded-lg p-6">
                <p className="text-textBody text-body-xs mb-4 uppercase tracking-wider">
                  USD Amount
                </p>
                <p className="text-h2 text-primary-100 font-kanit mb-2">
                  ${invoice.usdAmount.toFixed(2)}
                </p>
                <p className="text-textBody text-body-sm">United States Dollar</p>
              </div>
            </div>
          </div>

          {/* Bitcoin Payment Details */}
          <div className="mb-12 pb-8 border-b border-stroke">
            <p className="text-body-sm-semiBold text-primary-100 mb-6 uppercase tracking-wider">
              Bitcoin Payment Details
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* BTC Price */}
              <div className="bg-bgPrimary rounded-lg p-6">
                <p className="text-textBody text-body-xs mb-4 uppercase tracking-wider">
                  BTC Price (Locked)
                </p>
                <p className="text-h3 text-boneWhite font-kanit mb-2">
                  ${payment.btcPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-textBody text-body-sm">USD per Bitcoin</p>
              </div>

              {/* BTC Amount */}
              <div className="bg-bgPrimary rounded-lg p-6">
                <p className="text-textBody text-body-xs mb-4 uppercase tracking-wider">
                  BTC Amount Requested
                </p>
                <p className="text-h3 text-primary-100 font-kanit mb-2">
                  {payment.btcAmount.toFixed(8)}
                </p>
                <p className="text-textBody text-body-sm">Bitcoin</p>
              </div>
            </div>
          </div>

          {/* Bitcoin Address */}
          <div className="mb-12 pb-8 border-b border-stroke">
            <p className="text-body-sm-semiBold text-primary-100 mb-4 uppercase tracking-wider">
              Payment Sent To
            </p>
            <div className="bg-bgPrimary rounded-lg p-6">
              <p className="text-textBody text-body-xs mb-4">
                Bitcoin Address
              </p>
              <code className="text-primary-60 text-body-sm-medium break-all block p-4 bg-black/30 rounded border border-stroke font-mono">
                {maskBitcoinAddress(invoice.btcAddress)}
              </code>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 print:hidden">
            <Button
              onClick={handlePrint}
              className="flex-1 bg-primary-100 hover:bg-primary-60 text-black font-semibold flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Print / Save as PDF
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1 border-stroke hover:bg-bgPrimary text-boneWhite flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Back to Home
            </Button>
          </div>

          {/* Print-only footer */}
          <div className="hidden print:block mt-8 pt-8 border-t border-stroke text-center">
            <p className="text-textBody text-body-sm font-semibold mb-2">
              Payment Registration Receipt
            </p>
            <p className="text-textBody text-body-sm">
              Payment registered on {formattedTime}
            </p>
            <p className="text-textBody text-body-xs mt-4">
              This is a payment registration receipt. Final confirmation will be sent once funds are verified.
            </p>
            {companyInfo && (
              <p className="text-textBody text-body-xs mt-4">
                For support, contact: {companyInfo.supportEmail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .min-h-screen {
            background: white;
          }
          .bg-bgPrimary {
            background: white;
          }
          .bg-bgSecondary {
            background: white;
          }
          .bg-bgPrimary {
            background: white;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoiceConfirmation;
