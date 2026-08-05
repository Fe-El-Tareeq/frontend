import { useState } from 'react';

export default function Signup() {
  const [step, setStep] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');

  const handleNextStep = (e: any) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitAll = (e: any) => {
    e.preventDefault();
    console.log('تم إرسال كافة البيانات:', { name, phone, password, city, neighborhood });
  };

  return (
    <div className="login-page">
      <div className="login-card ">
        
        {/* الشعار الموحد الممركز */}
        <div className="logo-container">
          <img 
            src="/logo.png" 
            alt="شعار بطريقتك" 
            className="logo-img" 
          />
        </div>

        {/* العناوين الثابتة بحجم الشاشة الأولى */}
        <h2 className="welcome-title">إنشاء حساب جديد</h2>
        <p className="welcome-subtitle">انضم إلى مجتمع بطريقتك</p>
        {/* العناوين الثابتة */}
        {/* تعديل الشروط لتلوين خط واحد فقط لكل خطوة حسب الفيجما */}
        <div className="steps-indicator-container">
          <div className={`step-line ${step === 1 ? 'active' : ''}`}></div>
          <div className={`step-line ${step === 2 ? 'active' : ''}`}></div>
        </div>



        {/* الخطوة الأولى */}
        {step === 1 && (
            
          <form onSubmit={handleNextStep} className="signup-form-wrapper">
            <div className="form-group">
              <label>الاسم الكامل *</label>
              <input
                type="text"
                placeholder="أدخل اسمك"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>رقم الهاتف *</label>
              <input
                type="tel"
                placeholder="059X-XXX-XXX"
                className="phone-input"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>كلمة المرور *</label>
              <input
                type="password"
                placeholder="8 أحرف على الأقل"
                className="password-input"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn-submit" 
              style={{ backgroundColor: '#FF7A00' }}
            >
              التالي
            </button>
          </form>
        )}

        {/* الخطوة الثانية */}
        {step === 2 && (
          <form onSubmit={handleSubmitAll} >
            <div className="form-group">
              <label>المدينة</label>
              <input
                type="text"
                placeholder="اختر المدينة"
                value={city}
                onChange={(e: any) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>الحي</label>
              <input
                type="text"
                placeholder="مثال: الرمال"
                value={neighborhood}
                onChange={(e: any) => setNeighborhood(e.target.value)}
                required
              />
            </div>

            {/* نص الشروط والأحكام المربوط بالكلاسات الجديدة للخطوط البرتقالية */}
            <p className="terms-text">
              بإنشاء الحساب، أوافق على <span className="orange-link">شروط الاستخدام</span> و <span className="orange-link">سياسة الخصوصية</span>.
            </p>

            <button 
              type="submit" 
              className="btn-submit" 
              style={{ backgroundColor: '#FF7A00' }}
            >
              إنشاء الحساب
            </button>
            
            <div className="back-step-btn" onClick={() => setStep(1)}>
              العودة للخطوة السابقة
            </div>
          </form>
        )}

        <p className="footer-text" style={{ marginTop: '12px' }}>
          لديك حساب بالفعل؟ 
          <a href="#login" className="signup-link" style={{ color: '#1C3F72' }}>تسجيل الدخول</a>
        </p>

      </div>
    </div>
  );
}
