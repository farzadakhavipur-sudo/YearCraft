YearCraft v6.0 — Phase 4

1) Notifications: هشدار شروع Time Block و رویداد امروز؛ از Settings فعال می‌شود.
2) PWA/Offline: Manifest + Service Worker + Icons. برای نصب/Offline با START_CALENDAR.bat اجرا کنید.
3) Mobile UX: مودال‌های مناسب موبایل، دکمه‌های شناور، Swipe در Month/Week.
4) تست سبک: tests/smoke.test.js و RUN_TESTS.bat.
5) Personal Calendar Agent: محلی و بدون ارسال داده؛ خلاصه کارهای امروز، Focus هفته، OKR، پیشنهاد برنامه و ثبت Task متنی.

نمونه فرمان Agent:
فردا ساعت 9 تا 10 مطالعه اضافه کن

نکته Notifications:
بدون Backend، اعلان زمان‌بندی‌شده وقتی برنامه کاملاً بسته است تضمین نمی‌شود. وقتی PWA/صفحه فعال باشد قابل اتکاتر است.

اجرا:
START_CALENDAR.bat
http://127.0.0.1:8765
