import { AppLayout } from "../../components/layout/AppLayout";
import { Card } from "../../components/ui/card/Card";
import { ShieldCheck, FileText, CheckCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <AppLayout
      headerProps={{
        title: "الشروط وسياسة الخصوصية",
        subtitle: "ميثاق مجتمع في الطريق للأمان والخصوصية",
        showBack: true,
      }}
      showBottomNav={false}
    >
      <div className="space-y-4 pb-8 text-right">
        {/* Intro Card */}
        <Card variant="elevated">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <Card.Title>ميثاق الأمان والموثوقية</Card.Title>
          </div>
          <p className="text-[13px] text-text-secondary leading-relaxed">
            منصة "في الطريق" هي شبكة تضامنية تعتمد على الثقة المتبادلة بين الجيران لنقل الاحتياجات والمشاوير اليومية في الأوقات الصعبة.
          </p>
        </Card>

        {/* Terms Sections */}
        <Card>
          <Card.Header>
            <Card.Title>1. شروط استخدام المنصة</Card.Title>
            <FileText className="h-4 w-4 text-primary" />
          </Card.Header>

          <Card.Body>
            <ul className="text-[13px] text-text-secondary space-y-2 leading-relaxed list-disc pr-4">
              <li>يتحمل طالب المشوار مسؤولية دقة تفاصيل الأغراض المكتوبة.</li>
              <li>يلتزم المسافر بنقل الأغراض بأمان وتسليمها إلى صاحب الطلب في الوقت المتفق عليه.</li>
              <li>يمنع منعاً باتاً طلب أو نقل أي مواد محظورة أو خطرة.</li>
              <li>التقييمات المتبادلة تبني السمعة والموثوقية للجميع داخل النظام.</li>
            </ul>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>2. سياسة الخصوصية وحماية البيانات</Card.Title>
            <CheckCircle className="h-4 w-4 text-success" />
          </Card.Header>

          <Card.Body>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              نحن نلتزم بحماية بياناتك الشخصية؛ لا يتم مشاركة رقم هاتفك إلا مع الطرف الآخر بعد تأكيد قبول المشوار لضمان سهولة التواصل. يتم حفظ بيانات الموقع والطلبات بأعلى معايير التشفير والأمان.
            </p>
          </Card.Body>
        </Card>
      </div>
    </AppLayout>
  );
}
