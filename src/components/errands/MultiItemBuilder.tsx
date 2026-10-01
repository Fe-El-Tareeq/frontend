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
  const [selectedCatId, setSelectedCatId] = useState<string>(
    PRESET_CATEGORIES[0].id,
  );
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
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-4 text-right">
      {/* Top Header matching Component 36 */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 rounded-xl bg-[#123A68] dark:bg-accent px-3 py-1.5 text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-accent/90 active:scale-98 transition-all cursor-pointer shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>إضافة فئة</span>
        </button>

        <div>
          <h2 className="text-sm font-black text-[#123A68] dark:text-white">
            ماذا تحتاج؟ <span className="text-red-500">*</span>
          </h2>
          <p className="text-[11px] text-text-muted dark:text-slate-400">
            يمكنك إضافة أكثر من فئة في نفس الطلب
          </p>
        </div>
      </div>

      {/* Adding Form Panel */}
      {isAdding && (
        <div className="rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] p-4 border border-slate-200 dark:border-white/10 space-y-3.5 animate-fadeIn">
          {/* 1. Category Selection Pills */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-primary dark:text-slate-200 block">
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
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border transition-all cursor-pointer ${
                      isSelected
                        ? cat.tabSelected
                        : "bg-white dark:bg-[#132F54] border-slate-200 dark:border-white/10 text-text-secondary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 font-bold"
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
            <div className="flex h-11 items-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] px-2 shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1 text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-black text-primary dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1 text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
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
              className="h-11 flex-1 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] px-3.5 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-400 focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs"
            />
          </div>

          {validationError && (
            <p className="text-[11px] font-bold text-red-600">
              {validationError}
            </p>
          )}

          {/* 3. Size & Urgency Pills */}
          <div className="space-y-2 pt-1 border-t border-slate-200/60 dark:border-white/10">
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
                        ? "bg-[#123A68] dark:bg-accent text-white border-[#123A68] dark:border-accent shadow-xs font-black"
                        : "bg-white dark:bg-[#132F54] border-slate-200 dark:border-white/10 text-text-secondary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-primary dark:text-slate-200">الحجم</span>
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
                      : "bg-white dark:bg-[#132F54] border-slate-200 dark:border-white/10 text-text-secondary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                >
                  ⚡ عاجل
                </button>
                <button
                  type="button"
                  onClick={() => setIsUrgent(false)}
                  className={`rounded-xl px-3 py-1 text-xs font-bold border transition-all cursor-pointer ${
                    !isUrgent
                      ? "bg-slate-200 dark:bg-white/15 text-primary dark:text-white border-slate-300 dark:border-white/15 font-black"
                      : "bg-white dark:bg-[#132F54] border-slate-200 dark:border-white/10 text-text-secondary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                >
                  عادي
                </button>
              </div>
              <span className="text-xs font-bold text-primary dark:text-slate-200">الأهمية</span>
            </div>
          </div>

          {/* 4. Item Specific Note */}
          <input
            type="text"
            value={itemNote}
            onChange={(e) => setItemNote(e.target.value)}
            placeholder="ملاحظة خاصة بهذا الغرض (اختياري)..."
            className="h-10 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] px-3.5 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-400 focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs"
          />

          {/* 5. Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddItem}
              className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-[#123A68] dark:bg-accent text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-accent/90 active:scale-98 transition-all cursor-pointer shadow-xs"
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
              className="px-4 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] text-xs font-bold text-text-secondary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all cursor-pointer"
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
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/15 bg-slate-50/50 dark:bg-[#0B1E36]/60 p-6 text-center hover:border-accent/50 hover:bg-orange-50/30 dark:hover:bg-orange-950/20 transition-all cursor-pointer space-y-1.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-[#132F54] border border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-300 shadow-2xs">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-xs font-black text-[#123A68] dark:text-white">
            أضف أول فئة
          </span>
          <p className="text-[11px] text-text-muted dark:text-slate-400">
            دواء، وثائق، طرد، ملابس...
          </p>
        </div>
      )}

      {/* Display Added Items Grouped by Category matching Component 36 */}
      {groupedCategories.map(({ category, items: catItems }) => (
        <div
          key={category.id}
          className={`rounded-2xl border ${category.cardBorder} ${category.cardBg} overflow-hidden text-right shadow-2xs`}
        >
          {/* Category Top Banner matching the tab colour */}
          <div
            className={`flex items-center justify-between px-3.5 py-2.5 ${category.headerBg} border-b ${category.headerBorder}`}
          >
            <span
              className={`text-[11px] font-black ${category.textColor} bg-white dark:bg-[#102A4C] px-2 py-0.5 rounded-full border ${category.badgeBorder}`}
            >
              {catItems.length} غرض
            </span>
            <div
              className={`flex items-center gap-1.5 text-xs font-black ${category.textColor}`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </div>
          </div>

          {/* Items List - flat rows separated by divider lines, no item-level rounded edges */}
          <div className={`divide-y ${category.dividerColor} bg-white dark:bg-[#0B1E36]`}>
            {catItems.map((item) => {
              const sizeLabel =
                SIZE_OPTIONS.find((s) => s.key === item.size)?.label || "متوسط";

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors"
                >
                  {/* Item Details on RIGHT */}
                  <div className="text-right flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-black text-primary dark:text-white">
                        {item.name}
                      </h4>
                      {item.isUrgent && (
                        <span className="rounded-full bg-red-500 px-1.5 py-0.2 text-[9.5px] font-black text-white">
                          عاجل
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[10.5px] text-text-muted dark:text-slate-400">
                      <span>الكمية: {item.quantity}x</span>
                      <span>•</span>
                      <span>الحجم: {sizeLabel}</span>
                      {item.itemNote && (
                        <>
                          <span>•</span>
                          <span className="italic text-slate-500 dark:text-slate-300">
                            "{item.itemNote}"
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Remove Button on LEFT */}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer shrink-0"
                    title="حذف هذا الصنف"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};


