import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  FileText,
  Shield,
  Check,
  AlertCircle,
  Globe,
  UserCheck,
  Car,
  Package,
  Zap,
  XCircle,
  Lock,
  Users,
  Activity,
  UserX,
  RefreshCw,
  Mail,
  Edit3,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";

export default function TermsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"TERMS" | "PRIVACY">("TERMS");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeAndBack = () => {
    if (isAgreed) {
      navigate(-1);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">
              الشروط القانونية والخصوصية
            </h1>
            <p className="text-[11px] text-text-secondary mt-0.5">
              آخر تحديث: 1 يوليو 2026 • الإصدار 1.2
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-white p-1 border border-slate-200/90 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab("PRIVACY")}
            className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === "PRIVACY"
                ? "bg-[#123A68] text-white shadow-xs"
                : "text-slate-600 hover:text-[#123A68]"
            }`}
          >
            سياسة الخصوصية
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("TERMS")}
            className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === "TERMS"
                ? "bg-[#123A68] text-white shadow-xs"
                : "text-slate-600 hover:text-[#123A68]"
            }`}
          >
            شروط الاستخدام
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: شروط الاستخدام (Terms of Service) */}
        {/* ========================================================================= */}
        {activeTab === "TERMS" && (
          <div className="space-y-4">
            {/* Dark Navy Hero Banner */}
            <div className="rounded-3xl bg-[#123A68] p-5 text-white shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/70">10 أقسام</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-black">شروط الاستخدام</h2>
                <p className="text-xs text-white/80 leading-relaxed mt-1">
                  هذه الوثيقة تُحدد الحقوق والالتزامات القانونية لكل طرف عند
                  استخدام منصة بطريقك. قراءتها ضرورة قانونية.
                </p>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70">
                <span>آخر تحديث: 1 يوليو 2026</span>
                <span>تسري على جميع المستخدمين</span>
              </div>
            </div>

            {/* Article 1 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <FileText className="h-4 w-4 text-[#123A68]" />
                <h3 className="font-black text-[#123A68]">
                  المادة 1: مقدمة وقبول الشروط
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                مرحباً بك في منصة بطريقك — منصة الوساطة المجتمعية لنقل الأغراض.
                هذه الوثيقة تحدد الشروط القانونية التي تحكم استخدامك للمنصة
                وتُرجى قراءتها بعناية قبل البدء.
              </p>
              <div className="rounded-2xl bg-slate-50 p-3 text-[11px] text-slate-500 border border-slate-100">
                ℹ️ آخر تحديث: 1 يوليو 2026 • الإصدار 1.0. تسري هذه الشروط على جميع
                المستخدمين المسجلين وغير المسجلين.
              </div>
            </div>

            {/* Article 2 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Globe className="h-4 w-4 text-[#123A68]" />
                <h3 className="font-black text-[#123A68]">
                  المادة 2: وصف الخدمة وطبيعتها
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                بطريقك هي منصة وساطة رقمية تربط بين المسافرين وأصحاب الطلبات بهدف
                تسهيل نقل الأغراض الشخصية الصغيرة بين المناطق المتاحة.
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-600 pr-2">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>ربط المسافرين بأصحاب الطلبات عبر خوارزمية تطابق ذكية</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>توفير نظام توكنز آمن لنشر الطلبات</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>دعم فني وتواصل مستمر على مدار الساعة</span>
                </li>
              </ul>
              <div className="rounded-2xl bg-rose-50 p-3 text-[11px] text-rose-800 border border-rose-200 font-bold">
                ⚠️ المنصة ليست شركة شحن ولا تضمن تنفيذ أي طلب؛ الاتفاق الفعلي
                وتنفيذه يقع بشكل مباشر بين المستخدمين.
              </div>
            </div>

            {/* Article 3 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <UserCheck className="h-4 w-4 text-[#123A68]" />
                <h3 className="font-black text-[#123A68]">
                  المادة 3: أهلية الاستخدام والتسجيل
                </h3>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-600 pr-2">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>أن يكون عمر المستخدم 18 سنة فأكثر أو الحصول على إذن ولي الأمر</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>تقديم معلومات صحيحة ودقيقة عند التسجيل وتأكيد رقم الهاتف</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>الموافقة على سياسة الخصوصية وشروط الاستخدام</span>
                </li>
              </ul>
            </div>

            {/* Article 4 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Car className="h-4 w-4 text-[#123A68]" />
                <h3 className="font-black text-[#123A68]">
                  المادة 4: التزامات المسافر
                </h3>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-600 pr-2">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>نشر معلومات صحيحة ودقيقة عن الرحلة والمسار والموعد</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>الحفاظ على سلامة الغرض طوال فترة النقل وتسليمه للمستلم المحدد</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>عدم فتح أي طرد أو الاطلاع على محتوياته</span>
                </li>
              </ul>
            </div>

            {/* Article 5 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Package className="h-4 w-4 text-[#123A68]" />
                <h3 className="font-black text-[#123A68]">
                  المادة 5: التزامات طالب الخدمة
                </h3>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-600 pr-2">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>وصف الغرض وصفاً دقيقاً (نوعه، وزنه، تعليمات التعامل معه)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>دفع التوكن المطلوب قبل نشر الطلب (توكن واحد لكل طلب)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>التواجد في الموعد والمكان المتفق عليهما للتسليم والاستلام</span>
                </li>
              </ul>
              <div className="rounded-2xl bg-rose-50 p-3 text-[11px] text-rose-800 border border-rose-200 font-bold">
                ⛔ يُحظر تماماً إرسال أي مواد مخالفة للقانون أو خطرة أو أموال نقدية غير مصرح بها.
              </div>
            </div>

            {/* Article 6: Tokens */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Zap className="h-4 w-4 text-[#F36F21]" />
                <h3 className="font-black text-[#123A68]">
                  المادة 6: نظام التوكنز والمدفوعات
                </h3>
              </div>
              <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-[11px]">
                <div className="flex items-center justify-between p-2.5 bg-slate-50">
                  <span className="font-black text-[#123A68]">1 ₪ للتوكن الواحد</span>
                  <span className="text-text-muted">سعر التوكن الأساسي</span>
                </div>
                <div className="flex items-center justify-between p-2.5">
                  <span className="font-black text-[#123A68]">توكن واحد لكل طلب</span>
                  <span className="text-text-muted">استخدام التوكن</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50">
                  <span className="font-black text-[#123A68]">3 أشهر من الشراء</span>
                  <span className="text-text-muted">صلاحية التوكنز</span>
                </div>
                <div className="flex items-center justify-between p-2.5">
                  <span className="font-black text-[#123A68]">5 توكنز</span>
                  <span className="text-text-muted">الحد الأدنى للشراء</span>
                </div>
              </div>
            </div>

            {/* Article 7: Cancellation */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <XCircle className="h-4 w-4 text-rose-600" />
                <h3 className="font-black text-[#123A68]">
                  المادة 7: سياسة الإلغاء والاسترداد
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                في حال إلغاء الرحلة من قبل المسافر قبل موعدها بساعتين، يُعاد التوكن
                كاملاً لصاحب الطلب. يمكن استرداد مبالغ الباقات غير المستخدمة خلال 7 أيام من الشراء.
              </p>
            </div>

            {/* Article 8: Prohibited */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <AlertCircle className="h-4 w-4 text-rose-600" />
                <h3 className="font-black text-[#123A68]">
                  المادة 8: المحتوى والأغراض المحظورة
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                يُحظر تماماً نقل الأسلحة، المواد القابلة للاشتعال، المخدرات، الأموال النقدية الكبيرة، الأغراض المسروقة، أو الحيوانات الحية.
              </p>
            </div>

            {/* Article 9: Liability */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Shield className="h-4 w-4 text-[#123A68]" />
                <h3 className="font-black text-[#123A68]">
                  المادة 9: حدود المسؤولية والتعويض
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                تعمل المنصة كوسيط تقني فقط، وتقتصر مسؤولية المنصة القصوى في أي نزاع على إعادة قيمة التوكنات المستخدمة فقط.
              </p>
            </div>

            {/* Article 10: Amendments */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Edit3 className="h-4 w-4 text-[#123A68]" />
                <h3 className="font-black text-[#123A68]">
                  المادة 10: التعديلات وإنهاء الخدمة
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                تحتفظ المنصة بحق تعديل هذه الشروط مع إشعار المستخدمين قبل 15 يوماً عبر التطبيق.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: سياسة الخصوصية (Privacy Policy) */}
        {/* ========================================================================= */}
        {activeTab === "PRIVACY" && (
          <div className="space-y-4">
            {/* Emerald Green Hero Banner */}
            <div className="rounded-3xl bg-[#065F46] p-5 text-white shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/70">9 أقسام</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Shield className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-black">سياسة الخصوصية</h2>
                <p className="text-xs text-white/80 leading-relaxed mt-1">
                  توضح هذه الوثيقة كيفية جمع بياناتك واستخدامها وحمايتها. خصوصيتك حق
                  أصيل نلتزم باحترامه.
                </p>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70">
                <span>آخر تحديث: 1 يوليو 2026</span>
                <span>تسري على جميع المستخدمين</span>
              </div>
            </div>

            {/* Privacy Section 1 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <FileText className="h-4 w-4 text-emerald-700" />
                <h3 className="font-black text-[#123A68]">
                  المادة 1: المعلومات التي نجمعها
                </h3>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-600 pr-2">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>الاسم الكامل ورقم الهاتف والموقع الجغرافي (المدينة والحي)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>سجل الرحلات والطلبات والمعاملات المالية للتوكنز</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>بيانات التقييمات والمراسلات داخل المنصة</span>
                </li>
              </ul>
            </div>

            {/* Privacy Section 2 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Activity className="h-4 w-4 text-emerald-700" />
                <h3 className="font-black text-[#123A68]">
                  المادة 2: كيف نستخدم بياناتك
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                نستخدم البيانات لتشغيل الخدمات، ومطابقة الطلبات مع المسافرين المناسبين، وإرسال الإشعارات، ومنع الاحتيال، وتقديم الدعم الفني.
              </p>
              <div className="rounded-2xl bg-rose-50 p-3 text-[11px] text-rose-800 border border-rose-200 font-bold">
                🚫 لا نبيع أو نؤجر بياناتك لأي طرف ثالث لأغراض إعلانية على الإطلاق.
              </div>
            </div>

            {/* Privacy Section 3 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Users className="h-4 w-4 text-emerald-700" />
                <h3 className="font-black text-[#123A68]">
                  المادة 3: مشاركة البيانات مع الأطراف الثالثة
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                تتم مشاركة الاسم ورقم الهاتف مع الطرف الآخر في نفس الصفقة فقط بعد قبول العرض رسمياً لتمكين التواصل والتسليم.
              </p>
            </div>

            {/* Privacy Section 4 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Lock className="h-4 w-4 text-emerald-700" />
                <h3 className="font-black text-[#123A68]">
                  المادة 4: تخزين البيانات وأمانها
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                تُشفر جميع البيانات المنقولة عبر SSL/TLS وبروتوكول HTTPS، وتُحفظ كلمات المرور باستخدام خوارزميات التشفير المتقدمة bcrypt مع دعم المصادقة الثنائية.
              </p>
            </div>

            {/* Privacy Section 5 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Globe className="h-4 w-4 text-emerald-700" />
                <h3 className="font-black text-[#123A68]">
                  المادة 5: ملفات تعريف الارتباط (Cookies)
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                نستخدم ملفات الارتباط الضرورية لتأمين الجلسات وتسجيل الدخول وحفظ التفضيلات.
              </p>
            </div>

            {/* Privacy Section 6 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Check className="h-4 w-4 text-emerald-700" />
                <h3 className="font-black text-[#123A68]">
                  المادة 6: حقوقك فيما يخص بياناتك
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                لك كامل الحق في طلب نسخة من بياناتك، أو تعديلها، أو حذف حسابك وبياناتك نهائياً في أي وقت.
              </p>
            </div>

            {/* Privacy Section 7 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <UserX className="h-4 w-4 text-emerald-700" />
                <h3 className="font-black text-[#123A68]">
                  المادة 7: خصوصية الأطفال
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                لا تستهدف المنصة الأطفال دون سن 18 عاماً ولا تجمع بياناتهم عن قصد.
              </p>
            </div>

            {/* Privacy Section 8 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <RefreshCw className="h-4 w-4 text-emerald-700" />
                <h3 className="font-black text-[#123A68]">
                  المادة 8: التحديثات على سياسة الخصوصية
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                نحتفظ بحق تحديث السياسة دورياً ونرسل إشعاراً مباشراً إلى رقم هاتفك أو بريدك المسجل عند حدوث تغييرات جوهرية.
              </p>
            </div>

            {/* Privacy Section 9 */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs text-right">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <Mail className="h-4 w-4 text-emerald-700" />
                <h3 className="font-black text-[#123A68]">
                  المادة 9: التواصل معنا
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                لأي استفسار يخص خصوصيتك، تواصل مع فريق الخصوصية عبر البريد: privacy@btareeqak.com
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Bottom Acceptance Card (الحال=1.png & الحال=2.png) */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-4 text-right">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Check className="h-5 w-5 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#123A68]">
                إقرار بالموافقة
              </h3>
              <p className="text-[10.5px] text-text-muted mt-0.5">
                بالنقر على "أوافق"، فإنك تُقرّ بأنك قرأت وفهمت وقبلت شروط
                الاستخدام وسياسة الخصوصية بشكل كامل.
              </p>
            </div>
          </div>

          {/* Radio / Checkbox Click Area */}
          <button
            type="button"
            onClick={() => setIsAgreed(!isAgreed)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer text-right ${
              isAgreed
                ? "bg-[#F0FDF4] border-emerald-400 ring-1 ring-emerald-300"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                isAgreed
                  ? "border-[#123A68] bg-[#123A68] text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {isAgreed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
            </div>

            <span className="text-xs font-bold text-slate-700 max-w-[85%]">
              أؤكد أنني قرأت وأوافق على شروط الاستخدام و سياسة الخصوصية الخاصة
              بمنصة بطريقك.
            </span>
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleAgreeAndBack}
              disabled={!isAgreed}
              className={`flex-1 flex h-12 items-center justify-center gap-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                isAgreed
                  ? "bg-[#059669] text-white shadow-md hover:bg-emerald-700 active:scale-98"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isAgreed ? (
                <>
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>تم الموافقة — العودة للإعدادات</span>
                </>
              ) : (
                <span>يجب الموافقة أولاً</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 h-12 flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-xs font-black text-slate-600 hover:bg-slate-50 active:scale-98 transition-all cursor-pointer"
            >
              رجوع
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}

