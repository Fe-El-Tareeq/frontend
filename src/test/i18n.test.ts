import { describe, it, expect } from "vitest";
import {
  translateApiMessage,
  translateSuccessMessage,
} from "../i18n";
import { getApiErrorMessage } from "../utils/apiError";

describe("i18n Translation Catalog & API Error Integration", () => {
  it("translates exact backend error messages to Arabic", () => {
    expect(translateApiMessage("Invalid phone or password.")).toBe(
      "رقم الهاتف أو كلمة المرور غير صحيحة.",
    );
    expect(translateApiMessage("OTP has expired.")).toBe(
      "انتهت صلاحية رمز التحقق.",
    );
    expect(translateApiMessage("Insufficient token balance")).toBe(
      "رصيد التوكنز غير كافٍ لإتمام العملية.",
    );
    expect(translateApiMessage("Travelers cannot accept their own errand.")).toBe(
      "لا يمكن للمسافر قبول طلبه الخاص.",
    );
  });

  it("handles trailing dot variations seamlessly", () => {
    expect(translateApiMessage("Password is required")).toBe("كلمة المرور مطلوبة.");
    expect(translateApiMessage("Password is required.")).toBe("كلمة المرور مطلوبة.");
    expect(translateApiMessage("Trip not found")).toBe("الرحلة غير موجودة.");
    expect(translateApiMessage("Trip not found.")).toBe("الرحلة غير موجودة.");
  });

  it("translates dynamic messages with regex capture groups", () => {
    expect(
      translateApiMessage(
        "Departure time must be at least 15 minutes from now.",
      ),
    ).toBe("يجب أن يكون وقت المغادرة بعد 15 دقيقة على الأقل من الآن.");

    expect(
      translateApiMessage(
        "Departure time cannot be more than 3 days from now.",
      ),
    ).toBe("لا يمكن أن يكون موعد المغادرة بعد أكثر من 3 أيام من الآن.");

    expect(
      translateApiMessage(
        "Voice note duration must not exceed 30 seconds.",
      ),
    ).toBe("يجب ألا تتجاوز مدة التسجيل الصوتي 30 ثانية.");

    expect(
      translateApiMessage("Only the traveler can accept this assignment."),
    ).toBe("فقط المسافر يمكنه accept this assignment.");
  });

  it("translates success messages correctly", () => {
    expect(
      translateSuccessMessage("Registration OTP sent successfully"),
    ).toBe("تم إرسال رمز التحقق بنجاح.");
    expect(
      translateSuccessMessage("If an account exists, a reset code has been sent."),
    ).toBe("إذا كان الحساب مسجلاً، تم إرسال رمز استعادة كلمة المرور.");
  });

  it("integrates with getApiErrorMessage seamlessly", () => {
    const mockAxiosError = {
      response: {
        data: {
          success: false,
          message: "Validation failed",
          errors: [
            {
              field: "body.phone",
              message: "Phone number is too short",
            },
          ],
        },
      },
    };

    expect(getApiErrorMessage(mockAxiosError)).toBe("رقم الهاتف قصير جداً.");
  });
});
