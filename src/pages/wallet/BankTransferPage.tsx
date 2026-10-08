import { useState, useEffect, useRef, type ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, Check, Loader2 } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { usePayments } from "../../hooks/usePayments";
import { translateApiError } from "../../i18n";
import type { TokenPackage } from "./BuyTokensPackages";
import type { PaymentInvoice } from "../../types";

// Modular sub-components
import { PaymentStepper } from "../../components/wallet/PaymentStepper";
import { BankTransferDetailsCard } from "../../components/wallet/BankTransferDetailsCard";
import { ReceiptUploaderCard } from "../../components/wallet/ReceiptUploaderCard";

export default function BankTransferPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { createInvoice, uploadReceipt, isCreatingInvoice, isUploadingReceipt } =
    usePayments();

  const pkg: TokenPackage = location.state?.package || {
    id: "pkg-pro",
    name: "الباقة الاحترافية",
    subtitle: "للمستخدمين الدائمين والنشطين",
    tokens: 50,
    priceNis: 15,
    ratePerToken: "2 ₪ لكل توكن نسبة التوفير 40%",
    features: [],
  };

  const [invoice, setInvoice] = useState<PaymentInvoice | null>(
    location.state?.invoice || null,
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!invoice && pkg.id) {
      createInvoice({
        packageId: pkg.id,
        method: "BANK_TRANSFER",
      })
        .then((res) => {
          if (res.data?.invoice) {
            setInvoice(res.data.invoice);
          }
        })
        .catch((err) => {
          console.warn("Could not create bank invoice:", err);
        });
    }
  }, [invoice, pkg.id, createInvoice]);

  const transferRef =
    invoice?.referenceCode ||
    (invoice?.id
      ? `REF-${invoice.id.slice(0, 8).toUpperCase()}`
      : "ORD-1-MT06H0QG");
  const accountNumber =
    invoice?.bankDetails?.accountNumber ||
    invoice?.bankDetails?.iban ||
    "PS12 PALS 5678 1234 0000 1234";
  const beneficiaryName =
    invoice?.bankDetails?.beneficiaryName || "منصة بطريقك";
  const bankName =
    invoice?.bankDetails?.bankName || "البنك الإسلامي الفلسطيني";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
      setShowWarning(false);
      setErrorMessage(null);
    }
  };

  const handleCompleted = async () => {
    if (!receiptFile) {
      setShowWarning(true);
      return;
    }

    try {
      setErrorMessage(null);
      let targetInvoiceId = invoice?.id;
      if (!targetInvoiceId) {
        const invRes = await createInvoice({
          packageId: pkg.id,
          method: "BANK_TRANSFER",
        });
        targetInvoiceId = invRes.data.invoice.id;
        setInvoice(invRes.data.invoice);
      }

      if (targetInvoiceId) {
        await uploadReceipt({
          invoiceId: targetInvoiceId,
          receiptImage: receiptFile,
        });
      }

      navigate("/wallet/payment-success", {
        state: { package: pkg, method: "BANK", invoiceId: targetInvoiceId },
      });
    } catch (err: unknown) {
      setErrorMessage(translateApiError(err));
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">إتمام الدفع</h1>
            <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
              بيانات التحويل البنكي المباشر
            </p>
          </div>
        </div>

        {/* 4-Step Stepper */}
        <PaymentStepper currentStep={3} />

        {errorMessage && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold rounded-2xl border border-red-200 dark:border-red-900/40">
            {errorMessage}
          </div>
        )}

        {/* Bank Transfer Details Card */}
        <BankTransferDetailsCard
          bankName={bankName}
          beneficiaryName={beneficiaryName}
          accountNumber={accountNumber}
          transferRef={transferRef}
          priceNis={pkg.priceNis}
          copiedField={copiedField}
          onCopy={handleCopy}
        />

        {/* Upload Receipt Card */}
        <ReceiptUploaderCard
          receiptFile={receiptFile}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          onRemoveFile={() => setReceiptFile(null)}
          showWarning={showWarning}
        />

        {/* Action Submit Button */}
        <button
          type="button"
          disabled={isUploadingReceipt || isCreatingInvoice}
          onClick={handleCompleted}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-[#123A68] active:scale-98 disabled:opacity-50 transition-all cursor-pointer shadow-md"
        >
          {isUploadingReceipt ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>جاري إرسال الإشعار...</span>
            </>
          ) : (
            <>
              <Check className="h-4 w-4 stroke-3" />
              <span>إرسال إشعار التحويل وتأكيد الطلب</span>
            </>
          )}
        </button>
      </div>
    </MobileContainer>
  );
}
