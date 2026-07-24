import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Download, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { loadCompanyInfo } from "@/utils/secretsLoader";
import { SecretsWarning } from "@/components/SecretsWarning";

// EmailJS configuration - same as contact page
const EMAILJS_SERVICE_ID = "service_ytteklz";
const EMAILJS_TEMPLATE_ID = "template_6dr5yvp";
const EMAILJS_PUBLIC_KEY = "IEmeJ5e8HtipqemG7";

interface Service {
  description: string;
  quantity: number;
  unitValue: number;
}

interface InvoiceData {
  id: string;
  invoiceDate: string;
  dueWithin: number;
  customerName: string;
  companyName: string;
  address: string;
  services: Service[];
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
        const data = await loadCompanyInfo();
        if (data) {
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

      // Only send email once per browser session using sessionStorage
      const emailKey = `payment_email_sent_${state.invoice.id.toLowerCase()}`;
      if (!sessionStorage.getItem(emailKey)) {
        sessionStorage.setItem(emailKey, 'true');
        sendConfirmationEmail(state.invoice, state.payment);
      }
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
        message: `Payment Attempt Registered\n\nInvoice ID: ${invoiceData.id}\nUSD Amount: $${calculateInvoiceTotal(invoiceData.services).toFixed(
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

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Confirmation email sent:", result.text);
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBackToInvoice = () => {
    // Clear the email sent flag so a new email can be sent if user goes through payment flow again
    const emailKey = `payment_email_sent_${invoiceId?.toLowerCase()}`;
    sessionStorage.removeItem(emailKey);
    navigate(`/pay/${invoiceId}`);
  };

  const calculateInvoiceTotal = (services: Service[]): number => {
    return services.reduce((total, service) => total + (service.quantity * service.unitValue), 0);
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
    <>
      <SecretsWarning />
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
            <div className="mb-8 pb-8 border-b border-stroke">
              <p className="text-body-sm-semiBold text-primary-100 mb-4 uppercase tracking-wider">
                Billing From
              </p>
              <div className="text-body-lg">
                <p className="text-boneWhite font-medium">{companyInfo?.name || "POD21 LLC"}</p>
                <p className="text-textBody">{companyInfo?.address.street || "4834 NW 2ND AVE UNIT #590"}</p>
                <p className="text-textBody">{companyInfo?.address.city || "BOCA RATON"}, {companyInfo?.address.state || "Florida"} {companyInfo?.address.zip || "33431"}</p>
                <p className="text-textBody mt-4">Tax ID: {companyInfo?.taxId || "38-4369206"}</p>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="mb-8 pb-8 border-b border-stroke">
              <p className="text-body-sm-semiBold text-primary-100 mb-4 uppercase tracking-wider">
                Bill To
              </p>
              <p className="text-body-lg text-boneWhite font-medium">
                {invoice.companyName}
              </p>
              <p className="text-body-lg text-textBody mt-2">
                {invoice.address}
              </p>
            </div>

            {/* Services Section */}
            <div className="mb-8 pb-8 border-b border-stroke">
              <p className="text-body-sm-semiBold text-primary-100 mb-6 uppercase tracking-wider">
                Services
              </p>
              <div className="bg-bgPrimary rounded-lg overflow-hidden border border-stroke">
                <table className="w-full text-body-sm">
                  <thead>
                    <tr className="bg-bgSecondary border-b border-stroke">
                      <th className="text-left px-6 py-4 text-textBody uppercase tracking-wider font-semibold">
                        Description
                      </th>
                      <th className="text-right px-6 py-4 text-textBody uppercase tracking-wider font-semibold">
                        Quantity
                      </th>
                      <th className="text-right px-6 py-4 text-textBody uppercase tracking-wider font-semibold">
                        Unit Value
                      </th>
                      <th className="text-right px-6 py-4 text-textBody uppercase tracking-wider font-semibold">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.services.map((service, index) => (
                      <tr
                        key={index}
                        className={`border-b border-stroke last:border-b-0 ${
                          index % 2 === 0 ? "bg-bgPrimary" : "bg-bgSecondary/30"
                        }`}
                      >
                        <td className="px-6 py-4 text-boneWhite">
                          {service.description}
                        </td>
                        <td className="px-6 py-4 text-right text-boneWhite">
                          {service.quantity}
                        </td>
                        <td className="px-6 py-4 text-right text-boneWhite">
                          ${service.unitValue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right text-primary-100 font-semibold">
                          ${(service.quantity * service.unitValue).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-bgSecondary px-6 py-4 border-t border-stroke flex justify-end">
                  <div className="text-right">
                    <p className="text-textBody text-body-xs mb-2 uppercase tracking-wider">
                      Total
                    </p>
                    <p className="text-h4 text-primary-100 font-kanit">
                      ${calculateInvoiceTotal(invoice.services).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

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
                  ${calculateInvoiceTotal(invoice.services).toFixed(2)}
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
            <div className="bg-bgPrimary rounded-lg p-6 border border-stroke">
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
              onClick={handleBackToInvoice}
              variant="outline"
              className="flex-1 border-stroke hover:bg-bgPrimary text-boneWhite flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Invoice
            </Button>
            <Button
              onClick={handlePrint}
              className="flex-1 bg-primary-100 hover:bg-primary-60 text-black font-semibold flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Print / Save as PDF
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
          </div>
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
    </>
  );
};

export default InvoiceConfirmation;
