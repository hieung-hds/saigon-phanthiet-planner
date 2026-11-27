// App logic for Saigon - Phan Thiet - Mui Ne Trip Planner
const { createApp, ref, computed, onMounted, watch } = Vue;

const STORAGE_KEY = "saigon_phanthiet_trip_planner_v3";

createApp({
  setup() {
    // 1. Reactive State
    const activeTab = ref("itinerary"); // 'itinerary', 'explore', 'budget', 'packing', 'tips'
    const selectedDayIndex = ref(0);
    const filterRecType = ref("all");
    const showHeroDetails = ref(false);
    const showToolsMenu = ref(false);
    const cloudSyncStatus = ref("idle"); // 'idle' | 'syncing' | 'synced' | 'local'
    let lastCloudUpdatedAt = 0;
    let isApplyingRemoteUpdate = false;
    const activitySearch = ref("");
    const activityCatFilter = ref("all");
    const expenseSearch = ref("");
    const expenseCatFilter = ref("all");
    const expensePayerFilter = ref("all");
    const toast = ref({ show: false, message: "", type: "info" });

    // Modals
    const showActivityModal = ref(false);
    const showExpenseModal = ref(false);
    const showTripInfoModal = ref(false);
    const showShareModal = ref(false);
    const showAddRecToDayModal = ref(false);

    // Edit states
    const editingActivity = ref(null);
    const editingExpense = ref(null);
    const targetRecForItinerary = ref(null);
    const selectedDayForRec = ref(0);
    const selectedTimeForRec = ref("09:00");

    // Form models
    const activityForm = ref({
      id: null,
      dayIndex: 0,
      time: "08:00",
      title: "",
      location: "",
      category: "sightseeing",
      cost: 0,
      notes: "",
      tip: "",
      done: false
    });

    const expenseForm = ref({
      id: null,
      title: "",
      category: "food",
      amount: "",
      payer: "",
      note: ""
    });

    const newPackingItem = ref({
      item: "",
      category: "Trang phục sống ảo"
    });

    // Load initial data
    const tripData = ref(loadData());

    function loadData() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed;
        }
      } catch (e) {
        console.error("Lỗi đọc LocalStorage", e);
      }
      return JSON.parse(JSON.stringify(window.DEFAULT_TRIP_DATA));
    }

    let cloudSaveTimer = null;

    async function saveToCloud() {
      if (isApplyingRemoteUpdate) return;
      cloudSyncStatus.value = "syncing";
      try {
        const res = await fetch("/api/trip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tripData: tripData.value })
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        if (json && json.updatedAt) {
          lastCloudUpdatedAt = json.updatedAt;
        }
        cloudSyncStatus.value = "synced";
      } catch (err) {
        // Fallback silently on localhost/offline without Netlify Functions
        cloudSyncStatus.value = "local";
      }
    }

    async function loadFromCloud(notifyOnUpdate = false) {
      try {
        const res = await fetch("/api/trip?_t=" + Date.now());
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        if (json && json.exists && json.data) {
          if (json.updatedAt > lastCloudUpdatedAt) {
            isApplyingRemoteUpdate = true;
            tripData.value = json.data;
            lastCloudUpdatedAt = json.updatedAt;
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
            } catch (e) {}
            setTimeout(() => {
              isApplyingRemoteUpdate = false;
            }, 50);
            if (notifyOnUpdate) {
              showToast("🔄 Lịch trình vừa được cập nhật mới từ thành viên khác!", "info");
            }
          }
          cloudSyncStatus.value = "synced";
        } else if (json && json.exists === false) {
          // Seed cloud database with current tripData on first run
          await saveToCloud();
        }
      } catch (err) {
        cloudSyncStatus.value = "local";
      }
    }

    // Save automatically on change (localStorage + debounced cloud sync for packing checkboxes etc.)
    watch(
      tripData,
      (newVal) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
        } catch (e) {
          console.error("Lỗi lưu LocalStorage", e);
        }
        if (!isApplyingRemoteUpdate) {
          clearTimeout(cloudSaveTimer);
          cloudSaveTimer = setTimeout(() => {
            saveToCloud();
          }, 300);
        }
      },
      { deep: true }
    );

    function persistData() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tripData.value));
      } catch (e) {
        console.error("Lỗi lưu LocalStorage", e);
      }
      clearTimeout(cloudSaveTimer);
      saveToCloud();
    }

    function normalizeTime(raw) {
      if (!raw || typeof raw !== "string") return "09:00";
      const m = raw.trim().match(/^(\d{1,2}):(\d{2})/);
      if (!m) return "09:00";
      const hh = String(Math.min(23, Math.max(0, parseInt(m[1], 10)))).padStart(2, "0");
      const mm = String(Math.min(59, Math.max(0, parseInt(m[2], 10)))).padStart(2, "0");
      return `${hh}:${mm}`;
    }

    // Toast helper
    function showToast(message, type = "success") {
      toast.value = { show: true, message, type };
      setTimeout(() => {
        toast.value.show = false;
      }, 3000);
    }

    // 2. Countdown Calculation
    const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });
    function updateCountdown() {
      const now = new Date();
      const target = new Date(tripData.value.tripInfo.startDate + "T06:00:00");
      const diff = target - now;

      if (diff <= 0) {
        countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        countdown.value = { days: d, hours: h, minutes: m, seconds: s, isPast: false };
      }
    }

    // 3. Computed Helpers
    const currentDay = computed(() => {
      if (!tripData.value.itinerary || tripData.value.itinerary.length === 0) return null;
      if (selectedDayIndex.value === -1) return null; // All days
      return tripData.value.itinerary[selectedDayIndex.value] || tripData.value.itinerary[0];
    });

    const totalTripCostEstimated = computed(() => {
      let sum = 0;
      tripData.value.itinerary.forEach((day) => {
        day.activities.forEach((act) => {
          sum += Number(act.cost || 0);
        });
      });
      return sum;
    });

    const totalExpenseActual = computed(() => {
      return tripData.value.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    });

    const packingProgress = computed(() => {
      const list = tripData.value.packingList || [];
      if (list.length === 0) return 0;
      const checkedCount = list.filter((item) => item.checked).length;
      return Math.round((checkedCount / list.length) * 100);
    });

    const packingCategories = computed(() => {
      const categories = {};
      (tripData.value.packingList || []).forEach((item) => {
        if (!categories[item.category]) {
          categories[item.category] = [];
        }
        categories[item.category].push(item);
      });
      return categories;
    });

    const filteredRecommendations = computed(() => {
      const all = tripData.value.recommendations || [];
      if (filterRecType.value === "all") return all;
      return all.filter((r) => r.type === filterRecType.value);
    });

    const totalActivitiesCount = computed(() => {
      return (tripData.value.itinerary || []).reduce((acc, d) => acc + (d.activities ? d.activities.length : 0), 0);
    });

    const completedActivitiesCount = computed(() => {
      return (tripData.value.itinerary || []).reduce(
        (acc, d) => acc + (d.activities ? d.activities.filter((a) => a.done).length : 0),
        0
      );
    });

    function filterDayActivities(activities) {
      if (!activities) return [];
      return activities.filter((act) => {
        const matchCat = activityCatFilter.value === "all" || act.category === activityCatFilter.value;
        if (!matchCat) return false;
        const q = activitySearch.value.trim().toLowerCase();
        if (!q) return true;
        const hay = `${act.title || ""} ${act.location || ""} ${act.notes || ""} ${act.time || ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    const filteredExpenses = computed(() => {
      const list = tripData.value.expenses || [];
      return list.filter((exp) => {
        if (expenseCatFilter.value !== "all" && exp.category !== expenseCatFilter.value) return false;
        if (expensePayerFilter.value !== "all" && exp.payer !== expensePayerFilter.value) return false;
        const q = expenseSearch.value.trim().toLowerCase();
        if (!q) return true;
        return `${exp.title || ""} ${exp.note || ""} ${exp.payer || ""}`.toLowerCase().includes(q);
      });
    });

    // 4. Bill Split Engine (Chia tiền nhóm)
    const billSplitResults = computed(() => {
      const travelers = tripData.value.tripInfo.travelers || [];
      const expenses = tripData.value.expenses || [];
      if (travelers.length === 0) return { balances: [], settlements: [], perPerson: 0 };

      const total = totalExpenseActual.value;
      const perPerson = Math.round(total / travelers.length);

      // Tính tổng mỗi người đã trả
      const paidMap = {};
      travelers.forEach((t) => (paidMap[t.name] = 0));

      expenses.forEach((e) => {
        if (paidMap[e.payer] !== undefined) {
          paidMap[e.payer] += Number(e.amount);
        } else {
          // Nếu payer chưa có trong danh sách
          paidMap[e.payer] = Number(e.amount);
        }
      });

      // Số dư: Dương là trả dư (cần nhận lại), Âm là trả thiếu (cần trả thêm)
      const balances = travelers.map((t) => {
        const paid = paidMap[t.name] || 0;
        const balance = paid - perPerson;
        return {
          name: t.name,
          paid,
          balance
        };
      });

      // Thuật toán cân bằng nợ nần
      const debtors = balances.filter((b) => b.balance < -500).map((b) => ({ name: b.name, amount: -b.balance }));
      const creditors = balances.filter((b) => b.balance > 500).map((b) => ({ name: b.name, amount: b.balance }));

      const settlements = [];
      let dIdx = 0;
      let cIdx = 0;

      while (dIdx < debtors.length && cIdx < creditors.length) {
        const debtor = debtors[dIdx];
        const creditor = creditors[cIdx];
        const settleAmount = Math.min(debtor.amount, creditor.amount);

        settlements.push({
          from: debtor.name,
          to: creditor.name,
          amount: Math.round(settleAmount)
        });

        debtor.amount -= settleAmount;
        creditor.amount -= settleAmount;

        if (debtor.amount <= 100) dIdx++;
        if (creditor.amount <= 100) cIdx++;
      }

      return { balances, settlements, perPerson };
    });

    // 5. Activity & Day Handlers
    const showDayModal = ref(false);
    const dayForm = ref({ day: 1, dateTitle: "", date: "", hotel: "" });

    function editDay(day) {
      dayForm.value = {
        day: day.day,
        dateTitle: day.dateTitle || "",
        date: day.date || "",
        hotel: day.hotel || ""
      };
      showDayModal.value = true;
    }

    function saveDay() {
      const target = tripData.value.itinerary.find((d) => d.day === dayForm.value.day);
      if (target) {
        target.dateTitle = dayForm.value.dateTitle.trim();
        target.date = dayForm.value.date.trim();
        target.hotel = dayForm.value.hotel.trim();
        persistData();
      markLocalEdited();
        showToast("Đã cập nhật thông tin ngày thành công!", "success");
      }
      showDayModal.value = false;
    }

    const tripInfoForm = ref({
      title: "",
      startDate: "",
      endDate: "",
      departure: "",
      destination: "",
      notes: ""
    });

    function openEditTripInfoModal() {
      tripInfoForm.value = {
        title: tripData.value.tripInfo.title || "",
        startDate: tripData.value.tripInfo.startDate || "",
        endDate: tripData.value.tripInfo.endDate || "",
        departure: tripData.value.tripInfo.departure || "",
        destination: tripData.value.tripInfo.destination || "",
        notes: tripData.value.tripInfo.notes || ""
      };
      showTripInfoModal.value = true;
    }

    function saveTripInfo() {
      tripData.value.tripInfo.title = tripInfoForm.value.title.trim();
      tripData.value.tripInfo.startDate = tripInfoForm.value.startDate;
      tripData.value.tripInfo.endDate = tripInfoForm.value.endDate;
      tripData.value.tripInfo.departure = tripInfoForm.value.departure.trim();
      tripData.value.tripInfo.destination = tripInfoForm.value.destination.trim();
      tripData.value.tripInfo.notes = tripInfoForm.value.notes.trim();
      persistData();
      updateCountdown();
      showToast("Đã cập nhật thông tin chuyến đi thành công!", "success");
      showTripInfoModal.value = false;
    }

    function openAddActivityModal(dayIdx = null) {
      editingActivity.value = null;
      let targetIdx = 0;
      if (dayIdx !== null && dayIdx >= 0) {
        targetIdx = dayIdx;
      } else if (selectedDayIndex.value >= 0) {
        targetIdx = selectedDayIndex.value;
      }
      activityForm.value = {
        id: "act-" + Date.now(),
        dayIndex: targetIdx,
        time: "10:00",
        title: "",
        location: "",
        category: "sightseeing",
        cost: "",
        notes: "",
        tip: "",
        done: false
      };
      showActivityModal.value = true;
    }

    function editActivity(day, act) {
      editingActivity.value = { ...act };
      const dIdx = tripData.value.itinerary.findIndex((d) => d.day === (day?.day || 1));
      activityForm.value = {
        id: act.id,
        dayIndex: dIdx !== -1 ? dIdx : 0,
        time: normalizeTime(act.time || "08:00"),
        title: act.title || "",
        location: act.location || "",
        category: act.category || "sightseeing",
        cost: act.cost || "",
        notes: act.notes || "",
        tip: act.tip || "",
        done: act.done || false
      };
      showActivityModal.value = true;
    }

    function saveActivity() {
      const title = (activityForm.value.title || "").trim();
      if (!title) {
        showToast("Vui lòng nhập tên hoạt động!", "error");
        return;
      }

      const targetIdx = Number(activityForm.value.dayIndex);
      const targetDay = tripData.value.itinerary[targetIdx];
      if (!targetDay) return;

      const cost = parseAmount(activityForm.value.cost);
      const cleanTime = normalizeTime(activityForm.value.time || "08:00");

      if (editingActivity.value) {
        tripData.value.itinerary.forEach((d) => {
          d.activities = d.activities.filter((a) => a.id !== editingActivity.value.id);
        });

        targetDay.activities.push({
          id: editingActivity.value.id,
          time: cleanTime,
          title,
          location: (activityForm.value.location || "").trim(),
          category: activityForm.value.category || "sightseeing",
          cost,
          notes: (activityForm.value.notes || "").trim(),
          tip: (activityForm.value.tip || "").trim(),
          done: activityForm.value.done || false
        });
        targetDay.activities.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
        if (selectedDayIndex.value !== -1) {
          selectedDayIndex.value = targetIdx;
        }
        markLocalEdited();
        persistData();
        showToast(`Đã cập nhật vào Ngày ${targetDay.day} (${targetDay.date})!`, "success");
      } else {
        targetDay.activities.push({
          id: "act-" + Date.now(),
          time: cleanTime,
          title,
          location: (activityForm.value.location || "").trim(),
          category: activityForm.value.category || "sightseeing",
          cost,
          notes: (activityForm.value.notes || "").trim(),
          tip: (activityForm.value.tip || "").trim(),
          done: false
        });
        targetDay.activities.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
        if (selectedDayIndex.value !== -1) {
          selectedDayIndex.value = targetIdx;
        }
        markLocalEdited();
        persistData();
        showToast(`Đã thêm mới vào Ngày ${targetDay.day} (${targetDay.date})!`, "success");
      }

      showActivityModal.value = false;
    }

    function deleteActivity(day, actId) {
      if (day && day.activities) {
        day.activities = day.activities.filter((a) => a.id !== actId);
      } else {
        tripData.value.itinerary.forEach((d) => {
          d.activities = d.activities.filter((a) => a.id !== actId);
        });
      }
      persistData();
      markLocalEdited();
      showToast("Đã xóa hoạt động thành công!", "success");
    }

    function toggleActivityDone(act) {
      act.done = !act.done;
      persistData();
      showToast(act.done ? "Đã hoàn thành! Tuyệt vời!" : "Đã hủy đánh dấu hoàn thành");
    }

    function addNewDay() {
      const nextDayNum = tripData.value.itinerary.length + 1;
      tripData.value.itinerary.push({
        day: nextDayNum,
        dateTitle: `Ngày ${nextDayNum}: Tiếp tục khám phá Phan Thiết - Mũi Né`,
        theme: "tropical",
        activities: []
      });
      selectedDayIndex.value = tripData.value.itinerary.length - 1;
      markLocalEdited();
      showToast(`Đã thêm Ngày ${nextDayNum}!`);
    }

    // 6. Recommendation 1-click Add to Itinerary
    function promptAddRecToItinerary(rec) {
      targetRecForItinerary.value = rec;
      selectedDayForRec.value = selectedDayIndex.value >= 0 ? selectedDayIndex.value : 0;
      selectedTimeForRec.value = normalizeTime(rec.bestTime ? rec.bestTime.substring(0, 5) : "14:00");
      showAddRecToDayModal.value = true;
    }

    function confirmAddRecToItinerary() {
      if (!targetRecForItinerary.value) return;
      const rec = targetRecForItinerary.value;
      const day = tripData.value.itinerary[selectedDayForRec.value];
      if (day) {
        day.activities.push({
          id: "act-rec-" + Date.now(),
          time: selectedTimeForRec.value,
          title: `Khám phá ${rec.name}`,
          location: rec.name,
          category: rec.type === "chill" ? "nightlife" : "sightseeing",
          cost: 50000,
          notes: rec.highlight,
          tip: rec.tips,
          done: false
        });
        day.activities.sort((a, b) => a.time.localeCompare(b.time));
        markLocalEdited();
        showToast(`Đã thêm "${rec.name}" vào Ngày ${selectedDayForRec.value + 1}!`);
      }
      showAddRecToDayModal.value = false;
    }

    // Helper parse số tiền linh hoạt (hỗ trợ 500k, 500.000, 1.5tr, v.v.)
    function parseAmount(val) {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      let s = String(val).trim().toLowerCase().replace(/\s+/g, '');
      if (s.endsWith('k')) {
        return (parseFloat(s.slice(0, -1)) || 0) * 1000;
      }
      if (s.endsWith('tr') || s.endsWith('m') || s.endsWith('củ')) {
        const sNum = s.replace(/tr|m|củ/, '').replace(',', '.');
        return (parseFloat(sNum) || 0) * 1000000;
      }
      if (/^\d{1,3}(\.\d{3})+$/.test(s) || /^\d{1,3}(,\d{3})+$/.test(s)) {
        s = s.replace(/[.,]/g, '');
      } else {
        s = s.replace(/,/g, '.');
      }
      return parseFloat(s) || 0;
    }

    // 7. Expense Handlers
    function openAddExpenseModal() {
      editingExpense.value = null;
      expenseForm.value = {
        id: "exp-" + Date.now(),
        title: "",
        category: "food",
        amount: "",
        payer: tripData.value.tripInfo.travelers[0]?.name || "Hiếu",
        note: ""
      };
      showExpenseModal.value = true;
    }

    function editExpense(exp) {
      editingExpense.value = exp;
      expenseForm.value = {
        id: exp.id,
        title: exp.title,
        category: exp.category || "food",
        amount: exp.amount,
        payer: exp.payer || tripData.value.tripInfo.travelers[0]?.name || "Hiếu",
        note: exp.note || ""
      };
      showExpenseModal.value = true;
    }

    function saveExpense() {
      const title = (expenseForm.value.title || "").trim();
      const amount = parseAmount(expenseForm.value.amount);

      if (!title) {
        showToast("Vui lòng nhập tên khoản chi!", "error");
        return;
      }
      if (amount <= 0) {
        showToast("Vui lòng nhập số tiền hợp lệ (Vd: 500000 hoặc 500k)!", "error");
        return;
      }

      if (!tripData.value.expenses) {
        tripData.value.expenses = [];
      }

      if (editingExpense.value) {
        const idx = tripData.value.expenses.findIndex((e) => e.id === editingExpense.value.id);
        if (idx !== -1) {
          tripData.value.expenses[idx] = {
            ...tripData.value.expenses[idx],
            title,
            category: expenseForm.value.category,
            amount,
            payer: expenseForm.value.payer || tripData.value.tripInfo.travelers[0]?.name || "Hiếu",
            note: expenseForm.value.note || ""
          };
          persistData();
      showToast("Đã cập nhật khoản chi thành công!", "success");
        }
      } else {
        tripData.value.expenses.unshift({
          id: "exp-" + Date.now(),
          title,
          category: expenseForm.value.category,
          amount,
          payer: expenseForm.value.payer || tripData.value.tripInfo.travelers[0]?.name || "Hiếu",
          note: expenseForm.value.note || ""
        });
        persistData();
      showToast("Đã thêm khoản chi mới thành công!", "success");
      }

      showExpenseModal.value = false;
    }

    function deleteExpense(id) {
      if (!tripData.value.expenses) return;
      tripData.value.expenses = tripData.value.expenses.filter((e) => e.id !== id);
      persistData();
      showToast("Đã xóa khoản chi thành công!", "success");
    }

    // 8. Packing list handlers
    function addPackingItem() {
      if (!newPackingItem.value.item.trim()) return;
      tripData.value.packingList.push({
        id: "pack-" + Date.now(),
        category: newPackingItem.value.category,
        item: newPackingItem.value.item.trim(),
        checked: false
      });
      newPackingItem.value.item = "";
      showToast("Đã thêm món đồ vào danh sách!");
    }

    function removePackingItem(id) {
      tripData.value.packingList = tripData.value.packingList.filter((item) => item.id !== id);
      showToast("Đã xóa món đồ");
    }

    // 9. Travelers Handlers
    const newTravelerName = ref("");
    function addTraveler() {
      if (!newTravelerName.value.trim()) return;
      const name = newTravelerName.value.trim();
      tripData.value.tripInfo.travelers.push({
        id: Date.now(),
        name
      });
      newTravelerName.value = "";
      showToast(`Đã thêm thành viên: ${name}`);
    }

    function removeTraveler(index) {
      if (tripData.value.tripInfo.travelers.length <= 1) {
        showToast("Chuyến đi cần ít nhất 1 thành viên!", "error");
        return;
      }
      tripData.value.tripInfo.travelers.splice(index, 1);
      showToast("Đã bớt 1 thành viên");
    }

    // 10. Share & Export
    function formatCurrency(val) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val || 0);
    }

    function generateShareText() {
      const info = tripData.value.tripInfo;
      let text = `🌊☀️ LỊCH TRÌNH DU LỊCH: ${info.title.toUpperCase()}\n`;
      text += `📅 Khởi hành: ${info.startDate} ➔ ${info.endDate}\n`;
      text += `👥 Thành viên (8 người):\n`;
      text += `   ✈️ Team Vinh (Bay 08:35): Diệu, Ly, Cường, Linh, Huy, Huyền, Thương\n`;
      text += `   ✈️ Team Hà Nội (Bay 09:40): Hiếu\n`;
      text += `🚗 Phương tiện: ${info.transportation}\n`;
      text += `💰 Dự tính chi phí: ${formatCurrency(totalTripCostEstimated.value)}\n\n`;

      tripData.value.itinerary.forEach((day) => {
        text += `═══════════════════════\n`;
        text += `🌴 ${day.dateTitle.toUpperCase()}\n`;
        text += `═══════════════════════\n`;
        day.activities.forEach((act) => {
          text += `⏰ ${act.time} - ${act.title}\n`;
          if (act.location) text += `   📍 Địa điểm: ${act.location}\n`;
          if (act.cost > 0) text += `   💵 Dự kiến: ${formatCurrency(act.cost)}\n`;
          if (act.notes) text += `   📝 Ghi chú: ${act.notes}\n`;
          if (act.tip) text += `   💡 Mẹo: ${act.tip}\n`;
          text += `\n`;
        });
      });

      text += `\n✨ Lên kế hoạch bởi Saigon - Phan Thiet - Mui Ne Trip Planner!`;
      return text;
    }

    function copyShareText() {
      const text = generateShareText();
      navigator.clipboard.writeText(text).then(
        () => {
          showToast("Đã sao chép toàn bộ lịch trình! Bạn có thể dán vào Zalo/Messenger.");
        },
        () => {
          showToast("Không thể tự động copy, vui lòng chọn và copy thủ công.", "error");
        }
      );
    }

    function exportJson() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tripData.value, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `lich-trinh-phan-thiet-mui-ne-${tripData.value.tripInfo.startDate}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Đã tải xuống file sao lưu JSON!");
    }

    function importJson(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed.tripInfo && parsed.itinerary) {
            tripData.value = parsed;
            showToast("Đã nhập lịch trình thành công!");
          } else {
            showToast("File JSON không đúng cấu trúc!", "error");
          }
        } catch (err) {
          showToast("Lỗi đọc file JSON!", "error");
        }
      };
      reader.readAsText(file);
    }

    function resetToDefault() {
      tripData.value = JSON.parse(JSON.stringify(window.DEFAULT_TRIP_DATA));
      hasLocalEdits.value = false;
      try { localStorage.setItem("mui_ne_has_local_edits", "false"); } catch (e) {}
      showToolsMenu.value = false;
      showToast("Đã khôi phục dữ liệu lịch trình gốc!");
    }

    function copySettlementText() {
      const res = billSplitResults.value;
      let txt = `💰 BẢNG QUYẾT TOÁN CHI PHÍ CHUYẾN ĐI MŨI NÉ
`;
      txt += `• Tổng chi toàn đoàn: ${formatCurrency(totalExpenseActual.value)}
`;
      txt += `• Bình quân mỗi người (${tripData.value.tripInfo.travelers.length} bạn): ${formatCurrency(res.perPerson)}

`;
      if (res.settlements.length > 0) {
        txt += `🔄 CHI TIẾT CHUYỂN KHOẢN:
`;
        res.settlements.forEach((s, i) => {
          txt += `${i + 1}. ${s.from} ➔ chuyển cho ${s.to}: ${formatCurrency(s.amount)}
`;
        });
      } else {
        txt += `✅ Các thành viên đã cân bằng chi phí!
`;
      }
      navigator.clipboard.writeText(txt).then(
        () => showToast("Đã copy bảng chia tiền! Dán ngay vào nhóm Zalo nhé."),
        () => showToast("Không thể tự động copy.", "error")
      );
    }

    function printItinerary() {
      showToolsMenu.value = false;
      window.print();
    }

    // Helper category labels & icons
    function getCategoryBadge(cat) {
      const map = {
        transport: { label: "Di chuyển", icon: "fa-solid fa-plane-up", bg: "bg-sky-50 text-sky-700 border-sky-200" },
        food: { label: "Ăn uống", icon: "fa-solid fa-utensils", bg: "bg-amber-50 text-amber-700 border-amber-200" },
        chill: { label: "Cafe & Chill", icon: "fa-solid fa-mug-hot", bg: "bg-cyan-50 text-cyan-700 border-cyan-200" },
        sightseeing: { label: "Tham quan", icon: "fa-solid fa-camera-retro", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        activity: { label: "Trải nghiệm", icon: "fa-solid fa-car-side", bg: "bg-purple-50 text-purple-700 border-purple-200" },
        rest: { label: "Lưu trú & Nghỉ", icon: "fa-solid fa-bed", bg: "bg-teal-50 text-teal-700 border-teal-200" },
        nightlife: { label: "Tiệc & Sinh nhật", icon: "fa-solid fa-cake-candles", bg: "bg-rose-50 text-rose-700 border-rose-200" },
        shopping: { label: "Mua sắm", icon: "fa-solid fa-bag-shopping", bg: "bg-orange-50 text-orange-700 border-orange-200" },
        hotel: { label: "Khách sạn", icon: "fa-solid fa-hotel", bg: "bg-indigo-50 text-indigo-700 border-indigo-200" },
        ticket: { label: "Vé tham quan", icon: "fa-solid fa-ticket", bg: "bg-pink-50 text-pink-700 border-pink-200" }
      };
      return map[cat] || { label: "Hoạt động", icon: "fa-solid fa-location-dot", bg: "bg-slate-100 text-slate-700 border-slate-200" };
    }

    // 11. Live Google Sheet Synchronization (Database trực tiếp)
    const isSyncing = ref(false);
    const lastSyncedTime = ref(localStorage.getItem('mui_ne_last_synced') || null);

    function parseCSV(text) {
      const lines = [];
      let row = [""];
      let inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];
        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            row[row.length - 1] += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          row.push('');
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
          if (char === '\r' && nextChar === '\n') i++;
          lines.push(row);
          row = [''];
        } else {
          row[row.length - 1] += char;
        }
      }
      if (row.length > 1 || row[0] !== '') lines.push(row);
      return lines;
    }

    let lastSheetCsv = localStorage.getItem("mui_ne_last_csv") || "";
    const hasLocalEdits = ref(localStorage.getItem("mui_ne_has_local_edits") === "true");

    function markLocalEdited() {
      hasLocalEdits.value = true;
      try { localStorage.setItem("mui_ne_has_local_edits", "true"); } catch (e) {}
    }

    async function syncFromGoogleSheet(notify = true, force = false) {
      const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1lX2CfBN75L7zk59NdUNV4eL-AZqwxMYV78sW0fLxNSI/gviz/tq?tqx=out:csv&gid=1491333133";
      isSyncing.value = true;
      try {
        const res = await fetch(SHEET_CSV_URL + "&_t=" + Date.now());
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const csvText = await res.text();

        // Kiểm tra thay đổi nếu chạy tự động
        const isChanged = Boolean(lastSheetCsv && csvText.trim() !== lastSheetCsv.trim());
        if (!force && !notify) {
          if (hasLocalEdits.value) {
            // Bảo vệ chỉnh sửa trên web, không tự động ghi đè
            if (isChanged) {
              showToast("Google Sheet có cập nhật mới! Bấm 'Đồng bộ Sheet' nếu muốn tải về.", "info");
            }
            isSyncing.value = false;
            return;
          }
          if (lastSheetCsv && !isChanged) {
            isSyncing.value = false;
            return;
          }
        }

        if (notify || force) {
          hasLocalEdits.value = false;
          try { localStorage.setItem("mui_ne_has_local_edits", "false"); } catch (e) {}
        }

        lastSheetCsv = csvText;
        try { localStorage.setItem("mui_ne_last_csv", csvText); } catch (e) {}
        const rows = parseCSV(csvText);

        if (!rows || rows.length < 2) {
          throw new Error("Dữ liệu sheet trống hoặc không hợp lệ");
        }

        const dateGroups = {};
        for (let i = 1; i < rows.length; i++) {
          const r = rows[i];
          if (!r || !r[0] || !r[0].trim()) continue;
          let rawDate = r[0].trim();
          if (rawDate.includes("2016")) rawDate = rawDate.replace("2016", "2026");

          const rawTime = (r[1] || "").trim();
          const time = rawTime ? rawTime.substring(0, 5) : "--:--";
          const title = (r[2] || "").trim();
          const content = (r[3] || "").trim();
          const location = (r[4] || "").trim();
          const notes = (r[5] || "").trim();

          if (!title && !content && !location) continue;

          if (!dateGroups[rawDate]) {
            dateGroups[rawDate] = [];
          }

          let category = "sightseeing";
          const lower = (title + " " + content + " " + location).toLowerCase();
          if (lower.includes("bay") || lower.includes("sân bay") || lower.includes("xe") || lower.includes("limousine") || lower.includes("di chuyển")) {
            category = "transport";
          } else if (lower.includes("ăn") || lower.includes("cơm") || lower.includes("hải sản") || lower.includes("seafood") || lower.includes("muối ớt") || lower.includes("lẩu")) {
            category = "food";
          } else if (lower.includes("cafe") || lower.includes("cf") || lower.includes("hừng đông") || lower.includes("soho") || lower.includes("silk road")) {
            category = "chill";
          } else if (lower.includes("hotel") || lower.includes("khách sạn") || lower.includes("resort") || lower.includes("nghỉ ngơi") || lower.includes("check in") || lower.includes("check out")) {
            category = "rest";
          } else if (lower.includes("jeep") || lower.includes("tour") || lower.includes("chơi") || lower.includes("bàu trắng") || lower.includes("u&me")) {
            category = "activity";
          } else if (lower.includes("takashimaya") || lower.includes("mua sắm")) {
            category = "shopping";
          } else if (lower.includes("sinh nhật")) {
            category = "nightlife";
          }

          dateGroups[rawDate].push({
            id: `act-sheet-${i}`,
            time,
            title: title || content || "Hoạt động",
            location,
            category,
            cost: 0,
            notes: [content, notes].filter(Boolean).join(" - "),
            tip: "",
            done: false
          });
        }

        const sortedDates = Object.keys(dateGroups).sort();
        if (sortedDates.length > 0) {
          const doneMap = {};
          tripData.value.itinerary.forEach(d => {
            d.activities.forEach(a => {
              if (a.done) doneMap[a.title.toLowerCase().trim()] = true;
            });
          });

          const newItinerary = sortedDates.map((dateStr, idx) => {
            const dayNum = idx + 1;
            const acts = dateGroups[dateStr];
            acts.forEach(a => {
              if (doneMap[a.title.toLowerCase().trim()]) a.done = true;
            });

            const existingDay = tripData.value.itinerary[idx];
            return {
              day: dayNum,
              date: dateStr,
              dateTitle: existingDay ? existingDay.dateTitle : `Ngày ${dayNum} (${dateStr}): Khám phá Phan Thiết - Mũi Né`,
              theme: existingDay ? existingDay.theme : "ocean",
              hotel: existingDay ? existingDay.hotel : "",
              activities: acts
            };
          });

          tripData.value.itinerary = newItinerary;
          persistData();
          const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          lastSyncedTime.value = nowStr;
          localStorage.setItem('mui_ne_last_synced', nowStr);
          if (notify) {
            showToast(`Đã đồng bộ ${rows.length - 1} mục trực tiếp từ Google Sheet lúc ${nowStr}!`, "success");
          } else if (isChanged) {
            showToast(`Đã tự động cập nhật lịch trình mới từ Google Sheet lúc ${nowStr}!`, "info");
          }
        }
      } catch (err) {
        console.error("Lỗi đồng bộ Google Sheet:", err);
        if (notify) {
          showToast("Không thể đồng bộ Google Sheet: Hãy kiểm tra mạng hoặc quyền xem công khai!", "error");
        }
      } finally {
        isSyncing.value = false;
      }
    }

    // Lifecycle
    onMounted(() => {
      updateCountdown();
      setInterval(updateCountdown, 1000);

      // Tải dữ liệu dùng chung cho cả 8 thành viên từ Cloud
      loadFromCloud(false);

      // Tự động kiểm tra cập nhật từ các thành viên khác mỗi 6 giây
      setInterval(() => {
        if (typeof document === "undefined" || document.visibilityState === "visible") {
          loadFromCloud(true);
        }
      }, 6000);

      if (typeof document !== "undefined") {
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            loadFromCloud(true);
          }
        });
      }
    });

    return {
      activeTab,
      selectedDayIndex,
      filterRecType,
      showHeroDetails,
      showToolsMenu,
      cloudSyncStatus,
      activitySearch,
      activityCatFilter,
      expenseSearch,
      expenseCatFilter,
      expensePayerFilter,
      hasLocalEdits,
      totalActivitiesCount,
      completedActivitiesCount,
      filterDayActivities,
      filteredExpenses,
      copySettlementText,
      toast,
      isSyncing,
      lastSyncedTime,
      syncFromGoogleSheet,
      showActivityModal,
      showExpenseModal,
      showTripInfoModal,
      showDayModal,
      dayForm,
      editDay,
      saveDay,
      tripInfoForm,
      openEditTripInfoModal,
      saveTripInfo,
      showShareModal,
      showAddRecToDayModal,
      editingActivity,
      targetRecForItinerary,
      selectedDayForRec,
      selectedTimeForRec,
      activityForm,
      expenseForm,
      newPackingItem,
      newTravelerName,
      tripData,
      countdown,
      currentDay,
      totalTripCostEstimated,
      totalExpenseActual,
      packingProgress,
      packingCategories,
      filteredRecommendations,
      billSplitResults,
      openAddActivityModal,
      editActivity,
      saveActivity,
      deleteActivity,
      toggleActivityDone,
      addNewDay,
      promptAddRecToItinerary,
      confirmAddRecToItinerary,
      openAddExpenseModal,
      editExpense,
      editingExpense,
      saveExpense,
      deleteExpense,
      addPackingItem,
      removePackingItem,
      addTraveler,
      removeTraveler,
      formatCurrency,
      generateShareText,
      copyShareText,
      exportJson,
      importJson,
      resetToDefault,
      printItinerary,
      getCategoryBadge
    };
  }
}).mount("#app");
