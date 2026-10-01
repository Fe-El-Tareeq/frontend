import type { FC } from "react";
import {
  Shield,
  FileText,
  Check,
  Activity,
  Users,
  Lock,
  Globe,
  UserX,
  RefreshCw,
  Mail,
} from "lucide-react";

export const PrivacyPolicyContent: FC = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
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
            توضح هذه الوثيقة كيفية جمع بياناتك واستخدامها وحمايتها. خصوصيتك حق أصيل نلتزم باحترامه.
          </p>
        </div>
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70">
          <span>آخر تحديث: 1 يوليو 2026</span>
          <span>تسري على جميع المستخدمين</span>
        </div>
      </div>

      {/* Privacy Section 1 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <FileText className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 1: المعلومات التي نجمعها</h3>
        </div>
        <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 pr-2">
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>الاسم الكامل ورقم الهاتف والموقع الجغرافي (المدينة والحي)</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>سجل الرحلات والطلبات والمعاملات المالية للتوكنز</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>بيانات التقييمات والمراسلات داخل المنصة</span>
          </li>
        </ul>
      </div>

      {/* Privacy Section 2 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Activity className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 2: كيف نستخدم بياناتك</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          نستخدم البيانات لتشغيل الخدمات، ومطابقة الطلبات مع المسافرين المناسبين، وإرسال الإشعارات، ومنع الاحتيال، وتقديم الدعم الفني.
        </p>
        <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-3 text-[11px] text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900/40 font-bold">
          🚫 لا نبيع أو نؤجر بياناتك لأي طرف ثالث لأغراض إعلانية على الإطلاق.
        </div>
      </div>

      {/* Privacy Section 3 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Users className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 3: مشاركة البيانات مع الأطراف الثالثة</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          تتم مشاركة الاسم ورقم الهاتف مع الطرف الآخر في نفس الصفقة فقط بعد قبول العرض رسمياً لتمكين التواصل والتسليم.
        </p>
      </div>

      {/* Privacy Section 4 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Lock className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 4: تخزين البيانات وأمانها</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          تُشفر جميع البيانات المنقولة عبر SSL/TLS وبروتوكول HTTPS، وتُحفظ كلمات المرور باستخدام خوارزميات التشفير المتقدمة bcrypt مع دعم المصادقة الثنائية.
        </p>
      </div>

      {/* Privacy Section 5 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Globe className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 5: ملفات تعريف الارتباط (Cookies)</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          نستخدم ملفات الارتباط الضرورية لتأمين الجلسات وتسجيل الدخول وحفظ التفضيلات.
        </p>
      </div>

      {/* Privacy Section 6 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 6: حقوقك فيما يخص بياناتك</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          لك كامل الحق في طلب نسخة من بياناتك، أو تعديلها، أو حذف حسابك وبياناتك نهائياً في أي وقت.
        </p>
      </div>

      {/* Privacy Section 7 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <UserX className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 7: خصوصية الأطفال</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          لا تستهدف المنصة الأطفال دون سن 18 عاماً ولا تجمع بياناتهم عن قصد.
        </p>
      </div>

      {/* Privacy Section 8 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <RefreshCw className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 8: التحديثات على سياسة الخصوصية</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          نحتفظ بحق تحديث السياسة دورياً ونرسل إشعاراً مباشراً إلى رقم هاتفك أو بريدك المسجل عند حدوث تغييرات جوهرية.
        </p>
      </div>

      {/* Privacy Section 9 */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5 text-xs text-right">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-white/10">
          <Mail className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="font-black text-[#123A68] dark:text-white">المادة 9: التواصل معنا</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          لأي استفسار يخص خصوصيتك، تواصل مع فريق الخصوصية عبر البريد: privacy@btareeqak.com
        </p>
      </div>
    </div>
  );
};
