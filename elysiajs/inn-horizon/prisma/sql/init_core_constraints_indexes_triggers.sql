ALTER TABLE "users"    ADD CONSTRAINT chk_wallet_non_negative CHECK ("walletBalance" >= 0);
ALTER TABLE "rooms"    ADD CONSTRAINT chk_price_positive CHECK (price > 0);
ALTER TABLE "bookings" ADD CONSTRAINT chk_checkin_future CHECK ("checkIn" >= CURRENT_DATE);
ALTER TABLE "bookings" ADD CONSTRAINT chk_checkin_before_checkout CHECK ("checkIn" < "checkOut");
ALTER TABLE "bookings" ADD CONSTRAINT chk_nights_positive CHECK (nights > 0);
ALTER TABLE "bookings" ADD CONSTRAINT chk_total_price_positive CHECK ("totalPrice" > 0);
ALTER TABLE "bookings" ADD CONSTRAINT chk_expiredat_future CHECK ("expiredAt" > now() + interval '30 seconds' OR "expiredAt" IS NULL);

CREATE OR REPLACE FUNCTION check_payment_amount() RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM bookings WHERE id = NEW."bookingId" AND "totalPrice" = NEW.amount) THEN
    RAISE EXCEPTION 'Payment amount must equal Booking.totalPrice';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_payment_amount_match
  BEFORE INSERT OR UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION check_payment_amount();

CREATE OR REPLACE FUNCTION enforce_ledger_balance() RETURNS TRIGGER AS $$
DECLARE prev Decimal(16,2) := 0;
BEGIN
  SELECT COALESCE(MAX(balanceAfter), 0) INTO prev
  FROM host_ledgers WHERE "hostId" = NEW."hostId" AND createdAt < NEW.createdAt;

  IF ROUND((prev + NEW.amount)::numeric, 2) != NEW.balanceAfter THEN
    RAISE EXCEPTION 'Invalid balanceAfter in HostLedger';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_ledger_immutable
  BEFORE INSERT ON host_ledgers
  FOR EACH ROW EXECUTE FUNCTION enforce_ledger_balance();

CREATE OR REPLACE FUNCTION check_payout_limit() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.amount > (SELECT "walletBalance" FROM users WHERE id = NEW."hostId") THEN
    RAISE EXCEPTION 'Payout amount exceeds wallet balance';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_payout_limit
  BEFORE INSERT OR UPDATE ON payouts
  FOR EACH ROW EXECUTE FUNCTION check_payout_limit();

CREATE INDEX IF NOT EXISTS idx_bookings_expired_cron ON bookings("expiredAt") WHERE status = 'PENDING' AND "isTest" = false AND "expiredAt" IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_payouts_host_latest ON payouts("hostId", "createdAt" DESC);