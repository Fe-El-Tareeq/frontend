import type { FC } from "react";
import {
  FileText,
  Globe,
  Check,
  UserCheck,
  Car,
  Package,
  Zap,
  XCircle,
  AlertCircle,
  Shield,
  Edit3,
} from "lucide-react";

export const TermsOfServiceContent: FC = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
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
            هذه الوثيقة تُحدد الحقوق والالتزامات القانونية لكل طرف عند استخدام منصة بطريقك. قراءتها ضرورة قانونية.
          </p>
        </div>
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70">
          <span>آخر تحديث: 1 يوليو 2026</span>
          <span>تسري على جميع المستخدمين</span>
        </div>
      </div>

      {/* Article 1 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <FileText className="h-4 w-4 text-[#123A68] dark:text-[#38BDF8]" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 1: مقدمة وقبول الشروط</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          مرحباً بك في منصة بطريقك — منصة الوساطة المجتمعية لنقل الأغراض. هذه الوثيقة تحدد الشروط القانونية التي تحكم استخدامك للمنصة وتُرجى قراءتها بعناية قبل البدء.
        </p>
        <div className="rounded-2xl bg-slate-50 dark:bg-[#0B1E36] p-3 text-[11px] text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/10">
          ℹ️ آخر تحديث: 1 يوليو 2026 • الإصدار 1.0. تسري هذه الشروط على جميع المستخدمين المسجلين وغير المسجلين.
        </div>
      </div>

      {/* Article 2 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Globe className="h-4 w-4 text-[#123A68] dark:text-[#38BDF8]" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 2: وصف الخدمة وطبيعتها</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          بطريقك هي منصة وساطة رقمية تربط بين المسافرين وأصحاب الطلبات بهدف تسهيل نقل الأغراض الشخصية الصغيرة بين المناطق المتاحة.
        </p>
        <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 pr-2">
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>ربط المسافرين بأصحاب الطلبات عبر خوارزمية تطابق ذكية</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>توفير نظام توكنز آمن لنشر الطلبات</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>دعم فني وتواصل مستمر على مدار الساعة</span>
          </li>
        </ul>
        <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-3 text-[11px] text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900/40 font-bold">
          ⚠️ المنصة ليست شركة شحن ولا تضمن تنفيذ أي طلب؛ الاتفاق الفعلي وتنفيذه يقع بشكل مباشر بين المستخدمين.
        </div>
      </div>

      {/* Article 3 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <UserCheck className="h-4 w-4 text-[#123A68] dark:text-[#38BDF8]" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 3: أهلية الاستخدام والتسجيل</h3>
        </div>
        <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 pr-2">
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>أن يكون عمر المستخدم 18 سنة فأكثر أو الحصول على إذن ولي الأمر</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>تقديم معلومات صحيحة ودقيقة عند التسجيل وتأكيد رقم الهاتف</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>الموافقة على سياسة الخصوصية وشروط الاستخدام</span>
          </li>
        </ul>
      </div>

      {/* Article 4 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Car className="h-4 w-4 text-[#123A68] dark:text-[#38BDF8]" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 4: التزامات المسافر</h3>
        </div>
        <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 pr-2">
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>نشر معلومات صحيحة ودقيقة عن الرحلة والمسار والموعد</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>الحفاظ على سلامة الغرض طوال فترة النقل وتسليمه للمستلم المحدد</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>عدم فتح أي طرد أو الاطلاع على محتوياته</span>
          </li>
        </ul>
      </div>

      {/* Article 5 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Package className="h-4 w-4 text-[#123A68] dark:text-[#38BDF8]" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 5: التزامات طالب الخدمة</h3>
        </div>
        <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 pr-2">
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>وصف الغرض وصفاً دقيقاً (نوعه، وزنه، تعليمات التعامل معه)</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>دفع التوكن المطلوب قبل نشر الطلب (توكن واحد لكل طلب)</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>التواجد في الموعد والمكان المتفق عليهما للتسليم والاستلام</span>
          </li>
        </ul>
        <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-3 text-[11px] text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900/40 font-bold">
          ⛔ يُحظر تماماً إرسال أي مواد مخالفة للقانون أو خطرة أو أموال نقدية غير مصرح بها.
        </div>
      </div>

      {/* Article 6 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Zap className="h-4 w-4 text-[#F36F21]" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 6: نظام التوكنز والمدفوعات</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden divide-y divide-slate-100 dark:divide-white/10 text-[11px]">
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#0B1E36]">
            <span className="font-black text-[#123A68] dark:text-white">1 ₪ للتوكن الواحد</span>
            <span className="text-text-muted dark:text-slate-400">سعر التوكن الأساسي</span>
          </div>
          <div className="flex items-center justify-between p-2.5">
            <span className="font-black text-[#123A68] dark:text-white">توكن واحد لكل طلب</span>
            <span className="text-text-muted dark:text-slate-400">استخدام التوكن</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#0B1E36]">
            <span className="font-black text-[#123A68] dark:text-white">3 أشهر من الشراء</span>
            <span className="text-text-muted dark:text-slate-400">صلاحية التوكنز</span>
          </div>
          <div className="flex items-center justify-between p-2.5">
            <span className="font-black text-[#123A68] dark:text-white">5 توكنز</span>
            <span className="text-text-muted dark:text-slate-400">الحد الأدنى للشراء</span>
          </div>
        </div>
      </div>

      {/* Article 7 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 7: سياسة الإلغاء والاسترداد</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          في حال إلغاء الرحلة من قبل المسافر قبل موعدها بساعتين، يُعاد التوكن كاملاً لصاحب الطلب. يمكن استرداد مبالغ الباقات غير المستخدمة خلال 7 أيام من الشراء.
        </p>
      </div>

      {/* Article 8 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 8: المحتوى والأغراض المحظورة</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          يُحظر تماماً نقل الأسلحة، المواد القابلة للاشتعال، المخدرات، الأموال النقدية الكبيرة، الأغراض المسروقة، أو الحيوانات الحية.
        </p>
      </div>

      {/* Article 9 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Shield className="h-4 w-4 text-[#123A68] dark:text-[#38BDF8]" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 9: حدود المسؤولية والتعويض</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          تعمل المنصة كوسيط تقني فقط، وتقتصر مسؤولية المنصة القصوى في أي نزاع على إعادة قيمة التوكنات المستخدمة فقط.
        </p>
      </div>

      {/* Article 10 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Edit3 className="h-4 w-4 text-[#123A68] dark:text-[#38BDF8]" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 10: التعديلات وإنهاء الخدمة</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          تحتفظ المنصة بحق تعديل هذه الشروط مع إشعار المستخدمين قبل 15 يوماً عبر التطبيق.
        </p>
      </div>
    </div>
  );
};
