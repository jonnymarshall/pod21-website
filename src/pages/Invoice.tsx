import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { LogoSVG } from "@/assets/icons";

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

const Invoice = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceError, setInvoiceError] = useState<string | null>(null);

  // Fetch invoice data
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch("/secrets/invoices.json");
        if (!response.ok) throw new Error("Failed to load invoices");

        const invoices: InvoiceData[] = await response.json();
        const foundInvoice = invoices.find((inv) => inv.id === invoiceId);

        if (!foundInvoice) {
          setInvoiceError(`Invoice ${invoiceId} not found`);
        } else {
          setInvoice(foundInvoice);
        }
      } catch (err) {
        setInvoiceError("Error loading invoice data");
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  const handleGeneratePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.coinbase.com/v2/prices/BTC-USD/spot"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch BTC price");
      }

      const data = await response.json();
      const btcPrice = parseFloat(data.data.amount);

      if (!invoice) {
        setError("Invoice data not available");
        setLoading(false);
        return;
      }

      const btcAmount = invoice.usdAmount / btcPrice;

      setPayment({
        btcPrice,
        btcAmount,
        lockedAt: new Date().toISOString(),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch BTC price. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentMade = () => {
    if (!payment || !invoice) return;

    navigate(`/pay/${invoiceId}/payment-registered`, {
      state: {
        invoice,
        payment,
      },
    });
  };

  if (invoiceError) {
    return (
      <div className="min-h-screen bg-bgPrimary flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="flex items-center gap-3 mb-4 p-4 bg-red-10 border border-red-100 rounded-lg">
            <AlertCircle className="text-red-100 flex-shrink-0" size={20} />
            <p className="text-red-100 font-roboto">{invoiceError}</p>
          </div>
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-primary-100 hover:bg-primary-60 text-black"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-bgPrimary flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-100" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgPrimary text-boneWhite py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Invoice Container */}
        <div className="bg-bgSecondary rounded-lg border border-stroke p-8 sm:p-12">
          {/* Header */}
          <div className="mb-12 pb-8 border-b border-stroke">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="mb-4">
                  <LogoSVG width={120} height={50} color="#bbf298" />
                </div>
                <h1 className="text-h4 mb-2">INVOICE</h1>
                <p className="text-textBody">Invoice #{invoice.id}</p>
              </div>
              <div className="text-right">
                <p className="text-body-sm-medium text-textBody">
                  Invoice Date:
                </p>
                <p className="text-body-lg-medium text-boneWhite">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Billing From Section */}
          <div className="mb-12 pb-8 border-b border-stroke">
            <p className="text-body-sm-semiBold text-primary-100 mb-4 uppercase tracking-wider">
              Billing From
            </p>
            <div className="text-body-lg">
              <p className="text-boneWhite font-medium">POD21 LLC</p>
              <p className="text-textBody">4834 NW 2ND AVE UNIT #590</p>
              <p className="text-textBody">BOCA RATON, Florida 33431</p>
              <p className="text-textBody mt-4">Tax ID: 38-4369206</p>
            </div>
          </div>

          {/* Bill To Section */}
          <div className="mb-12 pb-8 border-b border-stroke">
            <p className="text-body-sm-semiBold text-primary-100 mb-4 uppercase tracking-wider">
              Bill To
            </p>
            <p className="text-body-lg text-boneWhite font-medium">
              {invoice.customerName}
            </p>
          </div>

          {/* Amount Section */}
          <div className="mb-12 pb-8 border-b border-stroke">
            <p className="text-body-sm-semiBold text-primary-100 mb-4 uppercase tracking-wider">
              Amount Due
            </p>
            <p className="text-h3 text-primary-100 font-kanit">
              ${invoice.usdAmount.toFixed(2)}
            </p>
            <p className="text-textBody text-body-lg-medium mt-2">USD</p>
          </div>

          {/* Payment Section */}
          <div className="mb-12 pb-8 border-b border-stroke">
            <p className="text-body-sm-semiBold text-primary-100 mb-6 uppercase tracking-wider">
              Bitcoin Payment
            </p>

            {!payment ? (
              <div className="bg-bgPrimary rounded-lg p-8 text-center">
                <p className="text-boneWhite text-body-lg mb-6">
                  Click below to lock in the current Bitcoin price and generate
                  your payment QR code.
                </p>
                <Button
                  onClick={handleGeneratePayment}
                  disabled={loading}
                  className="bg-primary-100 hover:bg-primary-60 !text-carbonBlack font-semibold px-8 py-6 h-auto text-body-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={20} />
                      Fetching BTC Price...
                    </>
                  ) : (
                    "Generate Payment"
                  )}
                </Button>
                {error && (
                  <div className="mt-6 p-4 bg-red-10 border border-red-100 rounded-lg flex items-center gap-3">
                    <AlertCircle className="text-red-100 flex-shrink-0" />
                    <p className="text-red-100 text-body-sm">{error}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {/* Payment Details */}
                <div className="grid grid-cols-2 gap-8 bg-bgPrimary rounded-lg p-6">
                  <div>
                    <p className="text-textBody text-body-sm mb-2">
                      BTC Price (USD)
                    </p>
                    <p className="text-boneWhite text-h5">
                      ${payment.btcPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-textBody text-body-sm mb-2">
                      BTC Amount
                    </p>
                    <p className="text-primary-100 text-h5 font-kanit">
                      {payment.btcAmount.toFixed(8)} BTC
                    </p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-bgPrimary rounded-lg p-8 flex flex-col items-center">
                  <p className="text-textBody text-body-sm mb-6">
                    Scan to pay with Bitcoin
                  </p>
                  <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center overflow-hidden p-4">
                    <QRCodeSVG
                      value={`bitcoin:${invoice.btcAddress}?amount=${payment.btcAmount.toFixed(8)}&label=${encodeURIComponent(invoice.customerName)}&message=${encodeURIComponent(`Invoice ${invoice.id}`)}`}
                      size={240}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <p className="text-textBody text-body-xs mt-6 text-center">
                    Bitcoin Address:
                    <br />
                    <code className="text-primary-60 text-body-xs-medium break-all mt-2 block">
                      {invoice.btcAddress}
                    </code>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => setPayment(null)}
                    variant="outline"
                    className="flex-1 border-stroke hover:bg-bgPrimary text-boneWhite"
                  >
                    Go Back
                  </Button>
                  <Button
                    onClick={handlePaymentMade}
                    className="flex-1 bg-primary-100 hover:bg-primary-60 text-black font-semibold flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Payment Made
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Notes */}
          <div className="text-center pt-4">
            <p className="text-textBody text-body-xs">
              Thank you for your business. If you have any questions about this
              invoice, please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
