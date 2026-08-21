import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { TripCard } from "../../components/trips/TripCard";
import type { TripCardData } from "../../components/trips/TripCard";
import { TripFilterBar } from "../../components/trips/TripFilterBar";

export default function TripsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");

  const trips: TripCardData[] = [
    {
      id: "trip-1",
      travelerName: "أحمد خالد",
      avatarInitials: "أخ",
      avatarBg: "bg-[#F36F21]",
      capacityText: "حتى 3 أغراض",
      rating: 4.9,
      origin: "غزة - الرمال",
      destination: "رفح",
      date: "23 يوليو 2024",
      time: "10:00 ص",
      notes: "📦 لا مانع من الأغراض الثقيلة",
    },
    {
      id: "trip-2",
      travelerName: "سارة عمر",
      avatarInitials: "سع",
      avatarBg: "bg-[#E11D48]",
      capacityText: "حتى 5 أغراض",
      rating: 4.7,
      origin: "خان يونس",
      destination: "غزة - الشجاعية",
      date: "24 يوليو 2024",
      time: "2:00 م",
      notes: null,
    },
    {
      id: "trip-3",
      travelerName: "محمد يوسف",
      avatarInitials: "مي",
      avatarBg: "bg-[#0D9488]",
      capacityText: "حتى 2 أغراض",
      rating: 5.0,
      origin: "دير البلح",
      destination: "بيت لاهيا",
      date: "25 يوليو 2024",
      time: "9:00 ص",
      notes: "📦 أغراض خفيفة فقط",
    },
    {
      id: "trip-4",
      travelerName: "ليلى حسن",
      avatarInitials: "لح",
      avatarBg: "bg-[#8B5CF6]",
      capacityText: "حتى 4 أغراض",
      rating: 4.6,
      origin: "غزة - التفاح",
      destination: "خان يونس",
      date: "26 يوليو 2024",
      time: "11:30 ص",
      notes: null,
    },
    {
      id: "trip-5",
      travelerName: "عمر نبيل",
      avatarInitials: "عن",
      avatarBg: "bg-[#F36F21]",
      capacityText: "حتى 6 أغراض",
      rating: 4.8,
      origin: "رفح",
      destination: "غزة - النصر",
      date: "27 يوليو 2024",
      time: "8:00 ص",
      notes: "📦 متاح للأغراض المتنوعة",
    },
  ];

  const filteredTrips = trips.filter((t) => {
    if (searchQuery) {
      const match =
        t.travelerName.includes(searchQuery) ||
        t.origin.includes(searchQuery) ||
        t.destination.includes(searchQuery);
      if (!match) return false;
    }
    if (cityFilter !== "ALL") {
      if (!t.origin.includes(cityFilter) && !t.destination.includes(cityFilter))
        return false;
    }
    return true;
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/trips/new")}
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة رحلة</span>
          </button>

          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">الرحلات</h1>
            <p className="text-xs text-text-secondary">
              {filteredTrips.length} رحلة متاحة
            </p>
          </div>
        </div>

        {/* Filter Card Container */}
        <TripFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cityFilter={cityFilter}
          onCityChange={setCityFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {/* Trips List */}
        <div className="space-y-3.5 pt-1">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onViewDetails={(id) => navigate(`/trips/${id}`)}
            />
          ))}
        </div>
      </div>
    </MobileContainer>
  );
}
