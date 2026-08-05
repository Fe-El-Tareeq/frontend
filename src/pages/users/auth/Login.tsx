import { useState } from 'react';

export default function Login() {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('تسجيل الدخول:', { phone, password });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        
        {/* استدعاء الشعار مباشرة من مجلد public */}
        <div className="logo-container">
         <img 
          src="/logo.png" 
          alt="شعار بطريقتك" 
          className="logo-img" 
      />
</div>


        {/* العناوين */}
        <h2 className="welcome-title">أهلاً بعودتك!</h2>
        <p className="welcome-subtitle">سجل دخولك للمتابعة</p>

        {/* النموذج */}
        <form onSubmit={handleSubmit}>
          
          {/* رقم الهاتف */}
          <div className="form-group">
            <label>رقم الهاتف</label>
            <input
              type="tel"
              placeholder="059X-XXX-XXX"
              className="phone-input"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          {/* كلمة المرور */}
          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              placeholder="••••••••"
              dir="ltr"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* نسيت كلمة المرور؟ */}
          <div className="forgot-link-container">
            <a href="#forgot" className="forgot-link">نسيت كلمة المرور؟</a>
          </div>

          {/* زر تسجيل الدخول كحلي */}
          <button type="submit" className="btn-submit">
            تسجيل الدخول
          </button>
        </form>

        {/* إنشاء حساب جديد برتقالي */}
        <p className="footer-text">
          ليس لديك حساب؟ 
          <a href="#signup" className="signup-link">إنشاء حساب جديد</a>
        </p>

      </div>
    </div>
  );
}
