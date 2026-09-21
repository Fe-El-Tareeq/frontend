import { useState } from "react";
import type { FC } from "react";
import { Plus, X, Minus } from "lucide-react";
import {
  type ErrandItemPayload,
  type ItemSize,
  PRESET_CATEGORIES,
} from "../../types/errands";

const SIZE_OPTIONS: { key: ItemSize; label: string }[] = [
  { key: "ENVELOPE", label: "ظرف" },
  { key: "SMALL", label: "صغير" },
  { key: "MEDIUM", label: "متوسط" },
  { key: "LARGE", label: "كبير" },
];

interface MultiItemBuilderProps {
  items: ErrandItemPayload[];
  onChange: (items: ErrandItemPayload[]) => void;
  required?: boolean;
}

export const MultiItemBuilder: FC<MultiItemBuilderProps> = ({
  items,
  onChange,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<string>("pharmacy");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<ItemSize>("MEDIUM");
  const [isUrgent, setIsUrgent] = useState(false);
  const [itemNote, setItemNote] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const activeCategory =
    PRESET_CATEGORIES.find((c) => c.id === selectedCatId) ||
    PRESET_CATEGORIES[0];

  const handleAddItem = () => {
    if (!name.trim()) {
      setValidationError("يرجى إدخال اسم أو وصف الغرض");
      return;
    }
    setValidationError(null);

    const newItem: ErrandItemPayload = {
      id: "item-" + Math.random().toString(36).substring(2, 9),
      categoryId: activeCategory.id,
      categoryName: activeCategory.name,
      categoryIcon: activeCategory.icon,
      name: name.trim(),
      quantity: Math.max(1, quantity),
      size,
      isUrgent,
      itemNote: itemNote.trim() || undefined,
    };

    onChange([...items, newItem]);
    setName("");
    setQuantity(1);
    setItemNote("");
    setIsUrgent(false);
    setIsAdding(false);
  };

  const handleRemoveItem = (idToRemove?: string) => {
    if (!idToRemove) return;
    onChange(items.filter((item) => item.id !== idToRemove));
  };

  // Group items by category for rendering matching Component 36
  const groupedCategories = PRESET_CATEGORIES.map((cat) => {
    const catItems = items.filter((it) => it.categoryId === cat.id);
    return {
      category: cat,
      items: catItems,
    };
  }).filter((g) => g.items.length > 0);

  return (
    <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-4 text-right">
      {/* Top Header matching Component 36 */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 rounded-xl bg-[#123A68] px-3 py-1.5 text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>إضافة فئة</span>
        </button>

        <div>
          <h2 className="text-sm font-black text-[#123A68]">
            ماذا تحتاج؟ <span className="text-red-500">*</span>
          </h2>
          <p className="text-[11px] text-text-muted">
            يمكنك إضافة أكثر من فئة في نفس الطلب
          </p>
        </div>
      </div>

      {/* Adding Form Panel */}
      {isAdding && (
        <div className="rounded-2xl bg-[#F8FAFC] p-4 border border-slate-200 space-y-3.5 animate-fadeIn">
          {/* 1. Category Selection Pills */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-primary block">
              اختر الفئة
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_CATEGORIES.map((cat) => {
                const isSelected = selectedCatId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCatId(cat.id)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? `${cat.headerBg} ring-2 ring-primary/20 shadow-xs font-black`
                        : "bg-white border-slate-200 text-text-secondary hover:bg-slate-100"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Name & Quantity Stepper */}
          <div className="flex items-center gap-2">
            {/* Quantity Stepper */}
            <div className="flex h-11 items-center rounded-2xl border border-slate-200 bg-white px-2 shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-black text-primary">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Name Input */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسم / وصف الغرض..."
              className="h-11 flex-1 rounded-2xl border border-slate-200 bg-white px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs"
            />
          </div>

          {validationError && (
            <p className="text-[11px] font-bold text-red-600">
              {validationError}
            </p>
          )}

          {/* 3. Size & Urgency Pills */}
          <div className="space-y-2 pt-1 border-t border-slate-200/60">
            {/* Size */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {SIZE_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSize(opt.key)}
                    className={`rounded-xl px-2.5 py-1 text-xs font-bold border transition-all cursor-pointer ${
                      size === opt.key
                        ? "bg-[#123A68] text-white border-[#123A68] shadow-xs font-black"
                        : "bg-white border-slate-200 text-text-secondary hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-primary">الحجم</span>
            </div>

            {/* Urgency */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsUrgent(true)}
                  className={`rounded-xl px-3 py-1 text-xs font-bold border transition-all cursor-pointer ${
                    isUrgent
                      ? "bg-red-500 text-white border-red-500 shadow-xs font-black"
                      : "bg-white border-slate-200 text-text-secondary hover:bg-slate-100"
                  }`}
                >
                  ⚡ عاجل
                </button>
                <button
                  type="button"
                  onClick={() => setIsUrgent(false)}
                  className={`rounded-xl px-3 py-1 text-xs font-bold border transition-all cursor-pointer ${
                    !isUrgent
                      ? "bg-slate-200 text-primary border-slate-300 font-black"
                      : "bg-white border-slate-200 text-text-secondary hover:bg-slate-100"
                  }`}
                >
                  عادي
                </button>
              </div>
              <span className="text-xs font-bold text-primary">الأهمية</span>
            </div>
          </div>

          {/* 4. Item Specific Note */}
          <input
            type="text"
            value={itemNote}
            onChange={(e) => setItemNote(e.target.value)}
            placeholder="ملاحظة خاصة بهذا الغرض (اختياري)..."
            className="h-10 w-full rounded-2xl border border-slate-200 bg-white px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs"
          />

          {/* 5. Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddItem}
              className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>إضافة للطلب</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setValidationError(null);
              }}
              className="px-4 h-10 rounded-xl border border-slate-200 bg-white text-xs font-bold text-text-secondary hover:bg-slate-50 transition-all cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Empty State Dashed Container matching Component 36 */}
      {items.length === 0 && !isAdding && (
        <div
          onClick={() => setIsAdding(true)}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center hover:border-accent/50 hover:bg-orange-50/30 transition-all cursor-pointer space-y-1.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 shadow-2xs">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-xs font-black text-[#123A68]">
            أضف أول فئة
          </span>
          <p className="text-[11px] text-text-muted">
            دواء، وثائق، طرد، ملابس...
          </p>
        </div>
      )}

      {/* Display Added Items Grouped by Category matching Component 36 */}
      {groupedCategories.map(({ category, items: catItems }) => (
        <div
          key={category.id}
          className="rounded-2xl border border-red-200/80 bg-red-50/20 overflow-hidden text-right shadow-2xs"
        >
          {/* Category Top Banner */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-red-50/80 border-b border-red-200/60">
            <span className="text-[11px] font-black text-red-700 bg-white px-2 py-0.5 rounded-full border border-red-200">
              {catItems.length} غرض
            </span>
            <div className="flex items-center gap-1.5 text-xs font-black text-red-700">
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </div>
          </div>

          {/* Items List */}
          <div className="divide-y divide-red-100 bg-white p-2">
            {catItems.map((item) => {
              const sizeLabel =
                SIZE_OPTIONS.find((s) => s.key === item.size)?.label || "متوسط";

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    title="حذف هذا الصنف"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="text-right flex-1 pr-2">
                    <div className="flex items-center justify-end gap-2">
                      {item.isUrgent && (
                        <span className="rounded-full bg-red-500 px-1.5 py-0.2 text-[9.5px] font-black text-white">
                          عاجل
                        </span>
                      )}
                      <h4 className="text-xs font-black text-primary">
                        {item.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-end gap-2 text-[10.5px] text-text-muted mt-0.5">
                      {item.itemNote && (
                        <span className="italic text-slate-500">
                          "{item.itemNote}"
                        </span>
                      )}
                      <span>•</span>
                      <span>الحجم: {sizeLabel}</span>
                      <span>•</span>
                      <span>الكمية: {item.quantity}x</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
